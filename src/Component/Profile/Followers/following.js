import { useEffect, useState } from "react"
// import "../Followers/follower.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../user.png";
import api from "../../../Webapi/api";
import { useDispatch, useSelector } from "react-redux";
import { setfollowing } from "../../../redux-conflig/followingSlice";
import { toast } from "react-toastify";
export function Following() {

    const { followinglist } = useSelector((state) => state?.following)
    const mainUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const viewProfile = async (userId) => {
        Navigate("/userFreindProfile", { state: { userId } });
    }
    const unFollow = async (userId, index) => {
        let newFollowingList = followinglist.map((item) => { if (item.friendUserId._id != userId) return item })
        Promise.all([axios.post(api.UNFOLLOWINGS, { userId: mainUser.user._id, friendUserId: userId }), axios.post(api.UNFOLLOWER, { userId: userId, friendUserId: mainUser.user._id })])
            .then(result => {
                document.getElementById("searchBox" + index).remove();
                dispatch(setfollowing(newFollowingList))
            }).catch(err => {
                console.log(err);
            })
    }
    return <>
        <div className="modal fade" id="followingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                <div className="modal-content searchModalContent followerModalh">
                    <div className="modal-header bgcolor">
                        <h4 className="modal-title" id="exampleModalLabel" style={{ color: "#ffffff" }}>{console.log(followinglist)}followings</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div id="searchResultBox">
                            {followinglist?.length ? followinglist.map((keyword, index) =>
                                <div id={"searchBox" + index} className="mt-2 d-flex justify-content-between  searchResult">
                                    <div className="bg-red">
                                        <img data-bs-dismiss="modal" aria-label="Close" onClick={() => { viewProfile(keyword.friendUserId._id) }} style={{ height: "25px", width: "25px", borderRadius: "50%" }} className="me-1" src={keyword?.profilePhoto ? api.profilepic + keyword?.profilePhoto : Avatar} alt="" />
                                        {keyword?.friendUserId.userName}
                                    </div>
                                    <div >
                                        <a data-bs-dismiss="" aria-label="" onClick={() => { unFollow(keyword.friendUserId._id, index) }} id="viewBox">unFollow</a>
                                    </div>
                                </div>
                            ) : <h3>No followings</h3>}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </>
}