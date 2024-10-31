import sinon from "sinon";
import NetworkService from "../../service/networkService.js";
import { expect } from "chai";
import http from "http";
describe("Network Service", () => {
	let axios, ping, logger, networkService;

	beforeEach(() => {
		axios = {
			get: sinon.stub().resolves({
				data: { foo: "bar" },
				status: 200,
			}),
		};
		ping = {
			promise: {
				probe: sinon
					.stub()
					.resolves({ response: { alive: true }, responseTime: 100, alive: true }),
			},
		};
		logger = { error: sinon.stub() };
		networkService = new NetworkService(axios, ping, logger, http);
	});
	describe("constructor", () => {
		it("should create a new NetworkService instance", () => {
			const networkService = new NetworkService();
			expect(networkService).to.be.an.instanceOf(NetworkService);
		});
	});

	describe("timeRequest", () => {
		it("should time an asynchronous operation", async () => {
			const operation = sinon.stub().resolves("success");
			const { response, responseTime } = await networkService.timeRequest(operation);
			expect(response).to.equal("success");
			expect(responseTime).to.be.a("number");
		});
		it("should handle errors if operation throws error", async () => {
			const error = new Error("Test error");
			const operation = sinon.stub().throws(error);
			const { response, responseTime } = await networkService.timeRequest(operation);
			expect(response).to.be.null;
			expect(responseTime).to.be.a("number");
			expect(error.message).to.equal("Test error");
		});
	});

	describe("requestPing", () => {
		it("should return a response object if ping successful", async () => {
			const pingResult = await networkService.requestPing({
				data: { url: "http://test.com", _id: "123" },
			});
			expect(pingResult.monitorId).to.equal("123");
			expect(pingResult.type).to.equal("ping");
			expect(pingResult.responseTime).to.be.a("number");
			expect(pingResult.status).to.be.true;
		});
		it("should return a response object if ping unsuccessful", async () => {
			const error = new Error("Test error");
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const pingResult = await networkService.requestPing({
				data: { url: "http://test.com", _id: "123" },
			});
			expect(pingResult.monitorId).to.equal("123");
			expect(pingResult.type).to.equal("ping");
			expect(pingResult.responseTime).to.be.a("number");
			expect(pingResult.status).to.be.false;
			expect(pingResult.code).to.equal(networkService.PING_ERROR);
		});
	});
	describe("requestHttp", () => {
		it("should return a response object if http successful", async () => {
			const job = { data: { url: "http://test.com", _id: "123", type: "http" } };
			const httpResult = await networkService.requestHttp(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("http");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.true;
		});
		it("should return a response object if http unsuccessful", async () => {
			const error = new Error("Test error");
			error.response = { status: 404 };
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "http" } };
			const httpResult = await networkService.requestHttp(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("http");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.false;
			expect(httpResult.code).to.equal(404);
		});
		it("should return a response object if http unsuccessful with unknown code", async () => {
			const error = new Error("Test error");
			error.response = {};
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "http" } };
			const httpResult = await networkService.requestHttp(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("http");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.false;
			expect(httpResult.code).to.equal(networkService.NETWORK_ERROR);
		});
	});

	describe("requestPagespeed", () => {
		it("should return a response object if pagespeed successful", async () => {
			const job = { data: { url: "http://test.com", _id: "123", type: "pagespeed" } };
			const pagespeedResult = await networkService.requestPagespeed(job);
			expect(pagespeedResult.monitorId).to.equal("123");
			expect(pagespeedResult.type).to.equal("pagespeed");
			expect(pagespeedResult.responseTime).to.be.a("number");
			expect(pagespeedResult.status).to.be.true;
		});
		it("should return a response object if pagespeed unsuccessful", async () => {
			const error = new Error("Test error");
			error.response = { status: 404 };
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "pagespeed" } };
			const pagespeedResult = await networkService.requestPagespeed(job);
			expect(pagespeedResult.monitorId).to.equal("123");
			expect(pagespeedResult.type).to.equal("pagespeed");
			expect(pagespeedResult.responseTime).to.be.a("number");
			expect(pagespeedResult.status).to.be.false;
			expect(pagespeedResult.code).to.equal(404);
		});
		it("should return a response object if pagespeed unsuccessful with an unknown code", async () => {
			const error = new Error("Test error");
			error.response = {};
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "pagespeed" } };
			const pagespeedResult = await networkService.requestPagespeed(job);
			expect(pagespeedResult.monitorId).to.equal("123");
			expect(pagespeedResult.type).to.equal("pagespeed");
			expect(pagespeedResult.responseTime).to.be.a("number");
			expect(pagespeedResult.status).to.be.false;
			expect(pagespeedResult.code).to.equal(networkService.NETWORK_ERROR);
		});
	});

	describe("requestHardware", () => {
		it("should return a response object if hardware successful", async () => {
			const job = { data: { url: "http://test.com", _id: "123", type: "hardware" } };
			const httpResult = await networkService.requestHardware(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("hardware");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.true;
		});
		it("should return a response object if hardware successful and job has a secret", async () => {
			const job = {
				data: {
					url: "http://test.com",
					_id: "123",
					type: "hardware",
					secret: "my_secret",
				},
			};
			const httpResult = await networkService.requestHardware(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("hardware");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.true;
		});
		it("should return a response object if hardware unsuccessful", async () => {
			const error = new Error("Test error");
			error.response = { status: 404 };
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "hardware" } };
			const httpResult = await networkService.requestHardware(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("hardware");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.false;
			expect(httpResult.code).to.equal(404);
		});
		it("should return a response object if hardware unsuccessful with unknown code", async () => {
			const error = new Error("Test error");
			error.response = {};
			networkService.timeRequest = sinon
				.stub()
				.resolves({ response: null, responseTime: 1, error });
			const job = { data: { url: "http://test.com", _id: "123", type: "hardware" } };
			const httpResult = await networkService.requestHardware(job);
			expect(httpResult.monitorId).to.equal("123");
			expect(httpResult.type).to.equal("hardware");
			expect(httpResult.responseTime).to.be.a("number");
			expect(httpResult.status).to.be.false;
			expect(httpResult.code).to.equal(networkService.NETWORK_ERROR);
		});
	});

	describe("getStatus", () => {
		beforeEach(() => {
			networkService.requestPing = sinon.stub();
			networkService.requestHttp = sinon.stub();
			networkService.requestPagespeed = sinon.stub();
			networkService.requestHardware = sinon.stub();
		});

		afterEach(() => {
			sinon.restore();
		});
		it("should call requestPing if type is ping", () => {
			networkService.getStatus({ data: { type: "ping" } });
			expect(networkService.requestPing.calledOnce).to.be.true;
			expect(networkService.requestHttp.notCalled).to.be.true;
			expect(networkService.requestPagespeed.notCalled).to.be.true;
		});
		it("should call requestHttp if type is http", () => {
			networkService.getStatus({ data: { type: "http" } });
			expect(networkService.requestPing.notCalled).to.be.true;
			expect(networkService.requestHttp.calledOnce).to.be.true;
			expect(networkService.requestPagespeed.notCalled).to.be.true;
		});
		it("should call requestPagespeed if type is pagespeed", () => {
			networkService.getStatus({ data: { type: "pagespeed" } });
			expect(networkService.requestPing.notCalled).to.be.true;
			expect(networkService.requestHttp.notCalled).to.be.true;
			expect(networkService.requestPagespeed.calledOnce).to.be.true;
		});
		it("should call requestHardware if type is hardware", () => {
			networkService.getStatus({ data: { type: "hardware" } });
			expect(networkService.requestHardware.calledOnce).to.be.true;
			expect(networkService.requestPing.notCalled).to.be.true;
			expect(networkService.requestPagespeed.notCalled).to.be.true;
		});
		it("should log an error if an unknown type is provided", () => {
			networkService.getStatus({ data: { type: "unknown" } });
			expect(logger.error.calledOnce).to.be.true;
			expect(logger.error.args[0][0].message).to.equal("Unsupported type: unknown");
		});
	});
});
