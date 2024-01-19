
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isConfirmModal: false,
    confirmMsg: '',
    회원가입완료: false
}

const confirmModalReducer = createSlice({
    name: 'confirmModal',
    initialState: initState,
    reducers : {
        confirmModal: (state, action)=>{ 
            state.isConfirmModal = action.payload.isConfirmModal;
            state.confirmMsg = action.payload.confirmMsg;
            state.회원가입완료 =  action.payload.회원가입완료;
        }
    }
});

export default confirmModalReducer.reducer;
export const {confirmModal} = confirmModalReducer.actions;