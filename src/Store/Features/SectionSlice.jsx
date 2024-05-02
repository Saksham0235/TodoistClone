import { createSlice } from "@reduxjs/toolkit";


const initialState={
    sections:[]
}


const SectionSlice=createSlice({
    name:'sections',
    initialState,
    reducers:{
        fetchSection:(state,action)=>{
            state.sections=action.payload
        },
        addSection:(state,action)=>{
            return{
                ...state,
                sections:[...state.sections,action.payload]
            }
        },
        deleteSectionAction:(state,action)=>{
            return {
                ...state,
                sections:state.sections.filter((section)=>section.id!==action.payload)
            }
        },
        updateSection:(state,action)=>{
            state.sections=state.sections.map((section)=>(section.id===action.payload.id?action.payload:section))
        }
    }
})

export const {fetchSection,addSection,deleteSectionAction,updateSection}=SectionSlice.actions

export default SectionSlice.reducer