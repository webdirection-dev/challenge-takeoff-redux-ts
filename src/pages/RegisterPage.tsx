import {Link} from "react-router-dom";
import SignUp from "../components/signUp/SignUp";
import {FC} from "react";

import {Container} from '@mui/material';

const RegisterPage: FC = () => {
    return(
        <Container>
            <h1>Register</h1>
            <p>Already have an account? <Link to='/login'>Sing in</Link></p>

            <SignUp />
        </Container>
    )
}

export default RegisterPage