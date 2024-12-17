/**
 * ThemeSwitch Component
 * Dark and Light Theme Switch
 * Original Code: https://web.dev/patterns/theming/theme-switch
 * License: Apache License 2.0
 * Copyright © Google LLC
 *
 * This code has been adapted for use in this project.
 * Apache License: https://www.apache.org/licenses/LICENSE-2.0
 */

import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import SunAndMoonIcon from "./SunAndMoonIcon";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../Features/UI/uiSlice";

const ThemeSwitch = () => {
	const mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();

	const toggleTheme = () => {
		dispatch(setMode(mode === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		document.body.setAttribute("data-theme", mode);
	}, [mode]);

	return (
		<IconButton
			id="theme-toggle"
			title="Toggles light & dark"
			aria-label="auto"
			aria-live="polite"
			onClick={toggleTheme}
			sx={{
				width: 48,
				height: 48,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<SunAndMoonIcon />
		</IconButton>
	);
};

export default ThemeSwitch;
