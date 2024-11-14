const buildErrors = (prev, id, error) => {
	const updatedErrors = { ...prev };
	if (error) {
		updatedErrors[id] = error.details[0].message ?? "Validation error";
	} else {
		delete updatedErrors[id];
	}
	return updatedErrors;
};

const hasValidationErrors = (form, validation, setErrors) => {
	const { error } = validation.validate(form, {
		abortEarly: false,
	});
	if (error) {
		const newErrors = {};
		error.details.forEach((err) => {
			if (
				![
					"clientHost",
					"refreshTokenSecret",
					"dbConnectionString",
					"refreshTokenTTL",
					"jwtTTL",
					"notify-email-list",
				].includes(err.path[0])
			) {
				newErrors[err.path[0]] = err.message ?? "Validation error";
			}
			// Handle conditionally usage number required cases
			if (!form.cpu || (form.cpu && form.usage_cpu)) {
				newErrors["usage_cpu"] = null;
			}
			if (!form.memory || (form.memory && form.usage_memory)) {
				newErrors["usage_memory"] = null;
			}
			if (!form.disk || (form.disk && form.usage_disk)) {
				newErrors["usage_disk"] = null;
			}
		});
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return true;
		} else {
			setErrors({});
			return false;
		}
	}
	return false;
};
export { buildErrors, hasValidationErrors };