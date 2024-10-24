import sinon from "sinon";
import NetworkService from "../../service/networkService.js";
import { errorMessages, successMessages } from "../../utils/messages.js";
import exp from "constants";
describe("NetworkService - Constructor", function () {
	let dbMock, emailServiceMock, axiosMock, pingMock, loggerMock, httpMock;

	beforeEach(function () {
		dbMock = sinon.stub();
		emailServiceMock = sinon.stub();
		axiosMock = sinon.stub();
		pingMock = sinon.stub();
		loggerMock = sinon.stub();
		httpMock = sinon.stub();
	});

	it("should correctly initialize properties", function () {
		const networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);

		expect(networkService.db).to.equal(dbMock);
		expect(networkService.emailService).to.equal(emailServiceMock);
		expect(networkService.TYPE_PING).to.equal("ping");
		expect(networkService.TYPE_HTTP).to.equal("http");
		expect(networkService.TYPE_PAGESPEED).to.equal("pagespeed");
		expect(networkService.SERVICE_NAME).to.equal("NetworkService");
		expect(networkService.NETWORK_ERROR).to.equal(5000);
		expect(networkService.axios).to.equal(axiosMock);
		expect(networkService.ping).to.equal(pingMock);
		expect(networkService.logger).to.equal(loggerMock);
		expect(networkService.http).to.equal(httpMock);
	});
});

describe("NetworkService - handleNotification", () => {
	let dbMock, emailServiceMock, loggerMock, networkService;

	beforeEach(function () {
		dbMock = {
			getNotificationsByMonitorId: sinon.stub(),
		};
		emailServiceMock = {
			buildAndSendEmail: sinon.stub().resolves(),
		};
		loggerMock = {
			error: sinon.stub(),
		};

		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			null,
			null,
			loggerMock,
			null
		);
	});

	it("should send email notifications when monitor is down", async function () {
		const monitor = { _id: "monitor1", name: "Test Monitor", url: "http://test.com" };
		const notifications = [{ type: "email", address: "test@example.com" }];
		dbMock.getNotificationsByMonitorId.resolves(notifications);

		await networkService.handleNotification(monitor, false);

		expect(emailServiceMock.buildAndSendEmail.calledOnce).to.be.true;
		expect(
			emailServiceMock.buildAndSendEmail.calledWith(
				"serverIsDownTemplate",
				{ monitorName: monitor.name, monitorUrl: monitor.url },
				"test@example.com",
				"Monitor Test Monitor is down"
			)
		).to.be.true;
	});

	it("should send email notifications when monitor is up", async function () {
		const monitor = { _id: "monitor1", name: "Test Monitor", url: "http://test.com" };
		const notifications = [{ type: "email", address: "test@example.com" }];
		dbMock.getNotificationsByMonitorId.resolves(notifications);

		await networkService.handleNotification(monitor, true);

		expect(emailServiceMock.buildAndSendEmail.calledOnce).to.be.true;
		expect(
			emailServiceMock.buildAndSendEmail.calledWith(
				"serverIsUpTemplate",
				{ monitorName: monitor.name, monitorUrl: monitor.url },
				"test@example.com",
				"Monitor Test Monitor is up"
			)
		).to.be.true;
	});

	it("should log an error if an exception is thrown", async function () {
		const monitor = { _id: "monitor1", name: "Test Monitor", url: "http://test.com" };
		dbMock.getNotificationsByMonitorId.rejects(new Error("Database error"));

		await networkService.handleNotification(monitor, true);

		expect(loggerMock.error.calledOnce).to.be.true;
		expect(
			loggerMock.error.calledWith("Database error", {
				method: "handleNotification",
				service: networkService.SERVICE_NAME,
				monitorId: monitor._id,
			})
		).to.be.true;
	});
});

