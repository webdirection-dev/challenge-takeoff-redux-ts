import TextField from '@mui/material/TextField';
import {FC} from "react";

const Search: FC = () => {
    return(
        <TextField
            type='search'
            label="Search"
            variant="standard"
            fullWidth
        />
    )
}

export default Search