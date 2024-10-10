const {
  registerUser,
  loginUser,
  editUser,
  checkSuperadminExists,
  requestRecovery,
} = require("../../controllers/authController");
const jwt = require("jsonwebtoken");

const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");
describe("Auth Controller - registerUser", () => {
  // Set up test
  beforeEach(() => {
    req = {
      db: {
        checkSuperadmin: sinon.stub(),
        getInviteTokenAndDelete: sinon.stub(),
        updateAppSettings: sinon.stub(),
        insertUser: sinon.stub(),
      },
      settingsService: {
        getSettings: sinon.stub().resolves({
          jwtSecret: "my_secret",
        }),
      },
      emailService: {
        buildAndSendEmail: sinon.stub().returns(Promise.resolve()),
      },
      file: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should register a valid user", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Uptime1!",
      inviteToken: "someToken",
      role: ["user"],
      teamId: "123",
    };
    req.db.checkSuperadmin.resolves(false);
    req.db.insertUser.resolves({
      _id: "123",
      _doc: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    await registerUser(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith(
        sinon.match({
          success: true,
          msg: sinon.match.string,
          data: {
            user: sinon.match.object,
            token: sinon.match.string,
          },
        })
      )
    ).to.be.true;
  });
  it("should reject a user with an invalid password", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "bad_password",
      inviteToken: "someToken",
      role: ["user"],
      teamId: "123",
    };
    await registerUser(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reject a user with an invalid role", async () => {
    req.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Uptime1!",
      inviteToken: "someToken",
      role: ["superman"],
      teamId: "123",
    };
    await registerUser(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
});

describe("Auth Controller - loginUser", () => {
  beforeEach(() => {
    req = {
      body: { email: "test@example.com", password: "Password123!" },
      db: {
        getUserByEmail: sinon.stub(),
      },
      settingsService: {
        getSettings: sinon.stub().resolves({
          jwtSecret: "my_secret",
        }),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    user = {
      _doc: {
        email: "test@example.com",
      },
      comparePassword: sinon.stub(),
    };
  });
  it("should login user successfully", async () => {
    req.db.getUserByEmail.resolves(user);
    user.comparePassword.resolves(true);
    await loginUser(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.AUTH_LOGIN_USER,
        data: {
          user: {
            email: "test@example.com",
            avatarImage: undefined,
          },
          token: sinon.match.string,
        },
      })
    ).to.be.true;
  });
  it("should reject a user with an incorrect password", async () => {
    req.body = {
      email: "test@test.com",
      password: "Password123!",
    };
    req.db.getUserByEmail.resolves(user);
    user.comparePassword.resolves(false);
    await loginUser(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal(
      errorMessages.AUTH_INCORRECT_PASSWORD
    );
  });
});

describe("Auth Controller - editUser", async () => {
  beforeEach(() => {
    req = {
      params: { userId: "123" },
      body: { password: "Password1!", newPassword: "Password2!" },
      headers: { authorization: "Bearer token" },
      user: { _id: "123" },
      settingsService: {
        getSettings: sinon.stub().returns({ jwtSecret: "my_secret" }),
      },
      db: {
        getUserByEmail: sinon.stub(),
        updateUser: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should edit a user if it receives a proper request", async () => {
    sinon.stub(jwt, "verify").returns({ email: "test@example.com" });
    const user = {
      comparePassword: sinon.stub().resolves(true),
    };
    req.db.getUserByEmail.resolves(user);
    req.db.updateUser.resolves({ email: "test@example.com" });

    await editUser(req, res, next);

    expect(req.db.getUserByEmail.calledOnce).to.be.true;
    expect(req.db.updateUser.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.AUTH_UPDATE_USER,
        data: { email: "test@example.com" },
      })
    ).to.be.true;
  });

  it("should reject an edit request if password format is incorrect", async () => {
    req.body = { password: "bad_password", newPassword: "bad_password" };
    const user = {
      comparePassword: sinon.stub().resolves(true),
    };
    req.db.getUserByEmail.resolves(user);

    await editUser(req, res, next);

    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
});

describe("Auth Controller - checkSuperadminExists", async () => {
  beforeEach(() => {
    req = {
      db: {
        checkSuperadmin: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should return true if a superadmin exists", async () => {
    req.db.checkSuperadmin.resolves(true);
    await checkSuperadminExists(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.AUTH_SUPERADMIN_EXISTS,
        data: true,
      })
    ).to.be.true;
  });

  it("should return false if a superadmin does not exist", async () => {
    req.db.checkSuperadmin.resolves(false);
    await checkSuperadminExists(req, res, next);
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        success: true,
        msg: successMessages.AUTH_SUPERADMIN_EXISTS,
        data: false,
      })
    ).to.be.true;
  });
});

describe("Auth Controller - requestRecovery", async () => {
  beforeEach(() => {
    req = {
      body: { email: "test@test.com" },
      db: {
        getUserByEmail: sinon.stub(),
        requestRecoveryToken: sinon.stub(),
      },
      settingsService: {
        getSettings: sinon.stub().returns({ clientHost: "http://localhost" }),
      },
      emailService: {
        buildAndSendEmail: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });
  it("should throw an error if the email is not provided", async () => {
    req.body = {};
    await requestRecovery(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should return a success message if the email is provided", async () => {
    const user = { firstName: "John" };
    const recoveryToken = { token: "recovery-token" };
    const msgId = "message-id";
    req.db.getUserByEmail.resolves(user);
    req.db.requestRecoveryToken.resolves(recoveryToken);
    req.emailService.buildAndSendEmail.resolves(msgId);
    await requestRecovery(req, res, next);
    expect(req.db.getUserByEmail.calledOnceWith("test@test.com")).to.be.true;
    expect(req.db.requestRecoveryToken.calledOnceWith(req, res)).to.be.true;
    expect(
      req.emailService.buildAndSendEmail.calledOnceWith(
        "passwordResetTemplate",
        {
          name: "John",
          email: "test@test.com",
          url: "http://localhost/set-new-password/recovery-token",
        },
        "test@test.com",
        "Bluewave Uptime Password Reset"
      )
    ).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.AUTH_CREATE_RECOVERY_TOKEN,
        data: msgId,
      })
    ).to.be.true;
  });
});
