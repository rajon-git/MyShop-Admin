import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import couponService from "../coupon/couponService"

export const getAllCoupons = createAsyncThunk('coupon/get-coupons' , async(thunkAPI)=>{
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCoupon = createAsyncThunk(
    "coupon/create-coupon",
    async (couponData, thunkAPI) => {
      try {
        return await couponService.createCoupons(couponData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState  = createAction("Reset_all");
const initialState = {
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllCoupons.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })
        .addCase(getAllCoupons.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createCoupon.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCoupon.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCoupon = action.payload;
        })
        .addCase(createCoupon.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, ()=> initialState);
    }
})

export default couponSlice.reducer;