describe("NetworkService - handleStatusUpdate", function () {
	let dbMock,
		emailServiceMock,
		axiosMock,
		pingMock,
		loggerMock,
		httpMock,
		networkService,
		monitorMock;

	beforeEach(function () {
		dbMock = { getMonitorById: sinon.stub() };
		emailServiceMock = sinon.stub();
		axiosMock = sinon.stub();
		pingMock = sinon.stub();
		loggerMock = { error: sinon.stub() };
		httpMock = sinon.stub();
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
		monitorMock = {
			status: sinon.stub(),
			save: sinon.stub(),
		};
	});

	afterEach(function () {
		sinon.restore();
	});

	it("should return if getMonitorById throws an error", async function () {
		dbMock.getMonitorById.throws(new Error("Database error"));

		const res = await networkService.handleStatusUpdate(
			{ data: { _id: "monitor1" } },
			true
		);
		expect(res).to.be.undefined;
	});

	it("should log an error if monitor is null", async function () {
		dbMock.getMonitorById.resolves(null);

		await networkService.handleStatusUpdate({ data: { _id: "monitor1" } }, true);

		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith("Null Monitor: monitor1")).to.be.true;
	});

	it("should update monitor status if different", async function () {
		monitorMock.status = false;
		dbMock.getMonitorById.resolves(monitorMock);

		await networkService.handleStatusUpdate({ data: { _id: "monitor1" } }, true);

		expect(monitorMock.save.calledOnce).to.be.true;
		expect(monitorMock.status).to.be.true;
	});

	it("should not update monitor status if same", async function () {
		monitorMock.status = true;
		dbMock.getMonitorById.resolves(monitorMock);

		await networkService.handleStatusUpdate({ data: { _id: "monitor1" } }, true);

		expect(monitorMock.save.called).to.be.false;
	});

	it("should log an error if exception is thrown during status update", async function () {
		monitorMock.status = false;
		dbMock.getMonitorById.resolves(monitorMock);
		monitorMock.save.rejects(new Error("Save error"));

		await networkService.handleStatusUpdate({ data: { _id: "monitor1" } }, true);

		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith("Save error")).to.be.true;
	});
});

describe("NetworkService - measureResponseTime", () => {
	let mockOperation,
		dbMock,
		emailServiceMock,
		axiosMock,
		pingMock,
		loggerMock,
		httpMock,
		networkService;

	beforeEach(() => {
		mockOperation = sinon.stub();
		dbMock = { getMonitorById: sinon.stub() };
		emailServiceMock = sinon.stub();
		axiosMock = sinon.stub();
		pingMock = sinon.stub();
		loggerMock = { error: sinon.stub() };
		httpMock = sinon.stub();
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should return response time and response on successful operation", async () => {
		const fakeResponse = { data: "test" };
		mockOperation.resolves(fakeResponse);

		const result = await networkService.measureResponseTime(mockOperation);
		expect(result).to.have.property("responseTime").that.is.a("number");
		expect(result).to.have.property("response").that.deep.equals(fakeResponse);
	});

	it("should throw an error with response time and additional properties on operation failure", async () => {
		const fakeError = new Error("Operation failed");
		mockOperation.rejects(fakeError);

		try {
			await networkService.measureResponseTime(mockOperation);
		} catch (error) {
			expect(error).to.have.property("responseTime").that.is.a("number");
			expect(error).to.have.property("service", networkService.SERVICE_NAME);
			expect(error).to.have.property("method", "measureResponseTime");
			expect(error.message).to.equal("Operation failed");
		}
	});
	it("should throw an error with response time set properties on operation failure", async () => {
		const fakeError = new Error("Operation failed");
		fakeError.service = "test";
		fakeError.method = "testMethod";
		mockOperation.rejects(fakeError);

		try {
			await networkService.measureResponseTime(mockOperation);
		} catch (error) {
			expect(error).to.have.property("responseTime").that.is.a("number");
			expect(error).to.have.property("service", "test");
			expect(error).to.have.property("method", "testMethod");
			expect(error.message).to.equal("Operation failed");
		}
	});
});

describe("networkService - handlePing", () => {
	let job,
		dbMock,
		pingMock,
		loggerMock,
		httpMock,
		networkService,
		logAndStoreCheckStub,
		handleStatusUpdateStub;
	beforeEach(function () {
		job = {
			data: {
				url: "http://example.com",
				_id: "12345",
			},
		};

		dbMock = { getMonitorById: sinon.stub() };
		pingMock = { promise: { probe: sinon.stub() } };
		loggerMock = { error: sinon.stub() };
		httpMock = sinon.stub();
		networkService = new NetworkService(
			dbMock,
			null,
			null,
			pingMock,
			loggerMock,
			httpMock
		);
		logAndStoreCheckStub = sinon.stub(networkService, "logAndStoreCheck");
		handleStatusUpdateStub = sinon.stub(networkService, "handleStatusUpdate");
	});

	afterEach(function () {
		sinon.restore();
	});

	it("should handle a successful ping response", async () => {
		const response = { alive: true };
		const responseTime = 0;
		pingMock.promise.probe.returns(response);
		logAndStoreCheckStub.resolves();
		await networkService.handlePing(job);
		expect(
			logAndStoreCheckStub.calledOnceWith({
				monitorId: job.data._id,
				status: response.alive,
				responseTime,
				message: successMessages.PING_SUCCESS,
			})
		).to.be.true;
		expect(handleStatusUpdateStub.calledOnceWith(job, true)).to.be.true;
	});
	it("should handle a successful response and isAlive === false", async function () {
		const response = { alive: false };
		const responseTime = 0;
		pingMock.promise.probe.resolves(response);
		logAndStoreCheckStub.resolves();

		await networkService.handlePing(job);
		expect(
			logAndStoreCheckStub.calledOnceWith({
				monitorId: job.data._id,
				status: false,
				responseTime,
				message: errorMessages.PING_CANNOT_RESOLVE,
			})
		).to.be.true;
		expect(handleStatusUpdateStub.calledOnceWith(job, false)).to.be.true;
	});

	it("should handle a failed ping response", async function () {
		const error = new Error("Ping failed");
		error.responseTime = 0;

		pingMock.promise.probe.rejects(error);

		await networkService.handlePing(job);

		expect(handleStatusUpdateStub.calledOnceWith(job, false)).to.be.true;
	});
});

