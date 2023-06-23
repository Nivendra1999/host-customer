import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Webapi/api";
import axios from "axios";

export const fetchFollower = createAsyncThunk("fetchFollower", async (user) => {
    try {
        let response = await axios.get(api.URL + api.GET_USER_FOLLOWERS + user);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
})


const slice = createSlice({
    name: "follower",
    initialState: {
        followerlist: [],
        isLoading: false,
        error: null
    },
    reducers: {
        setfollowers: (state, action) => {
            state.followerlist = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollower.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchFollower.fulfilled, (state, action) => {
            console.log(action)
            state.followerlist = action.payload.result.followersUser;
            state.isLoading = false;
        }).addCase(fetchFollower.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Oops! something went wrong";
        })
    }
})
export const { setfollowers } = slice.actions;
export default slice.reducer;