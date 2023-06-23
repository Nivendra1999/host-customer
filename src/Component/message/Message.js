import api from "../../Webapi/api";
import "./message.css";
import { format } from "timeago.js";
import Avatar from "../../user.png"

export function Message({message,own,profile}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={profile ? api.profilepic + profile: Avatar}
          alt=""
        />
        {/* <p className="messageText">{message.text}</p> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}