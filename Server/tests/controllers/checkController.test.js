const { createCheck, getChecks } = require("../../controllers/checkController");
const jwt = require("jsonwebtoken");
const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");

describe("Check Controller - createCheck", () => {
  beforeEach(() => {
    req = {
      params: {},
      body: {},
      db: {
        createCheck: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    handleError = sinon.stub();
  });

  afterEach(() => {
    sinon.restore(); // Restore the original methods after each test
  });

  it("should reject with a validation if params are invalid", async () => {
    await createCheck(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });

  it("should reject with a validation error if body is invalid", async () => {
    req.params = {
      monitorId: "monitorId",
    };
    await createCheck(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
  });
  it("should return a success message if check is created", async () => {
    req.params = {
      monitorId: "monitorId",
    };
    req.db.createCheck.resolves({ id: "123" });
    req.body = {
      monitorId: "monitorId",
      status: true,
      responseTime: 100,
      statusCode: 200,
      message: "message",
    };
    await createCheck(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.CHECK_CREATE,
        data: { id: "123" },
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });
});

describe("Check Controller - getChecks", () => {
  beforeEach(() => {
    req = {
      params: {},
      query: {},
      db: {
        getChecks: sinon.stub(),
        getChecksCount: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should reject with a validation error if params are invalid", async () => {
    await getChecks(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });

  it("should return a success message if checks are found", async () => {
    req.params = {
      monitorId: "monitorId",
    };
    req.db.getChecks.resolves([{ id: "123" }]);
    req.db.getChecksCount.resolves(1);
    await getChecks(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.CHECK_GET,
        data: { checksCount: 1, checks: [{ id: "123" }] },
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should handle errors", async () => {
    req.db.getChecks.rejects(new Error("error"));
    await getChecks(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    req.db.getChecks.resolves([]);
    req.db.getChecksCount.rejects(new Error("error"));
    await getChecks(req, res, next);
  });
});
