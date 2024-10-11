const {
  getAllMonitors,
  getMonitorStatsById,
  getMonitorCertificate,
  getMonitorById,
  getMonitorsAndSummaryByTeamId,
  getMonitorsByTeamId,
  createMonitor,
  deleteMonitor,
  deleteAllMonitors,
  editMonitor,
  pauseMonitor,
  addDemoMonitors,
} = require("../../controllers/monitorController");
const jwt = require("jsonwebtoken");
const proxyquire = require("proxyquire");
const sinon = require("sinon");
const { errorMessages, successMessages } = require("../../utils/messages");
const sslCheckerStub = sinon.stub();
const monitorController = proxyquire("../../controllers/monitorController", {
  "ssl-checker": sslCheckerStub,
});

describe("Monitor Controller - getAllMonitors", () => {
  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      db: {
        getAllMonitors: sinon.stub(),
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
  it("should reject with an error if DB operations fail", async () => {
    req.db.getAllMonitors.throws(new Error("DB error"));
    await getAllMonitors(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });

  it("should return success message and data if all operations succeed", async () => {
    const data = [{ monitor: "data" }];
    req.db.getAllMonitors.returns(data);
    await getAllMonitors(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_GET_ALL,
        data: data,
      })
    ).to.be.true;
  });
});

describe("Monitor Controller - getMonitorStatsById", () => {
  beforeEach(() => {
    req = {
      params: {
        monitorId: "123",
      },
      query: {},
      body: {},
      db: {
        getMonitorStatsById: sinon.stub(),
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

  it("should reject with an error if param validation fails", async () => {
    req.params = {};
    await getMonitorStatsById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if query validation fails", async () => {
    req.query = { invalid: 1 };
    await getMonitorStatsById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB operations fail", async () => {
    req.db.getMonitorStatsById.throws(new Error("DB error"));
    await getMonitorStatsById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should return success message and data if all operations succeed", async () => {
    const data = [{ monitorStats: "data" }];
    req.db.getMonitorStatsById.returns(data);
    await getMonitorStatsById(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_STATS_BY_ID,
        data: data,
      })
    ).to.be.true;
  });
});

describe("Monitor Controller - getMonitorCertificate", () => {
  beforeEach(() => {
    req = {
      params: {
        monitorId: "123",
      },
      query: {},
      body: {},
      db: {
        getMonitorById: sinon.stub(),
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

  it("should reject with an error if param validation fails", async () => {
    req.params = {};
    await getMonitorCertificate(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if creating a URL fails", async () => {
    req.db.getMonitorById.returns(null);
    await getMonitorCertificate(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0]).to.be.instanceOf(TypeError);
  });
  it("should reject with an error if SSL checker fails", async () => {
    req.db.getMonitorById.returns({ url: "https://example.com" });
    sslCheckerStub.throws(new Error("SSL checker error"));
    await monitorController.getMonitorCertificate(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("SSL checker error");
  });
  it("should return success message and data if all operations succeed", async () => {
    req.db.getMonitorById.returns({ url: "https://example.com" });
    const certificate = { validTo: 1 };
    sslCheckerStub.returns(certificate);
    await monitorController.getMonitorCertificate(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: {
          certificateDate: new Date(certificate.validTo).toLocaleDateString(),
        },
      })
    ).to.be.true;
  });
  it("should return success message and N/A if certificate is not found", async () => {
    req.db.getMonitorById.returns({ url: "https://example.com" });
    sslCheckerStub.returns(null);
    await monitorController.getMonitorCertificate(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: {
          certificateDate: "N/A",
        },
      })
    ).to.be.true;
  });

  it("should return success message and N/A if certificate doesn't have validTo", async () => {
    req.db.getMonitorById.returns({ url: "https://example.com" });
    sslCheckerStub.returns({ valid: 1 });
    await monitorController.getMonitorCertificate(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_CERTIFICATE,
        data: {
          certificateDate: "N/A",
        },
      })
    ).to.be.true;
  });
});

describe("Monitor Controller - getMonitorById", () => {
  beforeEach(() => {
    req = {
      params: {
        monitorId: "123",
      },
      query: {},
      body: {},
      db: {
        getMonitorById: sinon.stub(),
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
  it("should reject with an error if param validation fails", async () => {
    req.params = {};
    await getMonitorById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if query param validation fails", async () => {
    req.query = { invalid: 1 };
    await getMonitorById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB operations fail", async () => {
    req.db.getMonitorById.throws(new Error("DB error"));
    await getMonitorById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should return 404 if a monitor is not found", async () => {
    req.db.getMonitorById.returns(null);
    await getMonitorById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(404);
  });
  it("should return success message and data if all operations succeed", async () => {
    const data = { monitor: "data" };
    req.db.getMonitorById.returns(data);
    await getMonitorById(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_GET_BY_ID,
        data: data,
      })
    ).to.be.true;
  });
});

describe("Monitor Controller - getMonitorsAndSummaryByTeamId", () => {
  beforeEach(() => {
    req = {
      params: {
        teamId: "123",
      },
      query: {},
      body: {},
      db: {
        getMonitorsAndSummaryByTeamId: sinon.stub(),
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

  it("should reject with an error if param validation fails", async () => {
    req.params = {};
    await getMonitorsAndSummaryByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if query validation fails", async () => {
    req.query = { invalid: 1 };
    await getMonitorsAndSummaryByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB operations fail", async () => {
    req.db.getMonitorsAndSummaryByTeamId.throws(new Error("DB error"));
    await getMonitorsAndSummaryByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should return success message and data if all operations succeed", async () => {
    const data = { monitors: "data", summary: "data" };
    req.db.getMonitorsAndSummaryByTeamId.returns(data);
    await getMonitorsAndSummaryByTeamId(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_GET_BY_USER_ID(req.params.teamId),
        data: data,
      })
    ).to.be.true;
  });
});
