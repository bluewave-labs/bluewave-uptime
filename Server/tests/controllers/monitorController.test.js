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
const logger = require("../../utils/logger");
const SERVICE_NAME = "monitorController";

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

describe("Monitor Controller - getMonitorsByTeamId", () => {
  beforeEach(() => {
    req = {
      params: {
        teamId: "123",
      },
      query: {},
      body: {},
      db: {
        getMonitorsByTeamId: sinon.stub(),
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
    await getMonitorsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if query validation fails", async () => {
    req.query = { invalid: 1 };
    await getMonitorsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB operations fail", async () => {
    req.db.getMonitorsByTeamId.throws(new Error("DB error"));
    await getMonitorsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should return success message and data if all operations succeed", async () => {
    const data = { monitors: "data" };
    req.db.getMonitorsByTeamId.returns(data);
    await getMonitorsByTeamId(req, res, next);
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

describe("Monitor Controller - createMonitor", () => {
  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {
        userId: "123",
        teamId: "123",
        name: "test_monitor",
        description: "test_monitor_desc",
        type: "http",
        url: "https://example.com",
        notifications: [{ email: "example@example.com" }],
      },
      db: {
        createMonitor: sinon.stub(),
        createNotification: sinon.stub(),
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
  it("should reject with an error if body validation fails", async () => {
    req.body = {};
    await createMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB createMonitor operation fail", async () => {
    req.db.createMonitor.throws(new Error("DB error"));
    await createMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should reject with an error if DB createNotification operation fail", async () => {
    req.db.createNotification.throws(new Error("DB error"));
    req.db.createMonitor.returns({ _id: "123" });
    await createMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should reject with an error if DB createNotification operation fail", async () => {
    req.db.createMonitor.returns({
      _id: "123",
      save: sinon.stub().throws(new Error("DB error")),
    });
    await createMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
});

describe("Monitor Controller - deleteMonitor", () => {
  beforeEach(() => {
    req = {
      params: {
        monitorId: "123",
      },
      query: {},
      body: {},
      db: {
        deleteMonitor: sinon.stub(),
        deleteChecks: sinon.stub(),
        deletePageSpeedChecksByMonitorId: sinon.stub(),
        deleteNotificationsByMonitorId: sinon.stub(),
      },
      jobQueue: {
        deleteJob: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    sinon.stub(logger, "error");
  });
  afterEach(() => {
    sinon.restore();
  });
  it("should reject with an error if param validation fails", async () => {
    req.params = {};
    await deleteMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject with an error if DB deleteMonitor operation fail", async () => {
    req.db.deleteMonitor.throws(new Error("DB error"));
    await deleteMonitor(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should log an error if deleteJob throws an error", async () => {
    const error = new Error("Job error");
    const monitor = { name: "test_monitor", _id: "123" };
    req.db.deleteMonitor.returns(monitor);
    req.jobQueue.deleteJob.rejects(error);
    await monitorController.deleteMonitor(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.equal(
      `Error deleting associated records for monitor ${monitor._id} with name ${monitor.name}`
    );
    expect(logger.error.firstCall.args[1]).to.deep.equal({
      method: "deleteMonitor",
      service: SERVICE_NAME,
      error: error.message,
    });
  });
  it("should log an error if deleteChecks throws an error", async () => {
    const error = new Error("Checks error");
    const monitor = { name: "test_monitor", _id: "123" };
    req.db.deleteMonitor.returns(monitor);
    req.db.deleteChecks.rejects(error);
    await monitorController.deleteMonitor(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.equal(
      `Error deleting associated records for monitor ${monitor._id} with name ${monitor.name}`
    );
    expect(logger.error.firstCall.args[1]).to.deep.equal({
      method: "deleteMonitor",
      service: SERVICE_NAME,
      error: error.message,
    });
  });
  it("should log an error if deletePageSpeedChecksByMonitorId throws an error", async () => {
    const error = new Error("PageSpeed error");
    const monitor = { name: "test_monitor", _id: "123" };
    req.db.deleteMonitor.returns(monitor);
    req.db.deletePageSpeedChecksByMonitorId.rejects(error);
    await monitorController.deleteMonitor(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.equal(
      `Error deleting associated records for monitor ${monitor._id} with name ${monitor.name}`
    );
    expect(logger.error.firstCall.args[1]).to.deep.equal({
      method: "deleteMonitor",
      service: SERVICE_NAME,
      error: error.message,
    });
  });
  it("should log an error if deleteNotificationsByMonitorId throws an error", async () => {
    const error = new Error("Notifications error");
    const monitor = { name: "test_monitor", _id: "123" };
    req.db.deleteMonitor.returns(monitor);
    req.db.deleteNotificationsByMonitorId.rejects(error);
    await monitorController.deleteMonitor(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.equal(
      `Error deleting associated records for monitor ${monitor._id} with name ${monitor.name}`
    );
    expect(logger.error.firstCall.args[1]).to.deep.equal({
      method: "deleteMonitor",
      service: SERVICE_NAME,
      error: error.message,
    });
  });
  it("should return success message if all operations succeed", async () => {
    const monitor = { name: "test_monitor", _id: "123" };
    req.db.deleteMonitor.returns(monitor);
    await monitorController.deleteMonitor(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MONITOR_DELETE,
      })
    ).to.be.true;
  });
});

describe("Monitor Controller - deleteAllMonitors", () => {
  beforeEach(() => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    req = {
      headers: {
        authorization: "Bearer token",
      },
      params: {
        monitorId: "123",
      },
      query: {},
      body: {},
      db: {
        deleteAllMonitors: sinon.stub(),
        deleteChecks: sinon.stub(),
        deletePageSpeedChecksByMonitorId: sinon.stub(),
        deleteNotificationsByMonitorId: sinon.stub(),
      },
      jobQueue: {
        deleteJob: sinon.stub(),
      },
      settingsService: {
        getSettings: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    sinon.stub(logger, "error");
  });
  afterEach(() => {
    sinon.restore();
    stub.restore();
  });
  it("should reject with an error if getTokenFromHeaders throws an error", async () => {
    req.headers = {};
    await monitorController.deleteAllMonitors(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("No auth headers");
    expect(next.firstCall.args[0].status).to.equal(500);
  });
  it("should reject with an error if token validation fails", async () => {
    stub.restore();
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    await monitorController.deleteAllMonitors(req, res, next);
    expect(next.firstCall.args[0]).to.be.instanceOf(jwt.JsonWebTokenError);
  });
  it("should reject with an error if DB deleteAllMonitors operation fail", async () => {
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    req.db.deleteAllMonitors.throws(new Error("DB error"));
    await monitorController.deleteAllMonitors(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should log an error if deleteJob throws an error", async () => {
    const monitors = [{ name: "test_monitor", _id: "123" }];
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    req.db.deleteAllMonitors.returns({ monitors, deletedCount: 1 });
    const error = new Error("Job error");
    req.jobQueue.deleteJob.rejects(error);
    await monitorController.deleteAllMonitors(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.deep.equal(
      `Error deleting associated records for monitor ${monitors[0]._id} with name ${monitors[0].name}`
    );
  });
  it("should log an error if deleteChecks throws an error", async () => {
    const monitors = [{ name: "test_monitor", _id: "123" }];
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    req.db.deleteAllMonitors.returns({ monitors, deletedCount: 1 });
    const error = new Error("Check error");
    req.db.deleteChecks.rejects(error);
    await monitorController.deleteAllMonitors(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.deep.equal(
      `Error deleting associated records for monitor ${monitors[0]._id} with name ${monitors[0].name}`
    );
  });
  it("should log an error if deletePageSpeedChecksByMonitorId throws an error", async () => {
    const monitors = [{ name: "test_monitor", _id: "123" }];
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    req.db.deleteAllMonitors.returns({ monitors, deletedCount: 1 });
    const error = new Error("Pagespeed Check error");
    req.db.deletePageSpeedChecksByMonitorId.rejects(error);
    await monitorController.deleteAllMonitors(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.deep.equal(
      `Error deleting associated records for monitor ${monitors[0]._id} with name ${monitors[0].name}`
    );
  });
  it("should log an error if deleteNotificationsByMonitorId throws an error", async () => {
    const monitors = [{ name: "test_monitor", _id: "123" }];
    req.settingsService.getSettings.returns({ jwtSecret: "my_secret" });
    req.db.deleteAllMonitors.returns({ monitors, deletedCount: 1 });
    const error = new Error("Notifications Check error");
    req.db.deleteNotificationsByMonitorId.rejects(error);
    await monitorController.deleteAllMonitors(req, res, next);
    expect(logger.error.calledOnce).to.be.true;
    expect(logger.error.firstCall.args[0]).to.deep.equal(
      `Error deleting associated records for monitor ${monitors[0]._id} with name ${monitors[0].name}`
    );
  });
});
