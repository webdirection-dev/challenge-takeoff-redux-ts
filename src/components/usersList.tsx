import React, {FC, useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../hooks/redux-hooks";
import {cleanUp} from "../store/slices/userSlice";

import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles';

import UserItem from "./userItem";
import SuccessAlert from "./alerts/successAlert";

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
    const dispatch = useAppDispatch()
    const {users, filteredUsers, input} = useAppSelector(state => state.userReducer)
    const [openAlert, setOpenAlert] = useState(false);

    const renderUser = (filteredUsers.length > 0 || input !== '' ) ? filteredUsers : users

    useEffect(() => {
        dispatch(cleanUp())
    }, [dispatch])

    return(
        <>
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
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderUser.map(item => (
                            <UserItem
                                key={`${item.id}${item.email}`}
                                setOpenAlert={setOpenAlert}
                                {...item}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <SuccessAlert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                alertType='error'
                text='User removed!'
            />
        </>
    )
}

export default UsersList