import {createSlice} from "@reduxjs/toolkit";
import data from "../../data/usersData";

interface IState {
    email: null,
    token: null,
    id: null,

    status: string,
    error: unknown,

    // users: {
    //     [key: string]: any,
    //     id: number | null,
    //     name: string,
    //     email: string,
    //     website: string,
    //     phone: string
    // }[],
    users: {id: number | null, name: string, email: string, website: string, phone: string}[],
    filteredUsers: {id: number | null, name: string, email: string, website: string, phone: string}[],
    idNewUser: number,

    idForChangeUser: number,

    modalAddUser: boolean,
    modalChangeUser: boolean,

    input: string,
}

const initialState: IState = {
    email: null,
    token: null,
    id: null,

    status: '',
    error: {},

    users: data,
    filteredUsers: [],
    idNewUser: 5,

    idForChangeUser: 0,
    modalAddUser: false,
    modalChangeUser: false,

    input: '',
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

            if (state.filteredUsers.length > 0) {
                state.filteredUsers = state.filteredUsers.filter(i => {
                    return i.id !== action.payload
                })
            }
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

            if (state.filteredUsers.length > 0) {
                const changeFilteredUser = state.filteredUsers.find(i => i.id === id)
                if (changeFilteredUser) {
                    changeFilteredUser.id = id
                    if (email !== '') changeFilteredUser.email = email
                    if (name !== '') changeFilteredUser.name = name
                    if (website !== '') changeFilteredUser.website = website
                    if (phone !== '') changeFilteredUser.phone = phone
                }
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

        //filter users
        filterUsers(state, action) {
            const input = action.payload

            const search = (dataUsers: IState["users"]) => {
                return (
                    dataUsers.filter(i => {
                        return (
                            i.name.toLowerCase().includes(input.toLowerCase()) ||
                            i.email.toLowerCase().includes(input.toLowerCase()) ||
                            i.website.toLowerCase().includes(input.toLowerCase()) ||
                            i.phone.toLowerCase().includes(input.toLowerCase())
                        )
                    })
                )
            }
            // const keys = ['name', 'email', 'website', 'phone']
            // const search = (dataUsers: IState["users"]) => {
            //     return (
            //         dataUsers.filter(i => keys.some(key => {
            //
            //             return i[key].toLowerCase().includes(input.toLowerCase())
            //         }))
            //     )
            // }

            if (input.length > 0) {
                state.filteredUsers = search(state.users)
                state.input = input
            } else {
                state.filteredUsers = []
                state.input = ''
            }
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
    filterUsers,
} = userSlice.actions

export default userSlice.reducer