import { createSlice } from "@reduxjs/toolkit";

const initState = {    
    isConfirmService1Modal: false    
}

const confirmService1ModalReducer = createSlice({
    name:'confirmService1',
    initialState: initState,
    reducers: {
        confirmService1: (state, action)=>{
            state.isConfirmService1Modal = action.payload
        }
    }
});

export default confirmService1ModalReducer.reducer;
export const {confirmService1} = confirmService1ModalReducer.actions;