import {useLocation, Navigate} from "react-router-dom"
import {useAuth} from '../hooks/use-auth'

interface IProps {
    children: JSX.Element,
}

const RequireAuth = ({children}: IProps) => {
    const {isAuth} = useAuth()
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return(
        children
    )
}

export default RequireAuth