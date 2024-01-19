import { createSlice } from "@reduxjs/toolkit";

const initState = {    
    isConfirmService2Modal: false    
}

const confirmService2ModalReducer = createSlice({
    name:'confirmService2',
    initialState: initState,
    reducers: {
        confirmService2: (state, action)=>{
            state.isConfirmService2Modal = action.payload
        }
    }
});

export default confirmService2ModalReducer.reducer;
export const {confirmService2} = confirmService2ModalReducer.actions;