describe("NetworkService - handleHttp", () => {
	let networkService,
		axiosMock,
		dbMock,
		httpMock,
		jobMock,
		loggerMock,
		logAndStoreCheckStub,
		handleStatusUpdateStub;

	beforeEach(() => {
		axiosMock = {
			get: sinon.stub(),
		};
		dbMock = {
			createCheck: sinon.stub().resolves(),
		};
		httpMock = {
			STATUS_CODES: {
				200: "OK",
				500: "Internal Server Error",
			},
		};
		loggerMock = {
			error: sinon.stub(),
		};
		networkService = new NetworkService(
			dbMock,
			null,
			axiosMock,
			null,
			loggerMock,
			httpMock
		);
		jobMock = {
			data: {
				url: "http://example.com",
				_id: "monitorId123",
			},
		};
		sinon.stub(networkService, "measureResponseTime").callsFake(async (operation) => {
			const response = await operation();
			return { responseTime: 100, response };
		});
		logAndStoreCheckStub = sinon.stub(networkService, "logAndStoreCheck").resolves();
		handleStatusUpdateStub = sinon.stub(networkService, "handleStatusUpdate").resolves();
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should handle a successful HTTP response", async () => {
		const responseMock = { status: 200 };
		axiosMock.get.resolves(responseMock);

		await networkService.handleHttp(jobMock);

		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: true,
			statusCode: 200,
			message: "OK",
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, true)).to.be.true;
	});

	it("should handle an HTTP error response", async () => {
		const errorMock = { response: { status: 500 }, responseTime: 200 };
		axiosMock.get.rejects(errorMock);

		await networkService.handleHttp(jobMock);

		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: false,
			statusCode: 500,
			message: "Internal Server Error",
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, false)).to.be.true;
	});
	it("should handle an HTTP error response with undefined status", async () => {
		const errorMock = { response: { status: undefined }, responseTime: 200 };
		axiosMock.get.rejects(errorMock);

		await networkService.handleHttp(jobMock);

		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: false,
			statusCode: 5000,
			message: "Network Error",
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, false)).to.be.true;
	});
});

