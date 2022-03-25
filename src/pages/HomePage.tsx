import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";

import {removeUser, getUsers, deleteUsers, changeUsers, addNewUsers} from "../store/slices/userSlice";
import {useAuth} from "../hooks/use-auth";

const HomePage = () => {
    const {email} = useAuth()
    const dispatch = useAppDispatch()
    const {users, status, error} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return(
        <div>
            <h1>Welcome {email}!</h1>

            <button
                onClick={() => dispatch(removeUser())}
            >Log out from {email}</button>

            {
                status === 'loading' && <h2>Loading...</h2>
            }

            {
                status === 'error' && <h2>An error occurred: {error}</h2>
            }

            <ul>
                {
                    users.map(i => {
                        return (
                            <li key={`${i.id}${i.email}`}>
                                {i.name}

                                <button
                                    onClick={() => dispatch(changeUsers(i.id))}
                                >Change</button>

                                <button
                                    onClick={() => dispatch(deleteUsers(i.id))}
                                >Delete</button>
                            </li>
                        )
                    })
                }
            </ul>

            <button
                onClick={() => dispatch(addNewUsers('New User'))}
            >Add User</button>
        </div>
    )
}

export default HomePage