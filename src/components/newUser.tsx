import React, {FC} from "react";
import {addNewUsers, toggleModalAddUser} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {Modal} from "@mui/material";

const NewUser: FC = () => {
    const dispatch = useAppDispatch()
    const {modalAddUser} = useAppSelector(state => state.userReducer)

    return(
        <Modal
            open={modalAddUser}
            onClose={() => dispatch(toggleModalAddUser())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={() => dispatch(addNewUsers('New User'))}
        >
            <h1>test</h1>
        </Modal>
    )
}

export default NewUser