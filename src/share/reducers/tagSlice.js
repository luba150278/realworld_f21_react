import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    tag: ''
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        selectTag: (state, action)=>{
            state.tag = action.payload
        },
        removeTag: (state)=>{
            state.tag = '';
        }
    }
})

export const {selectTag, removeTag} = tagSlice.actions;
export default tagSlice.reducer;