import { Stack, Typography } from "@mui/material";
import Field from "../Components/Inputs/Field";
import TextInput from "../Components/Inputs/TextInput";
import { useState, useEffect, useRef } from "react";
import { HttpAdornment } from "../Components/Inputs/TextInput/Adornments";
import { PasswordEndAdornment } from "../Components/Inputs/TextInput/Adornments";
const Test = () => {
	const [originalValue, setOriginalValue] = useState("");
	const [originalError, setOriginalError] = useState("");

	const [newValue, setNewValue] = useState("");
	const [newError, setNewError] = useState("");

	const [thresholdValue, setThresholdValue] = useState(20);
	const [thresholdError, setThresholdError] = useState("");

	const [thresholdValue2, setThresholdValue2] = useState(20);
	const [thresholdError2, setThresholdError2] = useState("");

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const checkError = (value) => {
		if (value !== "clear") {
			return "This is an error";
		}
		return "";
	};

	const checkThresholdError = (value) => {
		if (value !== 99) {
			return "This is a threshold error";
		}
		return "";
	};
	const checkThresholdError2 = (value) => {
		if (value !== 99) {
			return "This is a threshold error 2";
		}
		return "";
	};

	const handleOriginalValue = (e) => {
		setOriginalError(checkError(e.target.value));
		setOriginalValue(e.target.value);
	};

	const handleNewValue = (e) => {
		setNewError(checkError(e.target.value));
		setNewValue(e.target.value);
	};

	const handleThresholdValue = (e) => {
		const parsedVal = parseInt(e.target.value);
		setThresholdError(checkThresholdError(parsedVal));
		setThresholdValue(parsedVal);
	};

	const handleThresholdValue2 = (e) => {
		const parsedVal = parseInt(e.target.value);
		setThresholdError2(checkThresholdError2(parsedVal));
		setThresholdValue2(parsedVal);
	};

	return (
		<Stack
			gap={8}
			direction="column"
			border="1px dashed blue"
			padding="1rem"
		>
			<Typography>
				This is a test page for the TextInput component. It is a rationalized Input
				component.
			</Typography>
			<Typography>Type anything for an error.</Typography>
			<Typography>Typing "clear" will clear the error for text based input</Typography>
			<Typography>Typing "99" will clear the error for threshold based input</Typography>
			<Field
				id="original-field"
				onChange={handleOriginalValue}
				type="text"
				value={originalValue}
				error={originalError}
			/>
			<TextInput
				value={newValue}
				onChange={handleNewValue}
				error={newError !== ""}
				helperText={newError}
			/>

			<Field
				type={"url"}
				id="monitor-url"
				label={"URL to monitor"}
				https={true}
				placeholder={""}
				value={originalValue}
				onChange={handleOriginalValue}
				error={originalError}
			/>
			<TextInput
				type={"url"}
				id="monitor-url"
				label={"URL to monitor"}
				placeholder={""}
				value={newValue}
				startAdornment={<HttpAdornment https={true} />}
				onChange={handleNewValue}
				error={newError !== ""}
				helperText={newError}
			/>

			<Field
				type="password"
				id="login-password-input"
				label="Password"
				isRequired={true}
				placeholder="••••••••••"
				autoComplete="current-password"
				value={originalValue}
				onChange={handleOriginalValue}
				error={originalError}
				ref={inputRef}
			/>
			<TextInput
				type="password"
				id="login-password-input"
				label="Password"
				isRequired={true}
				placeholder="••••••••••"
				autoComplete="current-password"
				value={newValue}
				endAdornment={<PasswordEndAdornment />}
				onChange={handleNewValue}
				error={newError !== ""}
				helperText={newError}
				ref={inputRef}
			/>

			<Field
				id="ttl"
				label="The days you want to keep monitoring history."
				isOptional={true}
				optionalLabel="0 for infinite"
				value={originalValue}
				onChange={handleOriginalValue}
				error={originalError}
			/>

			<TextInput
				id="ttl"
				label="The days you want to keep monitoring history."
				isOptional={true}
				optionalLabel="0 for infinite"
				value={newValue}
				onChange={handleNewValue}
				error={newError !== ""}
				helperText={newError}
			/>

			<Typography>Short field for threshold. Easily show/hide error text</Typography>
			<TextInput
				maxWidth="var(--env-var-width-4)"
				id="threshold"
				type="number"
				value={thresholdValue.toString()}
				onChange={handleThresholdValue}
				error={thresholdError !== ""}
			/>
			<TextInput
				maxWidth="var(--env-var-width-4)"
				id="threshold"
				type="number"
				value={thresholdValue2.toString()}
				onChange={handleThresholdValue2}
				error={thresholdError2 !== ""}
			/>
			<Typography sx={{ color: "red" }}>
				{thresholdError} {thresholdError2}
			</Typography>
		</Stack>
	);
};

export default Test;
