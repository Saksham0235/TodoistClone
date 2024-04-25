import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    Labels: []
}


const LabelSlice = createSlice({
    name: 'Label',
    initialState: initialstate,
    reducers: {
       fetchLabelSuccess: (state, action) => {
            state.Labels = action.payload
        },
        addLabelSuccess: (state, action) => {
            return {
                ...state,
                Labels: [...state.Labels, action.payload]

            }
        },
        deleteLabelSuccess: (state, action) => {
            return {
                ...state,
                Labels:state.Labels.filter((label)=>label.id!==action.payload)
            }
        }
    }


})


export const { fetchLabelSuccess, deleteLabelSuccess,addLabelSuccess } = LabelSlice.actions
export default LabelSlice.reducer