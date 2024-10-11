import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
const Dialog = ({ arialabelledby, ariadescribedby,
    open, onClose, bdy1, yBtnLbl, yBtnOnClick, nBtnLbl, nBtnOnClick, theme, isLoading, bdy2 }) => {
    return <Modal
        aria-labelledby={arialabelledby}
        aria-describedby={ariadescribedby}
        open={open}
        onClose={onClose} >
        <Stack
            gap={theme.spacing(2)}
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: theme.palette.background.main,
                border: 1,
                borderColor: theme.palette.border.light,
                borderRadius: theme.shape.borderRadius,
                boxShadow: 24,
                p: theme.spacing(15),
                "&:focus": {
                    outline: "none",
                },
            }}
        >
            <Typography id={arialabelledby} component="h2"
                fontSize={16}
                color={theme.palette.text.primary}
                fontWeight={600}>
                {bdy1}
            </Typography>
            {bdy2 && <Typography id={ariadescribedby} color={theme.palette.text.tertiary}>
                {bdy2}
            </Typography>}
            <Stack
                direction="row"
                gap={theme.spacing(4)}
                mt={theme.spacing(12)}
                justifyContent="flex-end"
            >
                <Button
                    variant="text"
                    color="info"
                    onClick={nBtnOnClick}
                >
                    {nBtnLbl}
                </Button>
                <LoadingButton
                    variant="contained"
                    color="error"
                    loading= {isLoading}
                    onClick={yBtnOnClick}
                >
                    {yBtnLbl}
                </LoadingButton>
            </Stack>
        </Stack>
    </Modal>
}

Dialog.prototypes = {
    arialabelledby: PropTypes.string.isRequired,
    ariadescribedby: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bdy1: PropTypes.string.isRequired,
    nBtnLbl: PropTypes.string.isRequired,
    nBtnOnClick: PropTypes.func.isRequired,
    yBtnLbl: PropTypes.string.isRequired,
    yBtnOnClick: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    bdy2: PropTypes.string    
}

export default Dialog