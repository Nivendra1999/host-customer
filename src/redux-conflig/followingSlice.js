import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Webapi/api";
import axios from "axios";

export const fetchFollowing = createAsyncThunk("fetchFollowing", async (user) => {
    try {
        let response = await axios.get(api.GET_USER_FOLLOWING + user);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
})


const slice = createSlice({
    name: "follower",
    initialState: {
        followinglist: [],
        isLoading: false,
        error: null
    },
    reducers: {
        setfollowing: (state, action) => {
            state.followinglist = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowing.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchFollowing.fulfilled, (state, action) => {
            state.followinglist = action.payload.result.followingsuser;
            state.isLoading = false;
        }).addCase(fetchFollowing.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Oops! something went wrong";
        })
    }
})
export const { setfollowing } = slice.actions;
export default slice.reducer;