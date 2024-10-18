const buildErrors = (prev, id, error) => {
	const updatedErrors = { ...prev };
	if (error) {
		updatedErrors[id] = error.details[0].message;
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
			newErrors[err.path[0]] = err.message;
		});
		setErrors(newErrors);
		return true;
	}
	return false;
};
export { buildErrors, hasValidationErrors };
