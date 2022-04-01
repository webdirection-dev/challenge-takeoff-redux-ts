import React, {FC, ChangeEventHandler, useState} from "react";
import {toggleModalAddUser, addUsers} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import SuccessAlert from "./alerts/successAlert";

const NewUser: FC = () => {
    const dispatch = useAppDispatch()
    const {modalAddUser} = useAppSelector(state => state.userReducer)
    const [openAlert, setOpenAlert] = useState(false);
    const [newUser, setNewUser] = useState({
        name: 'empty',
        email: 'empty',
        website: 'empty',
        phone: 'empty'
    })

    const handleNewUser: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        e.preventDefault()
        const {id, value} = e.target
        setNewUser({
            ...newUser,
            [id]: value
        })
    }

    return(
        <>
            <Dialog open={modalAddUser}>
                <DialogTitle>Add New user</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Here you can add user data. Since this is not a commercial project, the entered data is not validated or verified.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="search"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="website"
                        label="Website"
                        type="search"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => dispatch(toggleModalAddUser())}>Cancel</Button>

                    <Button onClick={() => {
                        dispatch(addUsers(newUser))
                        dispatch(toggleModalAddUser())
                        setNewUser({
                            name: 'empty',
                            email: 'empty',
                            website: 'empty',
                            phone: 'empty'
                        })
                        setOpenAlert(true)
                    }}>Add</Button>
                </DialogActions>
            </Dialog>

            <SuccessAlert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                alertType='success'
                text='New user has been added!'
            />
        </>
    )
}

export default NewUser