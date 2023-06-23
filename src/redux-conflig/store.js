import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import userPostSlice from "./userPostSlice";
import followerSlice from "./followerSlice";
import followingSlice from "./followingSlice";
const store = configureStore({
    reducer : {
        user : userSlice,
        posts : postSlice,
        userPosts : userPostSlice,
        followers:followerSlice,
        following:followingSlice
    }
})
export default store;
