import { Box, Stack, Typography } from "@mui/material";
import Field from "../Inputs/Field";
import Checkbox from "../Inputs/Checkbox";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

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