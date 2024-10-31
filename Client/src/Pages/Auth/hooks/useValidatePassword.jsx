import { useState } from "react";
import { credentials } from "../../../Validation/validation";

function useValidatePassword() {
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		password: "",
		confirm: "",
	});

	const handleChange = (event) => {
		const { value, name } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		const validateValue = { [name]: value };
		const validateOptions = { abortEarly: false, context: { password: form.password } };
		if (name === "password" && form.confirm.length > 0) {
			validateValue.confirm = form.confirm;
			validateOptions.context = { password: value };
		} else if (name === "confirm") {
			validateValue.password = form.password;
		}

		const { error } = credentials.validate(validateValue, validateOptions);
		const errors = error?.details.map((error) => ({
			path: error.path[0],
			message: error.message,
		}));
		const errorsByPath =
			errors &&
			errors.reduce((acc, { path, message }) => {
				if (!acc[path]) {
					acc[path] = [];
				}
				acc[path].push(message);
				return acc;
			}, {});
		setErrors(() => (errorsByPath ? { ...errorsByPath } : {}));
	};

	const getFeedbackStatus = (field, criteria) => {
		const fieldErrors = errors[field];
		const isFieldEmpty = form[field].length === 0;
		const hasError = fieldErrors?.includes(criteria) || fieldErrors?.includes("empty");
		const isCorrect = !isFieldEmpty && !hasError;

		if (isCorrect) {
			return "success";
		} else if (hasError) {
			return "error";
		} else {
			return "info";
		}
	};

	const feedbacks = {
		length: getFeedbackStatus("password", "length"),
		special: getFeedbackStatus("password", "special"),
		number: getFeedbackStatus("password", "number"),
		uppercase: getFeedbackStatus("password", "uppercase"),
		lowercase: getFeedbackStatus("password", "lowercase"),
		confirm: getFeedbackStatus("confirm", "different"),
	};

	return { handleChange, feedbacks, form, errors };
}
export { useValidatePassword };
