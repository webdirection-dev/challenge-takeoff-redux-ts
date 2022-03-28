import {Link} from "react-router-dom";
import {FC} from "react";

const NotFound: FC = () => {
    return(
        <div>
            <h1>NotFound</h1>
            <Link to='/'>Co to Home Page</Link>
        </div>
    )
}

export default NotFound