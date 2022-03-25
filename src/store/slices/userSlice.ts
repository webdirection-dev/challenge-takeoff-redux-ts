import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface IState {
    email: null,
    token: null,
    id: null,

    status: string,
    error: unknown,

    users: {id: number | null, name: string, email: string, website: string}[]
}

interface IUsers {
    id: null | number;
    name: string;
    email: string;
    website: string;
}

const initialState: IState = {
    email: null,
    token: null,
    id: null,

    status: '',
    error: {},

    users: []
}

const PATH = 'https://jsonplaceholder.typicode.com/users/'

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(PATH)

            if (!response.ok) throw new Error('Server Error!')

            if (response.ok) {
                const data: IUsers[] = await response.json()
                return data
            }
        }

        catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteUsers = createAsyncThunk(
    'user/deleteUsers',
    async function (id: number | null, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`${PATH}${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Can not delete user. Server error.')

            dispatch(removeUserFromTable({id}))
        }

        catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const changeUsers = createAsyncThunk(
    'user/changeUsers',
    async function (id: number | null, {rejectWithValue, dispatch, getState}) {
        const state = getState() as {userReducer: {users: {id: number}[]}}
        const user = state.userReducer.users.find(i => i.id === id)
        try {
            const response = await fetch(`${PATH}${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'string',
                    email: 'string',
                    website: 'string',
                })
            })

            if (!response.ok) throw new Error('Can not change user.')

            dispatch(changeUserFromTable({id}))
        }

        catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const addNewUsers = createAsyncThunk(
    'user/addNewUsers',
    async function (user: string | null, {rejectWithValue, dispatch}) {
        const newUser = {
            name: user,
            email: 'email'
        }

        try {
            const response = await fetch(PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            if (!response.ok) throw new Error('Can not add user.')

            const data: {is: number, name: string, email: string} = await response.json()

            dispatch(addUserFromTable(data))
        }

        catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
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

        removeUserFromTable(state, action) {
            state.users = state.users.filter(i => i.id !== action.payload.id)
        },

        changeUserFromTable(state, action) {
            const changeUser = state.users.find(i => i.id === action.payload.id)
            if (changeUser) changeUser.name = 'ttteeesssttt'
        },

        addUserFromTable(state, action) {
            console.log(action.payload)
            state.users.push(action.payload)
        },
    },

    extraReducers: builder => {
        builder
            // getUsers
            .addCase(getUsers.pending, (state, action) => {
            state.status = 'loading'
            state.error = ''
        })
            .addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'resolved'
            state.error = ''

            state.users = action.payload!
        })
            .addCase(getUsers.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload
        })
            // deleteUsers
            .addCase(deleteUsers.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            // changeUsers
            .addCase(changeUsers.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            // addNewUsers
            .addCase(addNewUsers.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export const {setUser, removeUser, removeUserFromTable, changeUserFromTable, addUserFromTable} = userSlice.actions

export default userSlice.reducer