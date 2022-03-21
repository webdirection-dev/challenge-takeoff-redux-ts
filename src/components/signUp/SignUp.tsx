import {useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setUser} from "../../store/slices/userSlice";
import Form from "../form/Form";
import {useAppDispatch} from "../../hooks/redux-hooks";

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }))

                navigate(`/`, {state: ''})
            })
            .catch(console.error)
    }

    return(
        <Form
            title='Sign Up'
            handleClick={handleRegister}
        />
    )
}

export default SignUp