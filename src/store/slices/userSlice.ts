import {createSlice} from "@reduxjs/toolkit";
import data from "../../data/usersData";

interface IState {
    email: null,
    token: null,
    id: null,

    status: string,
    error: unknown,

    users: {id: number | null, name: string, email: string, website: string, phone: string}[],

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
            state.users = state.users.filter(i => i.id !== action.payload.id)
        },

        changeUserFromTable(state, action) {
            const {id, name, email, website} = action.payload
            const changeUser = state.users.find(i => i.id === id)
            if (changeUser) {
                changeUser.id = id
                changeUser.email = email
                changeUser.name = name
                changeUser.website = website
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
            state.users.push({
                ...action.payload,
                id: state.users.length + 1
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
} = userSlice.actions

export default userSlice.reducer





// import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//
// interface IState {
//     email: null,
//     token: null,
//     id: null,
//
//     status: string,
//     error: unknown,
//
//     users: {id: number | null, name: string, email: string, website: string}[],
//
//     idForChangeUser: number,
//
//     modalAddUser: boolean,
//     modalChangeUser: boolean,
// }
//
// interface IUsers {
//     id: null | number;
//     name: string;
//     email: string;
//     website: string;
// }
//
// interface IEditUsers {
//     id: number;
//     idNewUser?: number;
//     name: string;
//     email: string;
//     website: string;
// }
//
// const initialState: IState = {
//     email: null,
//     token: null,
//     id: null,
//
//     status: '',
//     error: {},
//
//     users: [],
//
//     idForChangeUser: 0,
//     modalAddUser: false,
//     modalChangeUser: false,
// }
//
// const PATH = 'https://jsonplaceholder.typicode.com/users/'
//
// export const getUsers = createAsyncThunk(
//     'user/getUsers',
//     async function (_, {rejectWithValue}) {
//         try {
//             const response = await fetch(PATH+'?_limit=5')
//
//             if (!response.ok) throw new Error('Server Error!')
//
//             if (response.ok) {
//                 const data: IUsers[] = await response.json()
//                 return data
//             }
//         }
//
//         catch (error) {
//             if (error instanceof Error) {
//                 console.log(error.message)
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
//
// export const deleteUsers = createAsyncThunk(
//     'user/deleteUsers',
//     async function (id: number | null, {rejectWithValue, dispatch}) {
//         try {
//             const response = await fetch(`${PATH}${id}`, {
//                 method: 'DELETE'
//             })
//
//             if (!response.ok) throw new Error('Can not delete user. Server error.')
//
//             dispatch(removeUserFromTable({id}))
//         }
//
//         catch (error) {
//             if (error instanceof Error) {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
//
// export const changeUsers = createAsyncThunk(
//     'user/changeUsers',
//     async function (editUser: IEditUsers, {rejectWithValue, dispatch, getState}) {
//         const state = getState() as {userReducer: {users: {id: number}[]}}
//
//         try {
//             const response = await fetch(`${PATH}${editUser.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name: editUser.name,
//                     email: editUser.email,
//                     website: editUser.website,
//                 })
//             })
//
//             if (!response.ok) throw new Error('Can not change user.')
//
//             const data = await response.json()
//
//             dispatch(changeUserFromTable(data))
//         }
//
//         catch (error) {
//             if (error instanceof Error) {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
//
// export const addNewUsers = createAsyncThunk(
//     'user/addNewUsers',
//     async function (user: string | null, {rejectWithValue, dispatch}) {
//         const newUser = {
//             name: user,
//             email: 'email'
//         }
//
//         try {
//             const response = await fetch(PATH, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newUser)
//             })
//
//             if (!response.ok) throw new Error('Can not add user.')
//
//             const data: {id: number, name: string, email: string} = await response.json()
//             console.log(data)
//
//             dispatch(addUserFromTable(data))
//         }
//
//         catch (error) {
//             if (error instanceof Error) {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
//
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//
//     reducers: {
//         setUser(state, action) {
//             state.email = action.payload.email
//             state.token = action.payload.token
//             state.id = action.payload.id
//         },
//
//         removeUser(state) {
//             state.email = null
//             state.token = null
//             state.id = null
//         },
//
//         removeUserFromTable(state, action) {
//             state.users = state.users.filter(i => i.id !== action.payload.id)
//         },
//
//         changeUserFromTable(state, action) {
//             const {id, name, email, website} = action.payload
//             const changeUser = state.users.find(i => i.id === id)
//             if (changeUser) {
//                 changeUser.id = id
//                 changeUser.email = email
//                 changeUser.name = name
//                 changeUser.website = website
//             }
//         },
//
//         addUserFromTable(state, action) {
//             state.users.push(action.payload)
//         },
//
//         toggleModalAddUser(state) {
//             state.modalAddUser = !state.modalAddUser
//         },
//
//         toggleModalChangeUser(state) {
//             state.modalChangeUser = !state.modalChangeUser
//         },
//
//         setIdForChangeUser(state, action) {
//             state.idForChangeUser = action.payload
//         },
//     },
//
//     extraReducers: builder => {
//         builder
//             // getUsers
//             .addCase(getUsers.pending, (state, action) => {
//             state.status = 'loading'
//             state.error = ''
//         })
//             .addCase(getUsers.fulfilled, (state, action) => {
//             state.status = 'resolved'
//             state.error = ''
//
//             state.users = action.payload!
//         })
//             .addCase(getUsers.rejected, (state, action) => {
//             state.status = 'error'
//             state.error = action.payload
//         })
//             // deleteUsers
//             .addCase(deleteUsers.rejected, (state, action) => {
//                 state.status = 'error'
//                 state.error = action.payload
//             })
//             // changeUsers
//             .addCase(changeUsers.rejected, (state, action) => {
//                 state.status = 'error'
//                 state.error = action.payload
//             })
//             // addNewUsers
//             .addCase(addNewUsers.rejected, (state, action) => {
//                 state.status = 'error'
//                 state.error = action.payload
//             })
//     }
// })
//
// export const {
//     setUser,
//     removeUser,
//     removeUserFromTable,
//     changeUserFromTable,
//     addUserFromTable,
//
//     setIdForChangeUser,
//
//     toggleModalAddUser,
//     toggleModalChangeUser,
// } = userSlice.actions
//
// export default userSlice.reducer