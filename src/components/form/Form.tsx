import {FC, useState} from "react";

interface IProps {
    title: string,
    handleClick: (email: string, password: string) => void
}

const Form: FC<IProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div>
            <input
                type="email"
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={() => handleClick(email, password)}
            >{title}</button>
        </div>
    )
}

export default Form