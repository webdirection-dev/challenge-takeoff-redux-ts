import {FC} from "react";
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@mui/material';
import {Menu} from '@mui/icons-material';

const Header: FC = () => {
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

                <Button
                    color="inherit"
                >login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header