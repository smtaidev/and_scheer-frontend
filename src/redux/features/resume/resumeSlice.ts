import { createSlice } from "@reduxjs/toolkit"


const initialState={
    resumeData:[]

}

const resumeSlice = createSlice({
    name:"resume",
    initialState,
    reducers:{
         addInfo:(state,action)=>{
            state.resumeData.push(action.payload);
         }
    }

})

export const {addInfo} =resumeSlice.actions

export default resumeSlice.reducer;