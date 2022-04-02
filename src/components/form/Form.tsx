import React, {FC, useState} from "react";
import {TextField, Box, Button} from "@mui/material";

interface IProps {
    title: string,
    handleClick: (email: string, password: string) => void
}

const Form: FC<IProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <Box
            sx={{
                margin: '0 auto',
                width: '50%',
            }}
        >
            <TextField
                // autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={e => setEmail(e.target.value)}
            />

            <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={e => setPassword(e.target.value)}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 3,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => handleClick(email, password)}
                >{title}</Button>
            </Box>
        </Box>
    )
}

export default Form