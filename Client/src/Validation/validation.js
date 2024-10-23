import joi from "joi";
import dayjs from "dayjs";

const nameSchema = joi
	.string()
	.max(50)
	.trim()
	.pattern(/^[A-Za-z]+$/)
	.messages({
		"string.empty": "Name is required",
		"string.max": "Name must be less than 50 characters long",
		"string.pattern.base": "Name must contain only letters",
	});

const passwordSchema = joi
	.string()
	.trim()
	.min(8)
	.messages({
		"string.empty": "empty",
		"string.min": "length",
	})
	.custom((value, helpers) => {
		if (!/[A-Z]/.test(value)) {
			return helpers.message("uppercase");
		}
		return value;
	})
	.custom((value, helpers) => {
		if (!/[a-z]/.test(value)) {
			return helpers.message("lowercase");
		}
		return value;
	})
	.custom((value, helpers) => {
		if (!/\d/.test(value)) {
			return helpers.message("number");
		}
		return value;
	})
	.custom((value, helpers) => {
		if (!/[!?@#$%^&*()\-_=+[\]{};:'",.<>~`|\\/]/.test(value)) {
			return helpers.message("special");
		}
		return value;
	});
const credentials = joi.object({
	firstName: nameSchema,
	lastName: nameSchema,
	email: joi
		.string()
		.trim()
		.email({ tlds: { allow: false } })
		.custom((value, helpers) => {
			const lowercasedValue = value.toLowerCase();
			if (value !== lowercasedValue) {
				return helpers.message("Email must be in lowercase");
			}
			return lowercasedValue;
		})
		.messages({
			"string.empty": "Email is required",
			"string.email": "Must be a valid email address",
		}),
	password: passwordSchema,
	newPassword: passwordSchema,
	confirm: joi
		.string()
		.trim()
		.messages({
			"string.empty": "empty",
		})
		.custom((value, helpers) => {
			const { password } = helpers.prefs.context;
			if (value !== password) {
				return helpers.message("different");
			}
			return value;
		}),
	role: joi.array(),
	teamId: joi.string().allow("").optional(),
	inviteToken: joi.string().allow(""),
});

const monitorValidation = joi.object({
	url: joi.string().uri({ allowRelative: true }).trim().messages({
		"string.empty": "This field is required.",
		"string.uri": "The URL you provided is not valid.",
	}),
	name: joi.string().trim().max(50).allow("").messages({
		"string.max": "This field should not exceed the 50 characters limit.",
	}),
	type: joi.string().trim().messages({ "string.empty": "This field is required." }),
	interval: joi.number().messages({
		"number.base": "Frequency must be a number.",
		"any.required": "Frequency is required.",
	}),
});

const imageValidation = joi.object({
	type: joi.string().valid("image/jpeg", "image/png").messages({
		"any.only": "Invalid file format.",
		"string.empty": "File type required.",
	}),
	size: joi
		.number()
		.max(3 * 1024 * 1024)
		.messages({
			"number.base": "File size must be a number.",
			"number.max": "File size must be less than 3 MB.",
			"number.empty": "File size required.",
		}),
});

const settingsValidation = joi.object({
	ttl: joi.number().required().messages({
		"string.empty": "TTL is required",
	}),
});

const dayjsValidator = (value, helpers) => {
	if (!dayjs(value).isValid()) {
		return helpers.error("any.invalid");
	}
	return value;
};

const maintenanceWindowValidation = joi.object({
	repeat: joi.string(),
	startDate: joi.custom(dayjsValidator, "Day.js date validation"),
	startTime: joi.custom(dayjsValidator, "Day.js date validation"),
	duration: joi.number().integer().min(0),
	durationUnit: joi.string(),
	name: joi.string(),
	monitors: joi.array().min(1),
});

export {
	credentials,
	imageValidation,
	monitorValidation,
	settingsValidation,
	maintenanceWindowValidation,
};
