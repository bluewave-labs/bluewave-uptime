import React, { useEffect, useState } from "react";
import "./index.css";
import { IconButton } from "@mui/material";
import SunAndMoonIcon from "./SunAndMoonIcon";

const ThemeSwitch = () => {
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
