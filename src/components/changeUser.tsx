import React, {ChangeEventHandler, FC, useEffect, useState} from "react";
import {changeUserFromTable, toggleModalChangeUser} from "../store/slices/userSlice";
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
import SuccessAlert from "./alerts/successAlert";

const ChangeUser: FC = () => {
    const dispatch = useAppDispatch()
    const {modalChangeUser, idForChangeUser, users} = useAppSelector(state => state.userReducer)
    const [openAlert, setOpenAlert] = useState(false);
    const [name, setName] = useState('')
    const [editUser, setEditUser] = useState({
        id: 0,
        name: '',
        email: '',
        website: '',
        phone: ''
    })

    useEffect(() => {
        const user = users.filter(i => i.id === idForChangeUser)
        if (user.length > 0) setName(user[0].name)
    }, [idForChangeUser, users])

    const handleNewUser: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setEditUser({
            ...editUser,
            id: idForChangeUser,
            [name]: value,
        })
    }

    const checkChange = () => {
        for (let objKey in editUser) {
            let key = objKey as keyof typeof editUser
            if (key !== 'id' && editUser[key] !== '') {
                setOpenAlert(true)
                editUser[key] = ''
            }
        }
    }

    return(
        <>
            <Dialog
                open={modalChangeUser}
                onClose={() => dispatch(toggleModalChangeUser())}
            >
                <DialogTitle>Edit {name}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Here you can edit user data. Since this is not a commercial project, the entered data is not validated or verified.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="search"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="website"
                        name="website"
                        label="Website"
                        type="search"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />

                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={e => handleNewUser(e)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => dispatch(toggleModalChangeUser())}>Cancel</Button>

                    <Button onClick={() => {
                        dispatch(changeUserFromTable(editUser))
                        dispatch(toggleModalChangeUser())
                        checkChange()
                    }}>Edit</Button>
                </DialogActions>
            </Dialog>

            <SuccessAlert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                alertType='success'
                text='User data has been changed'
            />
        </>
    )
}

export default ChangeUser