import {Link} from "react-router-dom";
import SignUp from "../components/signUp/SignUp";
import {FC} from "react";

const RegisterPage: FC = () => {
    return(
        <div>
            <h1>Register</h1>

            <SignUp />

            <p>Already have an account? <Link to='/login'>Sing in</Link></p>
        </div>
    )
}

export default RegisterPage