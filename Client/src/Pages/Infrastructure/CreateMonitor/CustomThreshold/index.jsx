import { Box, Stack, Typography } from "@mui/material";
import Field from "../../../../Components/Inputs/Field";
import Checkbox from "../../../../Components/Inputs/Checkbox";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";


/**
 * `CustomThreshold` is a functional React component that displays a 
 * group of CheckBox with a label and its correspondant threshold input field.
 *
 * @param {{ checkboxId: any; checkboxLabel: any; onCheckboxChange: any; fieldId: any; onFieldChange: any; onFieldBlur: any; alertUnit: any; infrastructureMonitor: any; errors: any; }} param0
 * @param {string} param0.checkboxId  - The text is the id of the checkbox.
 * @param {string} param0.checkboxLabel - The text to be displayed as the label next to the check icon.
 * @param {func} param0.onCheckboxChange - The function to invoke when checkbox is checked or unchecked.
 * @param {string} param0.fieldId - The text is the id of the input field.
 * @param {func} param0.onFieldChange - The function to invoke when input field is changed.
 * @param {func} param0.onFieldBlur - The function to invoke when input field is losing focus.
 * @param {string} param0.alertUnit the threshold unit such as usage percentage '%' etc
 * @param {object} param0.infrastructureMonitor the form object of the create infrastrcuture monitor page
 * @param {object} param0.errors the object that holds all the errors of the form page
 * @returns A compound React component that renders the custom threshold alert section
 * 
 */

export const CustomThreshold = ({
    checkboxId,
    checkboxLabel,
    onCheckboxChange,
    fieldId,		
    onFieldChange,
    onFieldBlur,
    alertUnit,
    infrastructureMonitor,
    errors
}) => 
    {
        const theme  = useTheme();
        return (
    <Stack
        direction={"row"}
        sx={{
            width: "50%",
            justifyContent: "space-between",
            flexWrap: "wrap"         
        }}
    >
        <Box>
            <Checkbox
                id={checkboxId}
                label={checkboxLabel}
                isChecked={infrastructureMonitor[checkboxId]}
                onChange={onCheckboxChange}
            />
        </Box>
        <Stack
            direction={"row"}
            sx={{
                justifyContent: "flex-end",
            }}
        >
            <Field
                type="number"
                className="field-infrastructure-alert"
                id={fieldId}
                value={infrastructureMonitor[fieldId]}
                onBlur={onFieldBlur}
                onChange={onFieldChange}
                error={errors[fieldId]}
                disabled={!infrastructureMonitor[checkboxId]}
            ></Field>
            <Typography
                component="p"
                m={theme.spacing(3)}
            >
                {alertUnit}
            </Typography>
        </Stack>
    </Stack>
)}

CustomThreshold.propTypes = {
	checkboxId: PropTypes.string.isRequired,
	checkboxLabel: PropTypes.string.isRequired,
	onCheckboxChange: PropTypes.func.isRequired,
	fieldId: PropTypes.string.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	onFieldBlur: PropTypes.func.isRequired,
	alertUnit: PropTypes.string.isRequired,
	infrastructureMonitor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};