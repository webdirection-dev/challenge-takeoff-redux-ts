import React, {FC, useEffect, useState} from "react";
import {changeUsers, toggleModalChangeUser} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

const ChangeUser: FC = () => {
    const dispatch = useAppDispatch()
    const {modalChangeUser, idForChangeUser} = useAppSelector(state => state.userReducer)
    const [editUser, setEditUser] = useState({
        id: idForChangeUser,
        name: '',
        email: '',
        website: '',
    })

    useEffect(() => {
        setEditUser({
            id: idForChangeUser,
            name: 'Some',
            email: 'Some',
            website: 'Some',
        })
    }, [idForChangeUser])

    return(
        <Dialog
            open={modalChangeUser}
            onClose={() => dispatch(toggleModalChangeUser())}
        >
            <DialogTitle>Edit User</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Here you can edit user data. Since this is not a commercial project, the entered data is not validated or verified.
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => dispatch(toggleModalChangeUser())}>Cancel</Button>

                <Button onClick={() => {
                    dispatch(changeUsers(editUser))
                    dispatch(toggleModalChangeUser())
                }}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangeUser