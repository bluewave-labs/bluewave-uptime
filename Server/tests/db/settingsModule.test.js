import sinon from "sinon";
import {
	getAppSettings,
	updateAppSettings,
} from "../../db/mongo/modules/settingsModule.js";
import AppSettings from "../../db/models/AppSettings.js";

const mockAppSettings = {
	appName: "Test App",
};

describe("SettingsModule", () => {
	let appSettingsFindOneStub, appSettingsFindOneAndUpdateStub;
	beforeEach(() => {
		appSettingsFindOneStub = sinon.stub(AppSettings, "findOne");
		appSettingsFindOneAndUpdateStub = sinon.stub(AppSettings, "findOneAndUpdate");
	});
	afterEach(() => {
		sinon.restore();
	});

	describe("getAppSettings", () => {
		it("should return app settings", async () => {
			appSettingsFindOneStub.resolves(mockAppSettings);
			const result = await getAppSettings();
			expect(result).to.deep.equal(mockAppSettings);
		});
		it("should handle an error", async () => {
			const err = new Error("Test error");
			appSettingsFindOneStub.throws(err);
			try {
				await getAppSettings();
			} catch (error) {
				expect(error).to.deep.equal(err);
			}
		});
	});
	describe("updateAppSettings", () => {
		it("should update app settings", async () => {
			appSettingsFindOneAndUpdateStub.resolves(mockAppSettings);
			const result = await updateAppSettings(mockAppSettings);
			expect(result).to.deep.equal(mockAppSettings);
		});
		it("should handle an error", async () => {
			const err = new Error("Test error");
			appSettingsFindOneAndUpdateStub.throws(err);
			try {
				await updateAppSettings(mockAppSettings);
			} catch (error) {
				expect(error).to.deep.equal(err);
			}
		});
	});
});
