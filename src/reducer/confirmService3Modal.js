import { createSlice } from "@reduxjs/toolkit";

const initState = {    
    isConfirmService3Modal: false    
}

const confirmService3ModalReducer = createSlice({
    name:'confirmService3',
    initialState: initState,
    reducers: {
        confirmService3: (state, action)=>{
            state.isConfirmService3Modal = action.payload
        }
    }
});

export default confirmService3ModalReducer.reducer;
export const {confirmService3} = confirmService3ModalReducer.actions;