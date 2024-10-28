import sinon from "sinon";
import NotificationService from "../../service/notificationService.js";
import { expect } from "chai";

describe("NotificationService", () => {
	let emailService, db, logger, notificationService;
	beforeEach(() => {
		db = {
			getNotificationsByMonitorId: sinon.stub(),
		};
		emailService = {
			buildAndSendEmail: sinon.stub(),
		};
		logger = {
			warn: sinon.stub(),
		};

		notificationService = new NotificationService(emailService, db, logger);
	});
	afterEach(() => {
		sinon.restore();
	});

	describe("constructor", () => {
		it("should create a new instance of NotificationService", () => {
			expect(notificationService).to.be.an.instanceOf(NotificationService);
		});
	});

	describe("sendEmail", async () => {
		it("should send an email notification with Up Template", async () => {
			const networkResponse = {
				monitor: {
					name: "Test Monitor",
					url: "http://test.com",
				},
				status: true,
				prevStatus: false,
			};
			const address = "test@test.com";
			await notificationService.sendEmail(networkResponse, address);
			expect(notificationService.emailService.buildAndSendEmail.calledOnce).to.be.true;
			expect(
				notificationService.emailService.buildAndSendEmail.calledWith(
					"serverIsUpTemplate",
					{ monitor: "Test Monitor", url: "http://test.com" }
				)
			);
		});
		it("should send an email notification with Down Template", async () => {
			const networkResponse = {
				monitor: {
					name: "Test Monitor",
					url: "http://test.com",
				},
				status: false,
				prevStatus: true,
			};
			const address = "test@test.com";
			await notificationService.sendEmail(networkResponse, address);
			expect(notificationService.emailService.buildAndSendEmail.calledOnce).to.be.true;
		});
		it("should send an email notification with Up Template", async () => {
			const networkResponse = {
				monitor: {
					name: "Test Monitor",
					url: "http://test.com",
				},
				status: true,
				prevStatus: false,
			};
			const address = "test@test.com";
			await notificationService.sendEmail(networkResponse, address);
			expect(notificationService.emailService.buildAndSendEmail.calledOnce).to.be.true;
		});
	});

	describe("handleNotifications", async () => {
		it("should handle notifications based on the network response", async () => {
			notificationService.sendEmail = sinon.stub();
			notificationService.db.getNotificationsByMonitorId.resolves([
				{ type: "email", address: "www.google.com" },
			]);
			await notificationService.handleNotifications({ monitorId: "123" });
			expect(notificationService.sendEmail.calledOnce).to.be.true;
		});

		it("should handle an error when getting notifications", async () => {
			const testError = new Error("Test Error");
			notificationService.db.getNotificationsByMonitorId.rejects(testError);
			await notificationService.handleNotifications({ monitorId: "123" });
			expect(notificationService.logger.warn.calledOnce).to.be.true;
		});
	});
});
