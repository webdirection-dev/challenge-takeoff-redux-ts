import React, {FC} from "react";
import {toggleModalChangeUser, deleteUsers, setIdForChangeUser} from "../store/slices/userSlice";
import {useAppDispatch} from "../hooks/redux-hooks";
import {TableCell, TableRow, Box, IconButton} from "@mui/material";
import {DriveFileRenameOutline, DeleteOutline} from '@mui/icons-material';
import {styled} from "@mui/material/styles";
import {tableCellClasses} from "@mui/material/TableCell";

interface IProps {
    id: number | null,
    name: string,
    email: string,
    website: string,
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

const UserItem: FC<IProps> = ({id, name, email, website}) => {
    const dispatch = useAppDispatch()

    return(
        <StyledTableRow
            key={`${id}${email}`}
            hover
            sx={{cursor: 'pointer'}}
        >
            <StyledTableCell component="th" scope="row">{id}</StyledTableCell>
            <StyledTableCell align="center">{name}</StyledTableCell>
            <StyledTableCell align="center">{email}</StyledTableCell>
            <StyledTableCell align="center">{website}</StyledTableCell>
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
                        onClick={() => dispatch(deleteUsers(id))}
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