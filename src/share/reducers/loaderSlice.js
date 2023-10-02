import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false
}
export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        startLoading: (state)=>{
            state.loading = true
        },
        stopLoading: (state)=>{
           state.loading = false
        }
    }
})


export const {startLoading, stopLoading} = loaderSlice.actions;
export default loaderSlice.reducer;