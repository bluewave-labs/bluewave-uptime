const { afterEach } = require("node:test");
const {
  getAppSettings,
  updateAppSettings,
} = require("../../controllers/settingsController");

const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");

describe("Settings Controller - getAppSettings", () => {
  beforeEach(() => {
    req = {
      headers: {},
      params: {},
      body: {},
      db: {},
      settingsService: {
        getSettings: sinon.stub(),
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
    sinon.restore();
  });
  it("should throw an error if getSettings throws an error", async () => {
    req.settingsService.getSettings.throws(new Error("getSettings error"));
    await getAppSettings(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("getSettings error");
  });

  it("should return a success message and data if getSettings is successful", async () => {
    const data = { data: "settings" };
    req.settingsService.getSettings.returns(data);
    await getAppSettings(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(res.json.firstCall.args[0]).to.deep.equal({
      success: true,
      msg: successMessages.GET_APP_SETTINGS,
      data,
    });
  });
});
