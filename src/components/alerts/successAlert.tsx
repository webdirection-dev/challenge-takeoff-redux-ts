import React, {FC, Dispatch, SetStateAction} from "react";
import {Snackbar} from "@mui/material";
import Alert, {AlertColor} from "@mui/material/Alert";

interface IProps {
    openAlert: boolean;
    setOpenAlert: Dispatch<SetStateAction<boolean>>;
    text: string;
    alertType: AlertColor | undefined;
}

const SuccessAlert: FC<IProps> = ({openAlert, setOpenAlert, alertType, text}) => {
    return(
        <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={() => setOpenAlert(false)}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={() => setOpenAlert(false)}
                severity={alertType}
                sx={{ width: '100%' }}
            > {text}
            </Alert>
        </Snackbar>
    )
}

export default SuccessAlert