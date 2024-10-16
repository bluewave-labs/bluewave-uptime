import sinon from "sinon";

import {
	handleValidationError,
	handleError,
	fetchMonitorCertificate,
} from "../../controllers/controllerUtils.js";
import { expect } from "chai";

describe("controllerUtils - handleValidationError", () => {
	it("should set status to 422", () => {
		const error = {};
		const serviceName = "TestService";
		const result = handleValidationError(error, serviceName);
		expect(result.status).to.equal(422);
	});

	it("should set service to the provided serviceName", () => {
		const error = {};
		const serviceName = "TestService";
		const result = handleValidationError(error, serviceName);
		expect(result.service).to.equal(serviceName);
	});

	it("should set message to error.details[0].message if present", () => {
		const error = {
			details: [{ message: "Detail message" }],
		};
		const serviceName = "TestService";
		const result = handleValidationError(error, serviceName);
		expect(result.message).to.equal("Detail message");
	});

	it("should set message to error.message if error.details is not present", () => {
		const error = {
			message: "Error message",
		};
		const serviceName = "TestService";
		const result = handleValidationError(error, serviceName);
		expect(result.message).to.equal("Error message");
	});

	it('should set message to "Validation Error" if neither error.details nor error.message is present', () => {
		const error = {};
		const serviceName = "TestService";
		const result = handleValidationError(error, serviceName);
		expect(result.message).to.equal("Validation Error");
	});
});

describe("controllerUtils - handleError", () => {
	it("should set stats to the provided status if error.code is undefined", () => {
		const error = {};
		const serviceName = "TestService";
		const method = "testMethod";
		const status = 400;
		const result = handleError(error, serviceName, method, status);
		expect(result.status).to.equal(status);
	});

	it("should not overwrite error.code if it is already defined", () => {
		const error = { status: 404 };
		const serviceName = "TestService";
		const method = "testMethod";
		const status = 400;
		const result = handleError(error, serviceName, method, status);
		expect(result.status).to.equal(404);
	});

	it("should set service to the provided serviceName if error.service is undefined", () => {
		const error = {};
		const serviceName = "TestService";
		const method = "testMethod";
		const result = handleError(error, serviceName, method);
		expect(result.service).to.equal(serviceName);
	});

	it("should not overwrite error.service if it is already defined", () => {
		const error = { service: "ExistingService" };
		const serviceName = "TestService";
		const method = "testMethod";
		const result = handleError(error, serviceName, method);
		expect(result.service).to.equal("ExistingService");
	});

	it("should set method to the provided method if error.method is undefined", () => {
		const error = {};
		const serviceName = "TestService";
		const method = "testMethod";
		const result = handleError(error, serviceName, method);
		expect(result.method).to.equal(method);
	});

	it("should not overwrite error.method if it is already defined", () => {
		const error = { method: "existingMethod" };
		const serviceName = "TestService";
		const method = "testMethod";
		const result = handleError(error, serviceName, method);
		expect(result.method).to.equal("existingMethod");
	});

	it("should set code to 500 if error.code is undefined and no code is provided", () => {
		const error = {};
		const serviceName = "TestService";
		const method = "testMethod";
		const result = handleError(error, serviceName, method);
		expect(result.status).to.equal(500);
	});
});

describe("controllerUtils - fetchMonitorCertificate", () => {
	const originalTls = {
		connect: sinon.stub().callsFake((options, callback) => {
			// Create socket stub with sinon stubs for all methods
			socket = {
				getPeerX509Certificate: sinon.stub().returns({
					subject: "CN=fake-cert",
					validTo: "Dec 31 23:59:59 2023 GMT",
				}),
				end: sinon.stub(),
				on: sinon.stub(),
			};

			// Use process.nextTick to ensure async behavior
			process.nextTick(() => {
				callback.call(socket); // Ensure correct 'this' binding
			});

			return socket;
		}),
	};

	let tls, monitor, socket;
	beforeEach(() => {
		monitor = { url: "https://www.google.com" };
		tls = {
			connect: sinon.stub().callsFake((options, callback) => {
				// Create socket stub with sinon stubs for all methods
				socket = {
					getPeerX509Certificate: sinon.stub().returns({
						subject: "CN=fake-cert",
						validTo: "Dec 31 23:59:59 2023 GMT",
					}),
					end: sinon.stub(),
					on: sinon.stub(),
				};

				// Use process.nextTick to ensure async behavior
				process.nextTick(() => {
					callback.call(socket); // Ensure correct 'this' binding
				});

				return socket;
			}),
		};
	});

	afterEach(() => {
		tls = { ...originalTls };
		sinon.restore();
	});

	it("should resolve with the certificate when the connection is successful", async () => {
		const certificate = await fetchMonitorCertificate(tls, monitor);
		expect(certificate.validTo).to.equal("Dec 31 23:59:59 2023 GMT");
		expect(socket.end.calledOnce).to.be.true;
	});

	it("should reject with an error when the connection fails", async () => {
		tls.connect = sinon.stub().throws(new Error("Connection error"));
		try {
			await fetchMonitorCertificate(tls, monitor);
		} catch (error) {
			expect(error.message).to.equal("Connection error");
		}
	});

	it("should reject with an error if monitorURL is invalid", async () => {
		monitor.url = "invalid-url";
		try {
			await fetchMonitorCertificate(tls, monitor);
		} catch (error) {
			expect(error.message).to.equal("Invalid URL");
		}
	});
	it("should do a thing", async () => {
		tls = {
			connect: sinon.stub().callsFake((options, callback) => {
				// Create socket stub with sinon stubs for all methods
				socket = {
					getPeerX509Certificate: sinon.stub().throws(new Error("Certificate error")),
					end: sinon.stub(),
					on: sinon.stub(),
				};

				// Use process.nextTick to ensure async behavior
				process.nextTick(() => {
					callback.call(socket); // Ensure correct 'this' binding
				});

				return socket;
			}),
		};
		try {
			await fetchMonitorCertificate(tls, monitor);
		} catch (error) {
			console.log(error);
		}
	});
});
