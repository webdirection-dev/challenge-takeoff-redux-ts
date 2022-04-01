import React, {FC} from "react";
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {removeUser} from "../../store/slices/userSlice";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch} from "../../hooks/redux-hooks";

const Header: FC = () => {
    const {email} = useAuth()
    const dispatch = useAppDispatch()

    const Btn = () => {
        // if (!!email) {
        if (true) {
            return (
                <Button
                    color="inherit"
                    onClick={() => dispatch(removeUser())}
                >Log out from {email}</Button>
            )
        }

        return (
            <Button
                color="inherit"
            >login</Button>
        )
    }

    return(
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1
                }}>
                    <IconButton
                        color="inherit"
                        sx={{mr: 2}}
                    >
                        <Menu />
                    </IconButton>

                    <Link to='/'
                          className='header__title'
                    >
                        <Typography
                            variant='h6'
                            component='span'
                        >Takeoff Staff</Typography>
                    </Link>
                </Box>

                <Btn />
            </Toolbar>
        </AppBar>
    )
}

export default Header