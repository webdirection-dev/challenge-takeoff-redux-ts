import React, {FC} from "react";
import {useAppSelector} from "../hooks/redux-hooks";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles';

import UserItem from "./userItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const UsersList: FC = () => {
    const {users} = useAppSelector(state => state.userReducer)

    return(
        <TableContainer
            component={Paper}
            sx={{m: '1.5rem 0'}}
        >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >ID</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Website</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map(item => (
                        <UserItem
                            key={`${item.id}${item.email}`}
                            {...item}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersList