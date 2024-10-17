import { errorMessages, successMessages } from "../../utils/messages.js";
describe("Messages", () => {
	describe("messages - errorMessages", () => {
		it("should have a DB_FIND_MONITOR_BY_ID function", () => {
			const monitorId = "12345";
			expect(errorMessages.DB_FIND_MONITOR_BY_ID(monitorId)).to.equal(
				`Monitor with id ${monitorId} not found`
			);
		});

		it("should have a DB_DELETE_CHECKS function", () => {
			const monitorId = "12345";
			expect(errorMessages.DB_DELETE_CHECKS(monitorId)).to.equal(
				`No checks found for monitor with id ${monitorId}`
			);
		});
	});

	describe("messages - successMessages", () => {
		it("should have a MONITOR_GET_BY_USER_ID function", () => {
			const userId = "12345";
			expect(successMessages.MONITOR_GET_BY_USER_ID(userId)).to.equal(
				`Got monitor for ${userId} successfully"`
			);
		});

		// Add more tests for other success messages as needed
	});
});
