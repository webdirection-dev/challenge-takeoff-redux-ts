import {Link, useLocation} from "react-router-dom";
import Login from "../components/login/Login";

type LocationState = {
    from: {
        pathname: string;
    }
}

const LoginPage = () => {
    const location = useLocation()

    const { from } = location?.state as LocationState || '/';
    const path = from?.pathname || '/'

    return(
        <div>
            <h1>Login</h1>
            {path}

            <Login />

            <p>Or <Link to='/register'>register</Link></p>
        </div>
    )
}

export default LoginPage