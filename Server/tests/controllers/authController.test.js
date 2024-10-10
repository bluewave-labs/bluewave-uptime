const {
  registerUser,
  loginUser,
  editUser,
  checkSuperadminExists,
  requestRecovery,
  validateRecovery,
  resetPassword,
  deleteUser,
  getAllUsers,
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
    expect(next.notCalled).to.be.true;
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
    expect(next.notCalled).to.be.true;
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
    expect(next.notCalled).to.be.true;
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
    expect(next.notCalled).to.be.true;
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
    expect(next.notCalled).to.be.true;
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
    expect(next.notCalled).to.be.true;
  });
});

describe("Auth Controller - validateRecovery", async () => {
  beforeEach(() => {
    req = {
      body: { recoveryToken: "recovery-token" },
      db: {
        validateRecoveryToken: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should call next with a validation error if the token is invalid", async () => {
    req = {
      body: {},
    };
    await validateRecovery(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });

  it("should return a success message if the token is valid", async () => {
    req.db.validateRecoveryToken.resolves();
    await validateRecovery(req, res, next);
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.AUTH_VERIFY_RECOVERY_TOKEN,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });
});

describe("Auth Controller - resetPassword", async () => {
  beforeEach(() => {
    req = {
      body: {
        recoveryToken: "recovery-token",
        password: "Password1!",
      },
      db: {
        resetPassword: sinon.stub(),
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
    newPasswordValidation = {
      validateAsync: sinon.stub(),
    };
    handleValidationError = sinon.stub();
    handleError = sinon.stub();
    issueToken = sinon.stub();
  });
  it("should call next with a validation error if the password is invalid", async () => {
    req.body = { password: "bad_password" };
    await resetPassword(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].status).to.equal(422);
  });
  it("should reset password successfully", async () => {
    const user = { _doc: {} };
    const appSettings = { jwtSecret: "my_secret" };
    const token = "token";

    newPasswordValidation.validateAsync.resolves();
    req.db.resetPassword.resolves(user);
    req.settingsService.getSettings.resolves(appSettings);
    issueToken.returns(token);

    await resetPassword(req, res, next);

    expect(req.db.resetPassword.calledOnceWith(req, res)).to.be.true;
    expect(req.settingsService.getSettings.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.AUTH_RESET_PASSWORD,
        data: { user: sinon.match.object, token: sinon.match.string },
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });
});

describe("Auth Controller - deleteUser", async () => {
  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer token",
      },
      db: {
        getUserByEmail: sinon.stub(),
        getMonitorsByTeamId: sinon.stub(),
        deleteJob: sinon.stub(),
        deleteChecks: sinon.stub(),
        deletePageSpeedChecksByMonitorId: sinon.stub(),
        deleteNotificationsByMonitorId: sinon.stub(),
        deleteTeam: sinon.stub(),
        deleteAllOtherUsers: sinon.stub(),
        deleteMonitorsByUserId: sinon.stub(),
        deleteUser: sinon.stub(),
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

    sinon.stub(jwt, "decode");

    handleError = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });
  it("should return 404 if user is not found", async () => {
    jwt.decode.returns({ email: "test@example.com" });
    req.db.getUserByEmail.resolves(null);

    await deleteUser(req, res, next);

    expect(req.db.getUserByEmail.calledOnceWith("test@example.com")).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(next.firstCall.args[0].message).to.equal(
      errorMessages.DB_USER_NOT_FOUND
    );
    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
  });

  it("should delete user and associated data if user is superadmin", async () => {
    const user = {
      _id: "user_id",
      email: "test@example.com",
      role: ["superadmin"],
      teamId: "team_id",
    };
    const monitors = [{ _id: "monitor_id" }];

    jwt.decode.returns({ email: "test@example.com" });
    req.db.getUserByEmail.resolves(user);
    req.db.getMonitorsByTeamId.resolves({ monitors });

    await deleteUser(req, res, next);

    expect(req.db.getUserByEmail.calledOnceWith("test@example.com")).to.be.true;
    expect(
      req.db.getMonitorsByTeamId.calledOnceWith({
        params: { teamId: "team_id" },
      })
    ).to.be.true;
    expect(req.jobQueue.deleteJob.calledOnceWith(monitors[0])).to.be.true;
    expect(req.db.deleteChecks.calledOnceWith("monitor_id")).to.be.true;
    expect(req.db.deletePageSpeedChecksByMonitorId.calledOnceWith("monitor_id"))
      .to.be.true;
    expect(req.db.deleteNotificationsByMonitorId.calledOnceWith("monitor_id"))
      .to.be.true;
    expect(req.db.deleteTeam.calledOnceWith("team_id")).to.be.true;
    expect(req.db.deleteAllOtherUsers.calledOnce).to.be.true;
    expect(req.db.deleteMonitorsByUserId.calledOnceWith("user_id")).to.be.true;
    expect(req.db.deleteUser.calledOnceWith("user_id")).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.AUTH_DELETE_USER,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should delete user if user is not superadmin", async () => {
    const user = {
      _id: "user_id",
      email: "test@example.com",
      role: ["user"],
      teamId: "team_id",
    };

    jwt.decode.returns({ email: "test@example.com" });
    req.db.getUserByEmail.resolves(user);

    await deleteUser(req, res, next);

    expect(req.db.getUserByEmail.calledOnceWith("test@example.com")).to.be.true;
    expect(
      req.db.getMonitorsByTeamId.calledOnceWith({
        params: { teamId: "team_id" },
      })
    ).to.be.true;
    expect(req.db.deleteUser.calledOnceWith("user_id")).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: successMessages.AUTH_DELETE_USER,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should handle errors", async () => {
    const error = new Error("Something went wrong");
    const SERVICE_NAME = "AuthController";
    jwt.decode.returns({ email: "test@example.com" });
    req.db.getUserByEmail.rejects(error);
    await deleteUser(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(next.firstCall.args[0].message).to.equal("Something went wrong");
    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
  });
});

describe("Auth Controller - getAllUsers", async () => {
  beforeEach(() => {
    req = {
      db: {
        getAllUsers: sinon.stub(),
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

  it("should return 200 and all users", async () => {
    const allUsers = [{ id: 1, name: "John Doe" }];
    req.db.getAllUsers.resolves(allUsers);

    await getAllUsers(req, res, next);

    expect(req.db.getAllUsers.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(
      res.json.calledOnceWith({
        success: true,
        msg: "Got all users",
        data: allUsers,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should call next with error when an exception occurs", async () => {
    const error = new Error("Something went wrong");
    req.db.getAllUsers.rejects(error);
    await getAllUsers(req, res, next);
    expect(req.db.getAllUsers.calledOnce).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
  });
});
