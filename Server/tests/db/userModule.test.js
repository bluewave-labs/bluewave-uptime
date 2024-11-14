import sinon from "sinon";
import UserModel from "../../db/models/User.js";
import TeamModel from "../../db/models/Team.js";
import {
	insertUser,
	getUserByEmail,
	updateUser,
	deleteUser,
	deleteTeam,
	deleteAllOtherUsers,
	getAllUsers,
	logoutUser,
} from "../../db/mongo/modules/userModule.js";
import { errorMessages } from "../../utils/messages.js";

const mockUser = {
	email: "test@test.com",
	password: "password",
	role: ["user"],
};
const mockSuperUser = {
	email: "test@test.com",
	password: "password",
	role: ["superadmin"],
};
const imageFile = {
	image: 1,
};

describe("userModule", () => {
	let teamSaveStub,
		teamFindByIdAndDeleteStub,
		userSaveStub,
		userFindStub,
		userFindOneStub,
		userFindByIdAndUpdateStub,
		userFindByIdAndDeleteStub,
		userDeleteManyStub,
		userUpdateOneStub,
		generateAvatarImageStub,
		parseBooleanStub;
	beforeEach(() => {
		teamSaveStub = sinon.stub(TeamModel.prototype, "save");
		teamFindByIdAndDeleteStub = sinon.stub(TeamModel, "findByIdAndDelete");
		userSaveStub = sinon.stub(UserModel.prototype, "save");
		userFindStub = sinon.stub(UserModel, "find");
		userFindOneStub = sinon.stub(UserModel, "findOne");
		userFindByIdAndUpdateStub = sinon.stub(UserModel, "findByIdAndUpdate");
		userFindByIdAndDeleteStub = sinon.stub(UserModel, "findByIdAndDelete");
		userDeleteManyStub = sinon.stub(UserModel, "deleteMany");
		userUpdateOneStub = sinon.stub(UserModel, "updateOne");
		generateAvatarImageStub = sinon.stub().resolves({ image: 2 });
		parseBooleanStub = sinon.stub().returns(true);
	});

	afterEach(() => {
		sinon.restore();
	});

	describe("insertUser", () => {
		it("should insert a regular user", async () => {
			userSaveStub.resolves(mockUser);
			userFindOneStub.returns({
				select: sinon.stub().returns({
					select: sinon.stub().resolves(mockUser),
				}),
			});
			const result = await insertUser(mockUser, imageFile, generateAvatarImageStub);
			expect(result).to.deep.equal(mockUser);
		});
		it("should insert a superadmin user", async () => {
			userSaveStub.resolves(mockSuperUser);
			userFindOneStub.returns({
				select: sinon.stub().returns({
					select: sinon.stub().resolves(mockSuperUser),
				}),
			});
			const result = await insertUser(mockSuperUser, imageFile, generateAvatarImageStub);
			expect(result).to.deep.equal(mockSuperUser);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userSaveStub.rejects(err);
			try {
				await insertUser(mockUser, imageFile, generateAvatarImageStub);
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
		it("should handle a duplicate key error", async () => {
			const err = new Error("test error");
			err.code = 11000;
			userSaveStub.rejects(err);
			try {
				await insertUser(mockUser, imageFile, generateAvatarImageStub);
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});
	describe("getUserByEmail", () => {
		it("should return a user", async () => {
			userFindOneStub.returns({
				select: sinon.stub().resolves(mockUser),
			});
			const result = await getUserByEmail(mockUser.email);
			expect(result).to.deep.equal(mockUser);
		});
	});
	describe("getUserByEmail", () => {
		it("throw an error if a user is not found", async () => {
			userFindOneStub.returns({
				select: sinon.stub().resolves(null),
			});
			try {
				await getUserByEmail(mockUser.email);
			} catch (error) {
				expect(error.message).to.equal(errorMessages.DB_USER_NOT_FOUND);
			}
		});
	});
	describe("updateUser", () => {
		let req, res;
		beforeEach(() => {
			req = {
				params: {
					userId: "testId",
				},
				body: {
					deleteProfileImage: "false",
					email: "test@test.com",
				},
				file: {
					buffer: "test",
					mimetype: "test",
				},
			};
			res = {};
		});

		afterEach(() => {});
		it("should update a user", async () => {
			parseBooleanStub.returns(false);
			userFindByIdAndUpdateStub.returns({
				select: sinon.stub().returns({
					select: sinon.stub().resolves(mockUser),
				}),
			});
			const result = await updateUser(
				req,
				res,
				parseBooleanStub,
				generateAvatarImageStub
			);
			expect(result).to.deep.equal(mockUser);
		});
		it("should delete a user profile image", async () => {
			req.body.deleteProfileImage = "true";
			userFindByIdAndUpdateStub.returns({
				select: sinon.stub().returns({
					select: sinon.stub().resolves(mockUser),
				}),
			});
			const result = await updateUser(
				req,
				res,
				parseBooleanStub,
				generateAvatarImageStub
			);
			expect(result).to.deep.equal(mockUser);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userFindByIdAndUpdateStub.throws(err);
			try {
				await updateUser(req, res, parseBooleanStub, generateAvatarImageStub);
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});
	describe("deleteUser", async () => {
		it("should return a deleted user", async () => {
			userFindByIdAndDeleteStub.resolves(mockUser);
			const result = await deleteUser("testId");
			expect(result).to.deep.equal(mockUser);
		});
		it("should throw an error if a user is not found", async () => {
			try {
				await deleteUser("testId");
			} catch (error) {
				expect(error).to.exist;
				expect(error.message).to.equal(errorMessages.DB_USER_NOT_FOUND);
			}
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userFindByIdAndDeleteStub.throws(err);
			try {
				await deleteUser("testId");
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});

	describe("deleteTeam", () => {
		it("should return true if team deleted", async () => {
			teamFindByIdAndDeleteStub.resolves();
			const result = await deleteTeam("testId");
			expect(result).to.equal(true);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			teamFindByIdAndDeleteStub.throws(err);
			try {
				await deleteTeam("testId");
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});

	describe("deleteAllOtherUsers", () => {
		it("should return true if all other users deleted", async () => {
			userDeleteManyStub.resolves(true);
			const result = await deleteAllOtherUsers();
			expect(result).to.equal(true);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userDeleteManyStub.throws(err);
			try {
				await deleteAllOtherUsers();
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});

	describe("getAllUsers", () => {
		it("should return all users", async () => {
			userFindStub.returns({
				select: sinon.stub().returns({
					select: sinon.stub().resolves([mockUser]),
				}),
			});
			const result = await getAllUsers();
			expect(result).to.deep.equal([mockUser]);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userFindStub.throws(err);
			try {
				await getAllUsers();
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});

	describe("logoutUser", async () => {
		it("should return true if user logged out", async () => {
			userUpdateOneStub.resolves(true);
			const result = await logoutUser("testId");
			expect(result).to.equal(true);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			userUpdateOneStub.throws(err);
			try {
				await logoutUser("testId");
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});
});
