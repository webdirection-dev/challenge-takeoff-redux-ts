import {removeUser} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";
import {useAppDispatch} from "../hooks/redux-hooks";

const HomePage = () => {
    const {email} = useAuth()
    const dispatch = useAppDispatch()

    return(
        <div>
            <h1>Welcome {email}!</h1>

            <button
                onClick={() => dispatch(removeUser())}
            >Log out from {email}</button>
        </div>
    )
}

export default HomePage