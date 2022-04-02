import {ChangeEventHandler, FC, useEffect, useState} from "react";
import {TextField, InputAdornment} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {filterUsers} from "../store/slices/userSlice";

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState('')

    const handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        e.preventDefault()
        const {value} = e.target
        dispatch(filterUsers(value))
        setInput(value)
    }

    const label = input.length > 0 ? 'Search' : ''
    const mrgTop = input.length > 0 ? '0' : '16'
    const colorIcon = input.length > 0 ? 'primary' : 'action'

    return(
        <TextField
            type='search'
            label={label}
            placeholder='Search...'
            variant="standard"
            fullWidth
            autoFocus
            onChange={e => handleSearch(e)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color={colorIcon}/>
                    </InputAdornment>
                ),
            }}
            sx={{mt: `${mrgTop}px`}}
        />
    )
}

export default Search