describe("networkService - handlePagespeed", () => {
	let dbMock,
		axiosMock,
		jobMock,
		emailServiceMock,
		pingMock,
		loggerMock,
		httpMock,
		networkService,
		logAndStoreCheckStub,
		handleStatusUpdateStub;
	beforeEach(() => {
		jobMock = {
			data: {
				_id: "12345",
				url: "http://example.com",
			},
		};
		dbMock = { getMonitorById: sinon.stub() };
		axiosMock = { get: sinon.stub() };

		emailServiceMock = sinon.stub();
		pingMock = { promise: { probe: sinon.stub() } };
		loggerMock = { error: sinon.stub() };
		httpMock = {
			STATUS_CODES: {
				200: "OK",
				500: "Internal Server Error",
			},
		};
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
		logAndStoreCheckStub = sinon.stub(networkService, "logAndStoreCheck").resolves();
		handleStatusUpdateStub = sinon.stub(networkService, "handleStatusUpdate").resolves();
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should handle a successful PageSpeed response", async () => {
		const responseMock = {
			status: 200,
			data: {
				lighthouseResult: {
					categories: {
						accessibility: { score: 0.9 },
						"best-practices": { score: 0.8 },
						seo: { score: 0.7 },
						performance: { score: 0.6 },
					},
					audits: {
						"cumulative-layout-shift": { score: 0.1 },
						"speed-index": { score: 0.2 },
						"first-contentful-paint": { score: 0.3 },
						"largest-contentful-paint": { score: 0.4 },
						"total-blocking-time": { score: 0.5 },
					},
				},
			},
		};
		axiosMock.get.resolves(responseMock);

		await networkService.handlePagespeed(jobMock);
		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: true,
			statusCode: 200,
			message: "OK",
			accessibility: 90,
			bestPractices: 80,
			seo: 70,
			performance: 60,
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, true)).to.be.true;
	});

	it("should handle a successful PageSpeed response with missing data", async () => {
		const responseMock = {
			status: 200,
			data: {
				lighthouseResult: {
					categories: {},
					audits: {
						"cumulative-layout-shift": { score: 0.1 },
						"speed-index": { score: 0.2 },
						"first-contentful-paint": { score: 0.3 },
						"largest-contentful-paint": { score: 0.4 },
						"total-blocking-time": { score: 0.5 },
					},
				},
			},
		};
		axiosMock.get.resolves(responseMock);

		await networkService.handlePagespeed(jobMock);
		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: true,
			statusCode: 200,
			message: "OK",
			accessibility: 0,
			bestPractices: 0,
			seo: 0,
			performance: 0,
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, true)).to.be.true;
	});

	it("should handle an error PageSpeed response", async () => {
		const errorMock = { response: { status: 500 } };
		axiosMock.get.rejects(errorMock);

		await networkService.handlePagespeed(jobMock);

		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: false,
			statusCode: 500,
			message: "Internal Server Error",
			accessibility: 0,
			bestPractices: 0,
			seo: 0,
			performance: 0,
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, false)).to.be.true;
	});
	it("should handle an error PageSpeed response with unknown status", async () => {
		const errorMock = { response: { status: undefined } };
		axiosMock.get.rejects(errorMock);

		await networkService.handlePagespeed(jobMock);

		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const checkData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(checkData).to.include({
			monitorId: jobMock.data._id,
			status: false,
			statusCode: 5000,
			message: "Network Error",
			accessibility: 0,
			bestPractices: 0,
			seo: 0,
			performance: 0,
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, false)).to.be.true;
	});
});

describe("networkService - handleHardware", () => {
	let dbMock,
		axiosMock,
		jobMock,
		emailServiceMock,
		pingMock,
		loggerMock,
		httpMock,
		networkService,
		logAndStoreCheckStub,
		handleStatusUpdateStub;
	beforeEach(() => {
		jobMock = {
			data: {
				_id: "12345",
				url: "http://example.com",
			},
		};
		dbMock = { getMonitorById: sinon.stub() };
		axiosMock = { get: sinon.stub() };

		emailServiceMock = sinon.stub();
		pingMock = { promise: { probe: sinon.stub() } };
		loggerMock = { error: sinon.stub() };
		httpMock = {
			STATUS_CODES: {
				200: "OK",
				500: "Internal Server Error",
			},
		};
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
		logAndStoreCheckStub = sinon.stub(networkService, "logAndStoreCheck").resolves();
		handleStatusUpdateStub = sinon.stub(networkService, "handleStatusUpdate").resolves();
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should handle a successful Hardware response", async () => {
		const responseMock = {
			monitorId: jobMock.data._id,
			cpu: {
				physical_core: 1,
				logical_core: 1,
				frequency: 266,
				temperature: null,
				free_percent: null,
				usage_percent: null,
			},
			memory: {
				total_bytes: 4,
				available_bytes: 4,
				used_bytes: 2,
				usage_percent: 0.5,
			},
			disk: [
				{
					read_speed_bytes: 3,
					write_speed_bytes: 3,
					total_bytes: 10,
					free_bytes: 2,
					usage_percent: 0.8,
				},
			],
			host: {
				os: "Linux",
				platform: "Ubuntu",
				kernel_version: "24.04",
			},
		};
		axiosMock.get.resolves(responseMock);

		await networkService.handleHardware(jobMock);
		expect(networkService.logAndStoreCheck.calledOnce).to.be.true;
		const hardwareData = networkService.logAndStoreCheck.getCall(0).args[0];
		expect(hardwareData.cpu).to.include({
			...responseMock.cpu,
		});
		expect(networkService.handleStatusUpdate.calledOnceWith(jobMock, true)).to.be.true;
	});

	it("should handle an error Hardware response", async () => {
		logAndStoreCheckStub.throws(new Error("Hardware error"));
		try {
			await networkService.handleHardware(jobMock);
		} catch (error) {
			expect(error.message).to.equal("Hardware error");
		}
	});
});

