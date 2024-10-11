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
const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");

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
