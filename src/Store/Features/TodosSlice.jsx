import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    tasks: []
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        Fetch: (state, action) => {
            return {
                ...state.tasks,
                tasks: action.payload
            }
        },
        DeleteTask: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        },
        Create: (state, action) => {
            return{
                ...state,
               tasks:[...state.tasks,action.payload]

            }
        },
        Update: (state, action) => {
                state.tasks= state.tasks.map((task) => (task.id === action.payload.id? action.payload : task))
            }
        
    }
})


export const { Fetch, DeleteTask, Create,Update } = taskSlice.actions

export default taskSlice.reducer