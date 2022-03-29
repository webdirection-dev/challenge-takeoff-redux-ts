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
    TextField
} from "@mui/material";

const NewUser: FC = () => {
    const dispatch = useAppDispatch()
    const {modalAddUser} = useAppSelector(state => state.userReducer)
    const [newUser, setNewUser] = useState({
        name: 'empty',
        email: 'empty',
        website: 'empty',
        phone: 'empty'
    })

    const handelNewUser: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        e.preventDefault()
        const {id, value} = e.target
        setNewUser({
            ...newUser,
            [id]: value
        })
    }

    return(
        <Dialog open={modalAddUser}>
            <DialogTitle>Add User</DialogTitle>

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
                    onChange={e => handelNewUser(e)}
                />

                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={e => handelNewUser(e)}
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
                }}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewUser


// import React, {FC} from "react";
// import {toggleModalAddUser} from "../store/slices/userSlice";
// // import {addNewUsers, toggleModalAddUser} from "../store/slices/userSlice";
// import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
// import {Modal} from "@mui/material";
//
// const NewUser: FC = () => {
//     const dispatch = useAppDispatch()
//     const {modalAddUser} = useAppSelector(state => state.userReducer)
//
//     return(
//         <Modal
//             open={modalAddUser}
//             onClose={() => dispatch(toggleModalAddUser())}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//             // onClick={() => dispatch(addNewUsers('New User'))}
//         >
//             <h1>test</h1>
//         </Modal>
//     )
// }
//
// export default NewUser