
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isDelivery: false 
}

const isDeliveryReducer = createSlice({
    name:'isAddress',
    initialState: initState,
    reducers: {
        isDeliveryMethod: (state, action)=>{
            state.isDelivery = action.payload
        }
    }
});

export default isDeliveryReducer.reducer;
export const {isDeliveryMethod} = isDeliveryReducer.actions;
