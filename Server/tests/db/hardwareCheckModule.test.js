import sinon from "sinon";
import HardwareCheck from "../../db/models/HardwareCheck.js";
import { createHardwareCheck } from "../../db/mongo/modules/hardwareCheckModule.js";

describe("HardwareCheck Module", () => {
	describe("createHardwareCheck", () => {
		let hardwareCheckSaveStub;
		let mockCheck = { _id: 123, status: true };
		beforeEach(() => {
			hardwareCheckSaveStub = sinon
				.stub(HardwareCheck.prototype, "save")
				.resolves(mockCheck);
		});

		afterEach(() => {
			sinon.restore();
		});

		it("should create a new hardware check", async () => {
			const hardwareCheckData = {};
			const hardwareCheck = await createHardwareCheck(hardwareCheckData);
			expect(hardwareCheck).to.deep.equal(mockCheck);
		});

		it("should handle an error", async () => {
			const err = new Error("test error");
			hardwareCheckSaveStub.rejects(err);
			try {
				await createHardwareCheck({});
			} catch (error) {
				expect(error).to.deep.equal(err);
				expect(error.method).to.equal("createHardwareCheck");
			}
		});
	});
});
