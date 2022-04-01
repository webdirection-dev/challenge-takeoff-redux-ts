import React, {FC} from "react";
import {useAppDispatch} from "../hooks/redux-hooks";

import {removeUser, toggleModalAddUser} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";

import {Container, Button, Fab} from '@mui/material';
import {Add} from '@mui/icons-material';

import Search from "../components/Search";
import UsersList from "../components/usersList";
import NewUser from "../components/newUser";
import ChangeUser from "../components/changeUser";

const HomePage: FC = () => {
    const {email} = useAuth()
    const dispatch = useAppDispatch()

    return(
        <Container
            sx={{
                position: 'relative',
                mt: '1rem',
            }}
        >
            <Search />

            <h1>Welcome {email}!</h1>

            <Button
                variant="outlined"
                onClick={() => dispatch(removeUser())}
            >Log out from {email}</Button>

            <UsersList />

            <NewUser />
            <ChangeUser />

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => dispatch(toggleModalAddUser())}
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '50px',
                }}
            >
                <Add />
            </Fab>
        </Container>
    )
}

export default HomePage