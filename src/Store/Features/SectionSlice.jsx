import { createSlice } from "@reduxjs/toolkit";


const initialState={
    sections:[]
}


const SectionSlice=createSlice({
    name:'sections',
    initialState,
    reducers:{
        Fetch_Section_Success:(state,action)=>{
            state.sections=action.payload
        },
        Add_Section_Success:(state,action)=>{
            return{
                ...state,
                sections:[...state.sections,action.payload]
            }
        },
        Delete_Section_Success:(state,action)=>{
            return {
                ...state,
                sections:state.sections.filter((section)=>section.id!==action.payload)
            }
        }
    }
})

export const {Fetch_Section_Success,Add_Section_Success,Delete_Section_Success}=SectionSlice.actions

export default SectionSlice.reducer