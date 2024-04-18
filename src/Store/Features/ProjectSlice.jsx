import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Projects: []
}

const ProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        Fetch_Project_Success: (state, action) => {
            state.Projects = action.payload
        },
        Create_Project(state, action) {
            state.Projects = [...state.Projects, action.payload]
        },
        Delete_Project_Success(state, action) {
            console.log(action.payload);
            return {
                ...state,
                Projects: state.Projects.filter((project) => project.id !== action.payload)
            }
        }
    }
})

export const { Fetch_Project_Success, Create_Project, Delete_Project_Success } = ProjectSlice.actions
export default ProjectSlice.reducer