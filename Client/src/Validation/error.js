const buildErrors = (prev, id, error) => {
	const updatedErrors = { ...prev };
	if (error) {
		updatedErrors[id] = error.details[0].message?? "Validation error";
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
				].includes(err.path[0])
			) {
				newErrors[err.path[0]] = err.message ?? "Validation error";
			}
		});
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return true;
		} else return false;
	}
	return false;
};
export { buildErrors, hasValidationErrors };