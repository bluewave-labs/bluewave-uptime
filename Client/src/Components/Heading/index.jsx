import { Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A heading component that renders text with a specific heading level.
 *
 * @param {Object} props - The properties passed to the Heading component.
 * @param {('h1'|'h2'|'h3')} props.component - The heading level for the component.
 * @param {string} props.children - The content to display inside the heading.
 * @returns {JSX.Element} The Typography component with specified heading properties.
 */

function Heading({ component, children }) {
	return (
		<Typography
			component={component}
			variant="h2"
			fontWeight={600}
		>
			{children}
		</Typography>
	);
}

Heading.propTypes = {
	component: PropTypes.oneOf(["h1", "h2", "h3"]).isRequired,
	children: PropTypes.string.isRequired,
};
export { Heading };
