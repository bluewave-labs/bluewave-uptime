const {
  createMaintenanceWindows,
  getMaintenanceWindowById,
  getMaintenanceWindowsByTeamId,
  getMaintenanceWindowsByMonitorId,
  deleteMaintenanceWindow,
  editMaintenanceWindow,
} = require("../../controllers/maintenanceWindowController");

const jwt = require("jsonwebtoken");
const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");

describe("maintenanceWindowController - createMaintenanceWindows", () => {
  beforeEach(() => {
    req = {
      body: {
        monitors: ["66ff52e7c5911c61698ac724"],
        name: "window",
        active: true,
        start: "2024-10-11T05:27:13.747Z",
        end: "2024-10-11T05:27:14.747Z",
        repeat: "123",
      },
      headers: {
        authorization: "Bearer token",
      },
      settingsService: {
        getSettings: sinon.stub().returns({ jwtSecret: "jwtSecret" }),
      },
      db: {
        createMaintenanceWindow: sinon.stub(),
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
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    req.body = {};
    await createMaintenanceWindows(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
    stub.restore();
  });

  it("should reject with an error if jwt.verify fails", async () => {
    stub = sinon.stub(jwt, "verify").throws(new jwt.JsonWebTokenError());
    await createMaintenanceWindows(req, res, next);
    expect(next.firstCall.args[0]).to.be.instanceOf(jwt.JsonWebTokenError);
    stub.restore();
  });

  it("should reject with an error DB operations fail", async () => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    req.db.createMaintenanceWindow.throws(new Error("DB error"));
    await createMaintenanceWindows(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
    stub.restore();
  });
  it("should return success message if all operations are successful", async () => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    await createMaintenanceWindows(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(201);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MAINTENANCE_WINDOW_CREATE,
      })
    ).to.be.true;
    stub.restore();
  });
});

describe("maintenanceWindowController - getMaintenanceWindowById", () => {
  beforeEach(() => {
    req = {
      body: {},
      params: {
        id: "123",
      },
      headers: {
        authorization: "Bearer token",
      },
      settingsService: {
        getSettings: sinon.stub().returns({ jwtSecret: "jwtSecret" }),
      },
      db: {
        getMaintenanceWindowById: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should reject if param validation fails", async () => {
    req.params = {};
    await getMaintenanceWindowById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });

  it("should reject if DB operations fail", async () => {
    req.db.getMaintenanceWindowById.throws(new Error("DB error"));
    await getMaintenanceWindowById(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
  });
  it("should return success message with data if all operations are successful", async () => {
    req.db.getMaintenanceWindowById.returns({ id: "123" });
    await getMaintenanceWindowById(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MAINTENANCE_WINDOW_GET_BY_ID,
        data: { id: "123" },
      })
    ).to.be.true;
  });
});

describe("maintenanceWindowController - getMaintenanceWindowsByTeamId", () => {
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      headers: {
        authorization: "Bearer token",
      },
      settingsService: {
        getSettings: sinon.stub().returns({ jwtSecret: "jwtSecret" }),
      },
      db: {
        getMaintenanceWindowsByTeamId: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });
  it("should reject if query validation fails", async () => {
    req.query = {
      invalid: 1,
    };
    await getMaintenanceWindowsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject if jwt.verify fails", async () => {
    stub = sinon.stub(jwt, "verify").throws(new jwt.JsonWebTokenError());
    await getMaintenanceWindowsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.instanceOf(jwt.JsonWebTokenError);
    stub.restore();
  });

  it("should reject with an error if DB operations fail", async () => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    req.db.getMaintenanceWindowsByTeamId.throws(new Error("DB error"));
    await getMaintenanceWindowsByTeamId(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("DB error");
    stub.restore();
  });

  it("should return success message with data if all operations are successful", async () => {
    stub = sinon.stub(jwt, "verify").callsFake(() => {
      return { teamId: "123" };
    });
    req.db.getMaintenanceWindowsByTeamId.returns([{ id: "123" }]);
    await getMaintenanceWindowsByTeamId(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.MAINTENANCE_WINDOW_GET_BY_TEAM,
        data: [{ id: jwt.verify().teamId }],
      })
    ).to.be.true;
    stub.restore();
  });
});
