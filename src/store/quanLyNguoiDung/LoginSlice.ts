import { createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './thunk';
import { User } from 'types';
type userLoginS = {
  user ? : User,
  isLoading?: boolean;
  isRemember  ?: boolean;
}
const initialState  :userLoginS= {
  isLoading : false,
  isRemember : false,
}
const LoginReducer = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setIsremember (state,{payload}) {
      state.isRemember = payload 
    },
  },
  extraReducers : (builder)  =>  {
    builder.addCase(loginThunk.fulfilled,(state,{payload}) => {
      state.isLoading = false;
      if (state.isRemember) {
          localStorage.setItem('token',payload.token)
          localStorage.setItem('id' , String(payload?.user?.id))

      }
      else {
        localStorage.setItem('id' , String(payload?.user?.id))
      }
     
    })
    builder.addCase(loginThunk.rejected,(state) => {
      state.isLoading = false 
    })
    builder.addCase(loginThunk.pending,(state) => {
      state.isLoading = true 
    })
    
  },
  
});

export const {setIsremember} = LoginReducer.actions

export default LoginReducer.reducer