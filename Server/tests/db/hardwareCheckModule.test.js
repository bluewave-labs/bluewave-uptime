import sinon from "sinon";
import HardwareCheck from "../../db/models/HardwareCheck.js";
import { createHardwareCheck } from "../../db/mongo/modules/hardwareCheckModule.js";

const mockHardwareCheck = {
	data: {
		cpu: {
			physical_core: 4,
			logical_core: 8,
			frequency: 4800,
			current_frequency: 1411,
			temperature: [45, 50, 46, 47, 45, 50, 46, 47],
			free_percent: 0.8552990910595134,
			usage_percent: 0.14470090894048657,
		},
		memory: {
			total_bytes: 16467628032,
			available_bytes: 7895044096,
			used_bytes: 6599561216,
			usage_percent: 0.4008,
		},
		disk: [
			{
				read_speed_bytes: null,
				write_speed_bytes: null,
				total_bytes: 931258499072,
				free_bytes: 737097256960,
				usage_percent: 0.1661,
			},
		],
		host: {
			os: "linux",
			platform: "ubuntu",
			kernel_version: "6.8.0-48-generic",
		},
	},
	errors: [
		{
			metric: ["cpu.temperature"],
			err: "unable to read CPU temperature",
		},
	],
};

describe("HardwareCheckModule", () => {
	let hardwareCheckSaveStub;
	beforeEach(() => {
		hardwareCheckSaveStub = sinon.stub(HardwareCheck.prototype, "save");
	});

	afterEach(() => {
		sinon.restore();
	});

	describe("createHardwareCheck", () => {
		it("should return a hardware check", async () => {
			hardwareCheckSaveStub.resolves(mockHardwareCheck);
			const hardwareCheck = await createHardwareCheck({});
			expect(hardwareCheck).to.exist;
			expect(hardwareCheck).to.deep.equal(mockHardwareCheck);
		});
		it("should handle an error", async () => {
			const err = new Error("test error");
			hardwareCheckSaveStub.rejects(err);
			try {
				await createHardwareCheck({});
			} catch (error) {
				expect(error).to.exist;
				expect(error).to.deep.equal(err);
			}
		});
	});
});
