import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    tasks: []
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        Fetch_tasks_Success: (state, action) => {
            return {
                ...state.tasks,
                tasks: action.payload
            }
        },
        Delete_Task_Success: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        },
        Create_Task_Success: (state, action) => {
            return{
                ...state,
               tasks:[...state.tasks,action.payload]

            }
        },
        Update_Task_Success: (state, action) => {
                state.tasks= state.tasks.map((task) => (task.id === action.payload.id? action.payload : task))
            }
        
    }
})


export const { Fetch_tasks_Success, Delete_Task_Success, Create_Task_Success,Update_Task_Success } = taskSlice.actions

export default taskSlice.reducer