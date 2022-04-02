import React, {FC} from "react";
import {Link, useLocation} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {removeUser} from "../../store/slices/userSlice";
import {useAuth} from "../../hooks/use-auth";
import {useAppDispatch} from "../../hooks/redux-hooks";

const Header: FC = () => {
    const {email} = useAuth()
    const dispatch = useAppDispatch()
    const location = useLocation()

    const isUser = !!email

    const Btn = () => {
        if (isUser) {
            return (
                <Button
                    color="inherit"
                    onClick={() => dispatch(removeUser())}
                >Log out from</Button>
            )
        }

        if (!isUser) {
            if (location.pathname === '/register') {
                return (
                    <Link
                        className='header__link'
                        to='/login'
                    >login</Link>
                )
            }

            if (location.pathname === '/login') {
                return (
                    <Link
                        to='/register'
                        className='header__link'
                    >Sing up</Link>
                )
            }
        }

        return null
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