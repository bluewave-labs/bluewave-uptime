import joi from "joi";

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
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  })
  .custom((value, helpers) => {
    if (!/[A-Z]/.test(value)) {
      return helpers.message(
        "Password must contain at least one uppercase letter"
      );
    }
    if (!/[a-z]/.test(value)) {
      return helpers.message(
        "Password must contain at least one lowercase letter"
      );
    }
    if (!/\d/.test(value)) {
      return helpers.message("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return helpers.message(
        "Password must contain at least one special character"
      );
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
      "string.empty": "Password confirmation is required",
    })
    .custom((value, helpers) => {
      const { password } = helpers.prefs.context;
      if (value !== password) {
        return helpers.message("Passwords do not match");
      }
      return value;
    }),
  role: joi.array(),
});

const monitorValidation = joi.object({
  url: joi.string().uri({ allowRelative: true }).trim().messages({
    "string.empty": "This field is required.",
    "string.uri": "The URL you provided is not valid.",
  }),
  name: joi.string().trim().max(50).allow("").messages({
    "string.max": "This field should not exceed the 50 characters limit.",
  }),
  type: joi
    .string()
    .trim()
    .messages({ "string.empty": "This field is required." }),
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

const maintenanceWindowValidation = joi.object({
  repeat: joi.number().valid(1, 2, 3).required().messages({
    "number.base": "Repeat must be a number.",
    "any.only": "Repeat must be one of [1, 2, 3].",
    "any.required": "Repeat is required.",
  }),
  date: joi.date().required().messages({
    "date.base": "Date must be a valid date.",
    "any.required": "Date is required.",
  }),
  startTime: joi.string().required().messages({
    "string.base": "Start time must be a valid time.",
    "any.required": "Start time is required.",
  }),
  duration: joi.number().required().messages({
    "number.empty": "duration is required.",
    "number.base": "Duration must be a number.",
    "any.required": "Duration is required.",
  }),
  unit: joi.string().valid("minutes", "hours", "days").required().messages({
    "string.base": "Unit must be a string.",
    "any.only": "Unit must be one of ['minutes', 'hours', 'days'].",
    "any.required": "Unit is required.",
  }),
  friendlyName: joi.string().max(50).required().messages({
    "string.empty": "Friendly name is required.",
    "string.max": "Friendly name must be less than 50 characters long",
  }),
  addMonitors: joi.string().max(50).required().messages({
    "string.empty": "Add monitors is required.",
    "string.max": "Add monitors must be less than 50 characters long",
  }),
});

export {
  credentials,
  imageValidation,
  monitorValidation,
  maintenanceWindowValidation,
};
