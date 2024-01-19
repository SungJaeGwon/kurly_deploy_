import { createSlice } from "@reduxjs/toolkit";

const initState = {
    장바구니: []
}
const cartReducer = createSlice({
    name:'cart',
    initialState: initState,
    reducers: {
        cartMethod: (state, action)=>{
            state.장바구니 = action.payload;
        }
    }
});
export default cartReducer.reducer;
export const {cartMethod} = cartReducer.actions;
