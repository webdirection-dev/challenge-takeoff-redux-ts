import React, {FC} from "react";
import {useAppDispatch} from "../hooks/redux-hooks";

import {toggleModalAddUser} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";

import {Container, Fab} from '@mui/material';
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

            <UsersList />

            <NewUser />
            <ChangeUser />

            <Fab
                color="primary"
                aria-label="add"
                className='btn__add'
                onClick={() => dispatch(toggleModalAddUser())}
            >
                <Add />
            </Fab>
        </Container>
    )
}

export default HomePage