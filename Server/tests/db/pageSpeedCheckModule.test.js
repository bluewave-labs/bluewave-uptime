import sinon from "sinon";
import PageSpeedCheck from "../../db/models/PageSpeedCheck.js";
import {
	createPageSpeedCheck,
	deletePageSpeedChecksByMonitorId,
} from "../../db/mongo/modules/pageSpeedCheckModule.js";

const mockPageSpeedCheck = {
	monitorId: "monitorId",
	bestPractices: 1,
	seo: 1,
	performance: 1,
};

const mockDeletedResult = { deletedCount: 1 };

describe("pageSpeedCheckModule", () => {
	let pageSpeedCheckSaveStub, pageSpeedCheckDeleteManyStub;
	beforeEach(() => {
		pageSpeedCheckSaveStub = sinon.stub(PageSpeedCheck.prototype, "save");
		pageSpeedCheckDeleteManyStub = sinon.stub(PageSpeedCheck, "deleteMany");
	});

	afterEach(() => {
		sinon.restore();
	});

	describe("createPageSpeedCheck", () => {
		it("should return a page speed check", async () => {
			pageSpeedCheckSaveStub.resolves(mockPageSpeedCheck);
			const pageSpeedCheck = await createPageSpeedCheck(mockPageSpeedCheck);
			expect(pageSpeedCheck).to.deep.equal(mockPageSpeedCheck);
		});

		it("should handle an error", async () => {
			const err = new Error("test error");
			pageSpeedCheckSaveStub.rejects(err);
			try {
				await expect(createPageSpeedCheck(mockPageSpeedCheck));
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});

	describe("deletePageSpeedChecksByMonitorId", () => {
		it("should return the number of deleted checks", async () => {
			pageSpeedCheckDeleteManyStub.resolves(mockDeletedResult);
			const result = await deletePageSpeedChecksByMonitorId("monitorId");
			expect(result).to.deep.equal(mockDeletedResult.deletedCount);
		});

		it("should handle an error", async () => {
			const err = new Error("test error");
			pageSpeedCheckDeleteManyStub.rejects(err);
			try {
				await expect(deletePageSpeedChecksByMonitorId("monitorId"));
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});
});
