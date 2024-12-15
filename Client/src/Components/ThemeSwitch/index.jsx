import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SunAndMoonIcon from "./SunAndMoonIcon";
import "./index.css";

const ThemeSwitch = () => {
	// TODO: change to use the MUI theme
	const [currentTheme, setCurrentTheme] = useState("light");
	const toggleTheme = () =>
		setCurrentTheme((prevState) => (prevState === "light" ? "dark" : "light"));

	useEffect(() => {
		document.body.setAttribute("data-theme", currentTheme);
	}, [currentTheme]);

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
