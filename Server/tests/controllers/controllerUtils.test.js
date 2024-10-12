const {
  handleValidationError,
  handleError,
} = require("../../controllers/controllerUtils");

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

describe("handleError", () => {
  it("should set code to the provided code if error.code is undefined", () => {
    const error = {};
    const serviceName = "TestService";
    const method = "testMethod";
    const code = 400;
    const result = handleError(error, serviceName, method, code);
    expect(result.code).to.equal(code);
  });

  it("should not overwrite error.code if it is already defined", () => {
    const error = { code: 404 };
    const serviceName = "TestService";
    const method = "testMethod";
    const code = 400;
    const result = handleError(error, serviceName, method, code);
    expect(result.code).to.equal(404);
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
    expect(result.code).to.equal(500);
  });
});
