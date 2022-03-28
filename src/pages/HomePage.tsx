import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";

import {removeUser, getUsers, toggleModalAddUser} from "../store/slices/userSlice";
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
    const {status, error} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

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

            {
                status === 'loading' && <h2>Loading...</h2>
            }

            {
                status === 'error' && <h2>An error occurred: {error}</h2>
            }

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