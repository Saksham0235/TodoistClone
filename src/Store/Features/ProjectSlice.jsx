import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Projects: []
}

const ProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        fetchProjectsAction: (state, action) => {
            state.Projects = action.payload
        },
        createProjectAction(state, action) {
            state.Projects = [...state.Projects, action.payload]
        },
        deleteProjectAction(state, action) {
            console.log(action.payload);
            return {
                ...state,
                Projects: state.Projects.filter((project) => project.id !== action.payload)
            }
        },
        updateProjectAction:(state,action)=>{
            state.Projects=state.Projects.map((project)=>project.id===action.payload.id?action.payload:project)
        },
        updateFavouriteAction: (state, action) => {
            // console.log(action.payload,"From Slice");
            state.Projects=state.Projects.map((project)=>project.id===action.payload.id?action.payload:project)
          }
        }
    
})

export const { fetchProjectsAction, createProjectAction, deleteProjectAction,updateProjectAction,updateFavouriteAction } = ProjectSlice.actions
export default ProjectSlice.reducer