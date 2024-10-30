import sinon from "sinon";
import StatusService from "../../service/statusService.js";
import { afterEach, describe } from "node:test";

describe("StatusService", () => {
	let db, logger, statusService;
	beforeEach(() => {
		db = {
			getMonitorById: sinon.stub(),
			createCheck: sinon.stub(),
			createPagespeedCheck: sinon.stub(),
		};
		logger = {
			info: sinon.stub(),
			error: sinon.stub(),
		};
		statusService = new StatusService(db, logger);
	});

	afterEach(() => {
		sinon.restore();
	});

	describe("constructor", () => {
		it("should create an instance of StatusService", () => {
			expect(statusService).to.be.an.instanceOf(StatusService);
		});
	});

	describe("updateStatus", async () => {
		beforeEach(() => {
			// statusService.insertCheck = sinon.stub().resolves;
		});
		afterEach(() => {
			sinon.restore();
		});
		it("should throw an error if an error occurs", async () => {
			const error = new Error("Test error");
			statusService.db.getMonitorById = sinon.stub().throws(error);
			try {
				await statusService.updateStatus({ monitorId: "test", status: true });
			} catch (error) {
				expect(error.message).to.equal("Test error");
			}
			// expect(statusService.insertCheck.calledOnce).to.be.true;
		});
		it("should return {statusChanged: false} if status hasn't changed", async () => {
			statusService.db.getMonitorById = sinon.stub().returns({ status: true });
			const result = await statusService.updateStatus({
				monitorId: "test",
				status: true,
			});
			expect(result).to.deep.equal({ statusChanged: false });
			// expect(statusService.insertCheck.calledOnce).to.be.true;
		});
		it("should return {statusChanged: true} if status has changed from down to up", async () => {
			statusService.db.getMonitorById = sinon
				.stub()
				.returns({ status: false, save: sinon.stub() });
			const result = await statusService.updateStatus({
				monitorId: "test",
				status: true,
			});
			expect(result.statusChanged).to.be.true;
			expect(result.monitor.status).to.be.true;
			expect(result.prevStatus).to.be.false;
			// expect(statusService.insertCheck.calledOnce).to.be.true;
		});
		it("should return {statusChanged: true} if status has changed from up to down", async () => {
			statusService.db.getMonitorById = sinon
				.stub()
				.returns({ status: true, save: sinon.stub() });
			const result = await statusService.updateStatus({
				monitorId: "test",
				status: false,
			});
			expect(result.statusChanged).to.be.true;
			expect(result.monitor.status).to.be.false;
			expect(result.prevStatus).to.be.true;
			// expect(statusService.insertCheck.calledOnce).to.be.true;
		});
	});

	describe("buildCheck", () => {
		it("should build a check object", () => {
			const check = statusService.buildCheck({
				monitorId: "test",
				type: "test",
				status: true,
				responseTime: 100,
				code: 200,
				message: "Test message",
				payload: { test: "test" },
			});
			expect(check.monitorId).to.equal("test");
			expect(check.status).to.be.true;
			expect(check.statusCode).to.equal(200);
			expect(check.responseTime).to.equal(100);
			expect(check.message).to.equal("Test message");
		});
		it("should build a check object for pagespeed type", () => {
			const check = statusService.buildCheck({
				monitorId: "test",
				type: "pagespeed",
				status: true,
				responseTime: 100,
				code: 200,
				message: "Test message",
				payload: {
					lighthouseResult: {
						categories: {
							accessibility: { score: 1 },
							"best-practices": { score: 1 },
							performance: { score: 1 },
							seo: { score: 1 },
						},
						audits: {
							"cumulative-layout-shift": { score: 1 },
							"speed-index": { score: 1 },
							"first-contentful-paint": { score: 1 },
							"largest-contentful-paint": { score: 1 },
							"total-blocking-time": { score: 1 },
						},
					},
				},
			});
			expect(check.monitorId).to.equal("test");
			expect(check.status).to.be.true;
			expect(check.statusCode).to.equal(200);
			expect(check.responseTime).to.equal(100);
			expect(check.message).to.equal("Test message");
			expect(check.accessibility).to.equal(100);
			expect(check.bestPractices).to.equal(100);
			expect(check.performance).to.equal(100);
			expect(check.seo).to.equal(100);
			expect(check.audits).to.deep.equal({
				cls: { score: 1 },
				si: { score: 1 },
				fcp: { score: 1 },
				lcp: { score: 1 },
				tbt: { score: 1 },
			});
		});
		it("should build a check object for pagespeed type with missing data", () => {
			const check = statusService.buildCheck({
				monitorId: "test",
				type: "pagespeed",
				status: true,
				responseTime: 100,
				code: 200,
				message: "Test message",
				payload: {
					lighthouseResult: {
						categories: {},
						audits: {},
					},
				},
			});
			expect(check.monitorId).to.equal("test");
			expect(check.status).to.be.true;
			expect(check.statusCode).to.equal(200);
			expect(check.responseTime).to.equal(100);
			expect(check.message).to.equal("Test message");
			expect(check.accessibility).to.equal(0);
			expect(check.bestPractices).to.equal(0);
			expect(check.performance).to.equal(0);
			expect(check.seo).to.equal(0);
			expect(check.audits).to.deep.equal({
				cls: 0,
				si: 0,
				fcp: 0,
				lcp: 0,
				tbt: 0,
			});
		});
		it("should build a check for hardware type", () => {
			const check = statusService.buildCheck({
				monitorId: "test",
				type: "hardware",
				status: true,
				responseTime: 100,
				code: 200,
				message: "Test message",
				payload: { cpu: "cpu", memory: "memory", disk: "disk", host: "host" },
			});
			expect(check.monitorId).to.equal("test");
			expect(check.status).to.be.true;
			expect(check.statusCode).to.equal(200);
			expect(check.responseTime).to.equal(100);
			expect(check.message).to.equal("Test message");
			expect(check.cpu).to.equal("cpu");
			expect(check.memory).to.equal("memory");
			expect(check.disk).to.equal("disk");
			expect(check.host).to.equal("host");
		});
	});
	describe("insertCheck", () => {
		it("should log an error if one is thrown", async () => {
			const testError = new Error("Test error");
			statusService.db.createCheck = sinon.stub().throws(testError);
			try {
				await statusService.insertCheck({ monitorId: "test" });
			} catch (error) {
				expect(error.message).to.equal(testError.message);
			}
			expect(statusService.logger.error.calledOnce).to.be.true;
		});
		it("should insert a check into the database", async () => {
			await statusService.insertCheck({ monitorId: "test", type: "http" });
			expect(statusService.db.createCheck.calledOnce).to.be.true;
		});
	});
});