describe("NetworkService - getStatus", () => {
	let dbMock, emailServiceMock, axiosMock, pingMock, loggerMock, httpMock, networkService;

	beforeEach(() => {
		dbMock = { getMonitorById: sinon.stub() };
		emailServiceMock = sinon.stub();
		axiosMock = sinon.stub();
		pingMock = sinon.stub();
		loggerMock = { error: sinon.stub() };
		httpMock = sinon.stub();
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should return true if the job type is ping and handlePing is successful", async () => {
		const job = { data: { type: networkService.TYPE_PING } };
		sinon.stub(networkService, "handlePing").resolves(true);
		const result = await networkService.getStatus(job);
		expect(result).to.be.true;
	});
	it("should return false if the job type is ping and handlePing is not successful", async () => {
		const job = { data: { type: networkService.TYPE_PING } };
		sinon.stub(networkService, "handlePing").resolves(false);
		const result = await networkService.getStatus(job);
		expect(result).to.be.false;
	});
	it("should return true if the job type is http and handleHttp is successful", async () => {
		const job = { data: { type: networkService.TYPE_HTTP } };
		sinon.stub(networkService, "handleHttp").resolves(true);
		const result = await networkService.getStatus(job);
		expect(result).to.be.true;
	});
	it("should return false if the job type is http and handleHttp is not successful", async () => {
		const job = { data: { type: networkService.TYPE_HTTP } };
		sinon.stub(networkService, "handleHttp").resolves(false);
		const result = await networkService.getStatus(job);
		expect(result).to.be.false;
	});
	it("should return true if the job type is pagespeed and handlePagespeed is successful", async () => {
		const job = { data: { type: networkService.TYPE_PAGESPEED } };
		sinon.stub(networkService, "handlePagespeed").resolves(true);
		const result = await networkService.getStatus(job);
		expect(result).to.be.true;
	});
	it("should return false if the job type is pagespeed and handlePagespeed is not successful", async () => {
		const job = { data: { type: networkService.TYPE_PAGESPEED } };
		sinon.stub(networkService, "handlePagespeed").resolves(false);
		const result = await networkService.getStatus(job);
		expect(result).to.be.false;
	});
	it("should return true if the job type is hardware and handleHardware is successful", async () => {
		const job = { data: { type: networkService.TYPE_HARDWARE } };
		sinon.stub(networkService, "handleHardware").resolves(true);
		const result = await networkService.getStatus(job);
		expect(result).to.be.true;
	});
	it("should return false if the job type is hardware and handleHardware is not successful", async () => {
		const job = { data: { type: networkService.TYPE_HARDWARE } };
		sinon.stub(networkService, "handleHardware").resolves(false);
		const result = await networkService.getStatus(job);
		expect(result).to.be.false;
	});
	it("should log an error and return false if the job type is unknown", async () => {
		const job = { data: { type: "unknown" } };
		const result = await networkService.getStatus(job);
		expect(result).to.be.false;
		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith(`Unsupported type: unknown`)).to.be.true;
	});
});

describe("NetworkService - logAndStoreCheck", async () => {
	let dbMock, emailServiceMock, axiosMock, pingMock, loggerMock, httpMock, networkService;

	beforeEach(() => {
		dbMock = { getMonitorById: sinon.stub() };
		emailServiceMock = sinon.stub();
		axiosMock = sinon.stub();
		pingMock = sinon.stub();
		loggerMock = { error: sinon.stub() };
		httpMock = sinon.stub();
		networkService = new NetworkService(
			dbMock,
			emailServiceMock,
			axiosMock,
			pingMock,
			loggerMock,
			httpMock
		);
	});
	const data = { monitorId: "12345" };
	const writeToDB = sinon.stub();
	afterEach(() => {
		sinon.restore();
	});

	it("should log an error if `writeToDb` throws an error", async () => {
		writeToDB.rejects(new Error("Database error"));
		await networkService.logAndStoreCheck(data, writeToDB);
		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith(`Error writing check for ${data.monitorId}`)).to.be
			.true;
	});

	it("should return the status of the inserted check if successful", async () => {
		writeToDB.resolves({ status: true });
		const result = await networkService.logAndStoreCheck(data, writeToDB);
		expect(result).to.be.true;
	});

	it("should thrown an error if the check is not inserted (null)", async () => {
		writeToDB.resolves(null);
		await networkService.logAndStoreCheck(data, writeToDB);
		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith(`Error writing check for ${data.monitorId}`)).to.be
			.true;
	});
	it("should thrown an error if the check is not inserted (undefined)", async () => {
		writeToDB.resolves(undefined);
		await networkService.logAndStoreCheck(data, writeToDB);
		expect(loggerMock.error.calledOnce).to.be.true;
		expect(loggerMock.error.calledWith(`Error writing check for ${data.monitorId}`)).to.be
			.true;
	});
});
