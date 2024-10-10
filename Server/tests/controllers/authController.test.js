const { registerUser, loginUser } = require("../../controllers/authController");
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
