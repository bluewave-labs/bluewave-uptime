import joi from "joi";

const registerValidation = joi.object({
  firstname: joi.string().required().messages({
    "string.empty": "First name is required",
  }),

  lastname: joi.string().required().messages({
    "string.empty": "Last name is required",
  }),

  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),

  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
});

const loginValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),

  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
});

const recoveryValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),
});

const newPasswordValidation = joi.object({
  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
  confirm: joi.string().valid(joi.ref("password")).min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
    "any.only": "Passwords do not match",
  }),
});

export {
  registerValidation,
  loginValidation,
  recoveryValidation,
  newPasswordValidation,
};
