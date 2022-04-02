import React, {FC, Dispatch, SetStateAction} from "react";
import {toggleModalChangeUser, setIdForChangeUser, removeUserFromTable} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {TableCell, TableRow, Box, IconButton} from "@mui/material";
import {DriveFileRenameOutline, DeleteOutline} from '@mui/icons-material';
import {styled} from "@mui/material/styles";
import {tableCellClasses} from "@mui/material/TableCell";

interface IProps {
    id: number | null,
    name: string,
    email: string,
    website: string,
    phone: string,
    setOpenAlert: Dispatch<SetStateAction<boolean>>
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#e3f2fd",
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const UserItem: FC<IProps> = ({id, name, email, website, phone, setOpenAlert}) => {
    const dispatch = useAppDispatch()
    const {input} = useAppSelector(state => state.userReducer)

    return(
        <StyledTableRow
            key={id}
            hover
        >
            <StyledTableCell component="th" scope="row">{id}</StyledTableCell>
            <StyledTableCell align="center">{markLetters(name, input)}</StyledTableCell>
            <StyledTableCell align="center">{markLetters(email, input)}</StyledTableCell>
            <StyledTableCell align="center">{markLetters(website, input)}</StyledTableCell>
            <StyledTableCell align="center">{markLetters(phone, input)}</StyledTableCell>
            <StyledTableCell align="center">
                <Box>
                    <IconButton
                        onClick={() => {
                            dispatch(toggleModalChangeUser())
                            dispatch(setIdForChangeUser(id))
                        }}
                        color="success"
                    >
                        <DriveFileRenameOutline />
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            dispatch(removeUserFromTable(id))
                            setOpenAlert(true)
                        }}
                        sx={{ml: '1rem'}}
                        color="error"
                    >
                        <DeleteOutline />
                    </IconButton>
                </Box>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default UserItem

//покрасить искомые символы в найденных словах
const markLetters = (str: string, input: string) => {
    const isIndexOf = str.toLowerCase().indexOf(input.toLowerCase())

    if (isIndexOf >= 0) {
        const start = str.slice(0, isIndexOf)
        const body = str.slice(isIndexOf, isIndexOf+input.length)
        const end = str.slice(isIndexOf+input.length)
        return(
            <>
                {start}
                <span className="variant__mark">
                        {body}
                    </span>
                {end}
            </>
        )
    } else return str
}