import {Link, useLocation} from "react-router-dom";
import Login from "../components/login/Login";
import {FC} from "react";

import {Container} from '@mui/material';

type LocationState = {
    from: {
        pathname: string;
    }
}

const LoginPage: FC = () => {
    const location = useLocation()

    const { from } = location?.state as LocationState || '/';
    const path = from?.pathname || '/'

    return(
        <Container>
            <h1>Login</h1>
            {/*{path}*/}
            <p>Or <Link to='/register'>register</Link></p>

            <Login />
        </Container>
    )
}

export default LoginPage