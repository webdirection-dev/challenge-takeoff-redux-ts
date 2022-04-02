import {createSlice} from "@reduxjs/toolkit";
import data from "../../data/usersData";

interface IState {
    email: null,
    token: null,
    id: null,

    status: string,
    error: unknown,

    users: {id: number | null, name: string, email: string, website: string, phone: string}[],
    idNewUser: number,

    idForChangeUser: number,

    modalAddUser: boolean,
    modalChangeUser: boolean,
}

const initialState: IState = {
    email: null,
    token: null,
    id: null,

    status: '',
    error: {},

    users: data,
    idNewUser: 5,

    idForChangeUser: 0,
    modalAddUser: false,
    modalChangeUser: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        // auth
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
        },

        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
        },

        //table
        removeUserFromTable(state, action) {
            state.users = state.users.filter(i => {
                return i.id !== action.payload
            })
        },

        changeUserFromTable(state, action) {
            const {id, name, email, website, phone} = action.payload
            const changeUser = state.users.find(i => i.id === id)
            if (changeUser) {
                changeUser.id = id
                if (email !== '') changeUser.email = email
                if (name !== '') changeUser.name = name
                if (website !== '') changeUser.website = website
                if (phone !== '') changeUser.phone = phone
            }
        },

        addUserFromTable(state, action) {
            state.users.push(action.payload)
        },

        toggleModalAddUser(state) {
            state.modalAddUser = !state.modalAddUser
        },

        toggleModalChangeUser(state) {
            state.modalChangeUser = !state.modalChangeUser
        },

        setIdForChangeUser(state, action) {
            state.idForChangeUser = action.payload
        },

        //add users
        addUsers(state, action) {
            state.idNewUser = state.idNewUser + 1

            state.users.push({
                ...action.payload,
                id: state.idNewUser
            })

        },
    },
})

export const {
    setUser,
    removeUser,

    setIdForChangeUser,

    toggleModalAddUser,
    toggleModalChangeUser,

    addUsers,
    changeUserFromTable,
    removeUserFromTable,
} = userSlice.actions

export default userSlice.reducer