import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Webapi/api";
import axios from "axios";

export const fetchPostById = createAsyncThunk("fetchPostById",async (userId)=>{
    let response = await axios.post(api.getPostsById,{userId});
    return response.data.posts
})

const slice = createSlice({
    name : "userPost",
    initialState:{
        userPostList : [],
        isLoading : false,
        error : null
    },
    reducers:{
        setUserPosts:(state,action)=>{
            state.userPostList = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostById.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(fetchPostById.fulfilled,(state,action)=>{
            state.userPostList = action.payload;
            state.isLoading = false;
        }).addCase(fetchPostById.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong";
        })
    }
})
export const {setUserPosts} = slice.actions;
export default slice.reducer;