import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
};

export const getAllUsersData = createAsyncThunk(
  "allUsersData/getAllUsersData",
  // async (GetAuthToken) => {
  //   const { data } = await axios.get("/user/", { headers: { Authorization: GetAuthToken }} );
  //   console.log(data);
  //   return data;
  // }
  async () => {
    const { data } = await axios.get("/user/");
    //console.log("allUsersSlice",data);
    return data;
  }
);

const allUsersSlice = createSlice({
  name: "allUsersData",
  initialState,
  reducers:{
     setRoleAndBLockedStatus : (state , action)=>{
        const userAction = action.payload.name;
        const userValue = action.payload.value;
        const userId = action.payload.uid;
        const allUserData = state.users;
        const findIndexOfUser = allUserData.findIndex((d)=>d.id  === userId );
        if(findIndexOfUser !== -1){
          if(userAction === "role"){
            allUserData[findIndexOfUser][`role`] = userValue;
          }
          if(userAction === "blockAction"){
            allUserData[findIndexOfUser][`blocked`] = userValue;
          }
        }
     },deleteUserInRedux:(state ,action)=>{
       const userAllData = state.users;
       const filteredUserData = userAllData.filter((d)=>d.id !== action.payload.user_id);
       state.users =filteredUserData;
     }
  },
  extraReducers: {
    [getAllUsersData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllUsersData.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload.data;
    },
    [getAllUsersData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default allUsersSlice.reducer;
export const {
  setRoleAndBLockedStatus,deleteUserInRedux,
} = allUsersSlice.actions;
