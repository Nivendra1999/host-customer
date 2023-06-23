import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import Avatar from "../../user.png"
import api from "../../Webapi/api";

export function Conversation({ conversation, currentUser, bool }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!bool) {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      const getUser = async () => {
        try {
          const res = await axios.get(api.URL + api.GET_USER_BY_ID + friendId);
          setUser(res.data.user);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
    else setUser(conversation);
  }, [currentUser, conversation]);

  return <>
    <div className="conversation">
      <img className="conversationImg" src={user?.profilePhoto ? api.profilepic + user.profilePhoto : Avatar} alt="" />
      <span className="conversationName">{(user) && user.userName}</span>
    </div>
  </>
}