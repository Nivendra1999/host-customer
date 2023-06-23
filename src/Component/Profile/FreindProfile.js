import { useDispatch, useSelector } from "react-redux"
import { Navebar } from "../Navbar/Navbar"
import "./profile.css"
import { useEffect } from "react";
import { fetchPostById } from "../../redux-conflig/userPostSlice";
import api from "../../Webapi/api";
import Loader from "../Loader/loader";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Avatar from "../../user.png";
import axios, { AxiosHeaders } from "axios";
import nodata from "../../no-data.png"

export function FreindProfile() {
    const [freindStatus, setfreindStatus] = useState(false);
    const mainUser = useSelector(state => state.user);
    const { userId } = useLocation().state;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postComment, setPostComment] = useState(null);
    const { userPostList, isLoading } = useSelector(state => state.userPosts);
    const [follower, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);



    const viewComment = async (postId) => {
        let comment = document.getElementById("comment-container");
        if (comment.style.display == "none") {
            comment.style.display = "block";
            try {
                let response = await axios.post(api.URL + "/post/getComment", { userPostId: postId });
                setPostComment(response.data.result);
            } catch (err) {
                console.log(err);
            }

        }
        else {
            comment.style.display = "none";
            setPostComment(null);
        }
    }

    const getAllFollowers = async (userId) => {
        let response = await axios.get(api.URL + api.GET_USER_FOLLOWERS + userId);
        if (!response.data.result.followersUser.length){
            setFollowers("0");
        }
        else {
            setFollowers(response.data.result.followersUser.length);
            const followers = response.data.result.followersUser;
            let followings = null;
            for (const follower of followers) {
                if (follower.friendUserId._id === mainUser.user._id) {
                    followings = follower;
                    break;
                }
            }
            if (followings !== null) {
                setfreindStatus(true);
            } else {
                setfreindStatus(false);
            }
        }
    }

    const getAllFollowing = async (userId) => {
        let response = await axios.get(api.URL + api.GET_USER_FOLLOWING + userId);
        (!response.data.result)
            ? setFollowing("0")
            : setFollowing(response.data.result.followingsuser.length);
    }

    const getUser = async () => {
        Promise.all([axios.get(api.URL + api.GET_USER_BY_ID + userId), axios.post(api.URL + api.getPostsById, { userId })]).then(result => {
            setUser(result[0].data.user);
            setPosts(result[1].data.posts);
        }).catch(err => {
            console.log("error");
        });
    }

    const follow = async () => {
        Promise.all([axios.post(api.URL + api.FOLLOWINGS, { userId: mainUser.user._id, friendUserId: userId }) , axios.post(api.URL+api.FOLLOWER,{userId:userId,friendUserId:mainUser.user._id})])
        .then(result =>{
            setfreindStatus(true);
            setFollowers((follower*1)+1);
        }).catch(err=>{
            console.log(err);
        })
    }

    const unFollow = async () => {
        Promise.all([axios.post(api.URL+api.UNFOLLOWINGS,{ userId: mainUser.user._id, friendUserId: userId }) , axios.post(api.URL+api.UNFOLLOWER,{ userId: userId, friendUserId: mainUser.user._id })])
        .then(result =>{
            setfreindStatus(false);
            setFollowers((follower*1)-1);
        }).catch(err =>{
            console.log(err);
        })
    }

    useEffect(() => {
        getUser();
        getAllFollowers(userId);
        getAllFollowing(userId);
    }, []);
    return <>
        <Navebar />
        {/* comment modal start*/}
        <div id="comment-container" className="comment-container" style={{ display: "none" }}>
            <div className="comment-main">
                <div className="comment-box ">
                    <div className="bg-secondry comment-box-post">
                        {(postComment) && postComment.type == "video/mp4" ? <video className="video" loop src={api?.file + postComment?.file} autoPlay="true" /> : <img className="commentPost" src={api?.file + postComment?.file} />}
                    </div>
                    <div className="comment-box-main1">
                        <div style={{ zIndex: "2" }} className="comment-box-main  pt-3">
                            <div onClick={viewComment} className="bi bi-x-circle-fill me-1 comment-close"></div>
                            {(postComment?.commentItems.length) ? postComment?.commentItems.reverse().map((item, index) => <div className="comment-span" key={index}>
                                <div>
                                    <img style={{ cursor: "pointer" }} src={item.friendUserId.profilePhoto ? api.profilepic + item.friendUserId.profilePhoto : Avatar} className="PostHeaderProfile ms-2 me-1" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: "bold" }}>{item.friendUserId.userName}</div>
                                    <div><span class="bi bi-chat-right-heart-fill" style={{ color: "#0275d8" }}><span className='ms-1' style={{ color: "black" }}>{item.comment}</span></span></div>
                                </div>
                            </div>)
                                : <div style={{ height: "100%" }} className="d-flex justify-content-center align-items-center"><div ><img width={"100%"} src={nodata} alt="" /></div></div>
                            }
                        </div>
                        <div className=" comment-likeview">
                            <div style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="ms-4">
                                    <span class="bi bi-chat-right-heart-fill" style={{ color: "#0275d8" }}></span> {postComment?.commentItems.length} comments
                                </div>
                                <div className="me-4">
                                    <span class="bi bi-balloon-heart-fill" style={{ color: "crimson" }}></span>{postComment?.likeItems.length} likes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* comment modal start*/}
        <div className="profile-container">
            <div className="main-profile-container">
                <div className="profile-header ">
                    <div className="profile-photo">
                        {
                            (user) && <img src={user.profilePhoto ? api.profilepic + user.profilePhoto : Avatar} alt="Profile Photo" />
                        }
                    </div>
                    <div className="profile-info  w-75">
                        {(user)
                            ? <h2 className="user-name">{user.userName}</h2>
                            : <h6 className="userSocials" >dataLoading...</h6>
                        }
                        {(user)
                            ? <h2 className="name">{user.name}</h2>
                            : <h6 className="userSocials" >dataLoading...</h6>
                        }
                        <ul className="social-links">
                            <div className="ProfileRow mb-3 row w-50">
                                <div className="col-sm-4"><span className="userSocials">{posts.length} posts</span></div>
                                <div className="col-sm-4"><span className="userSocials">{follower} followers</span></div>
                                <div className="col-sm-4"><span className="userSocials">{following} following</span></div>
                            </div>
                        </ul>
                        {
                            (!freindStatus)
                                ? <button onClick={() => { follow() }}>Follow</button>
                                : <button onClick={() => { unFollow() }}>UnFollow</button>
                        }
                    </div>
                </div>
                <hr />
                <section className="w-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{(!posts.length) && <Loader />}</section>
                <div className="user-post-grid p-5">
                    {(posts.length != 0) && posts.map((posts, index) => <div key={index} className="product-item user-post d-flex justify-content-center" style={{ color: "lightgray" }}>{posts.type == "video/mp4" ? <video className="video Posts" loop src={api.file + posts.file} autoPlay="true" /> : <img className="Posts" src={api.file + posts.file} />}<div className="product-action" onClick={() => viewComment(posts._id)}><a className="btn" style={{ display: "flex", flexDirection: "column" }}><i className="bi bi-heart-fill" style={{ color: "crimson", fontSize: "25px" }}></i><span style={{ color: "white" }}> {posts.likeItems.length} likes</span></a></div></div>)}
                </div>
            </div>
        </div>

    </>
}
