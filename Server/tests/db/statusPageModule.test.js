import sinon from "sinon";
import {
	createStatusPage,
	getStatusPageByUrl,
	urlIsUnique,
} from "../../db/mongo/modules/statusPageModule.js";
import StatusPage from "../../db/models/StatusPage.js";
import { errorMessages } from "../../utils/messages.js";

describe("statusPageModule", () => {
	let statusPageFindOneStub, statusPageSaveStub, statusPageFindStub;
	beforeEach(() => {
		statusPageSaveStub = sinon.stub(StatusPage.prototype, "save");
		statusPageFindOneStub = sinon.stub(StatusPage, "findOne");
		statusPageFindStub = sinon.stub(StatusPage, "find");
	});
	afterEach(() => {
		sinon.restore();
	});
	describe("createStatusPage", () => {
		it("should throw an error if a non-unique url is provided", async () => {
			statusPageFindOneStub.resolves(true);
			statusPageFindStub.resolves([{}]);
			try {
				await createStatusPage({ url: "test" });
			} catch (error) {
				expect(error.status).to.equal(400);
				expect(error.message).to.equal(errorMessages.STATUS_PAGE_URL_NOT_UNIQUE);
			}
		});
		it("should return a status page if a unique url is provided", async () => {
			statusPageFindOneStub.resolves(null);
			statusPageFindStub.resolves([]);
			const mockStatusPage = { url: "test" };
			const statusPage = await createStatusPage(mockStatusPage);
			expect(statusPage).to.exist;
			expect(statusPage.url).to.equal(mockStatusPage.url);
		});
	});
	describe("getStatusPageByUrl", () => {
		it("should throw an error if a status page is not found", async () => {
			statusPageFindOneStub.resolves(null);
			try {
				await getStatusPageByUrl("test");
			} catch (error) {
				expect(error.status).to.equal(404);
				expect(error.message).to.equal(errorMessages.STATUS_PAGE_NOT_FOUND);
			}
		});

		it("should return a status page if a status page is found", async () => {
			const mockStatusPage = { url: "test" };
			statusPageFindOneStub.resolves(mockStatusPage);
			const statusPage = await getStatusPageByUrl(mockStatusPage.url);
			expect(statusPage).to.exist;
			expect(statusPage).to.deep.equal(mockStatusPage);
		});
	});
	describe("urlIsUnique", () => {
		it("should throw an error if an error occurs", async () => {
			const err = new Error("test");
			statusPageFindStub.rejects(err);
			try {
				await urlIsUnique("test");
			} catch (error) {
				expect(error).to.deep.equal(err);
			}
		});

		it("should return true if a url is unique", async () => {
			statusPageFindStub.resolves([]);
			const isUnique = await urlIsUnique("test");
			expect(isUnique).to.be.true;
		});

		it("should return false if a url is not unique", async () => {
			statusPageFindStub.resolves([{ url: "test" }]);
			const isUnique = await urlIsUnique("test");
			expect(isUnique).to.be.false;
		});
	});
});
