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
        deleteTaskAction: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        },
        Create: (state, action) => {
            return {
                ...state,
                tasks: [...state.tasks, action.payload]

            }
        },
        Update: (state, action) => {
            state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task))
        },
        checkboxTaskTodo: (state, action) => {
            console.log(action.payload,"from Check slice");
            console.log(state.tasks,"Before slice");
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        isCompleted: !task.isCompleted
                    }
                }
                return task
            })
            console.log(state.tasks,"From slice");

        },
        unCheckTask: (state, action) => {
            console.log(action.payload, "from uncheck slice");
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        isCompleted: !task.isCompleted
                    }
                }
                return task
            })
        }

    }
})


export const { Fetch, deleteTaskAction, Create, Update, checkboxTaskTodo, unCheckTask } = taskSlice.actions

export default taskSlice.reducer