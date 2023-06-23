import { Navebar } from "../Navbar/Navbar";
import { Conversation } from "../conversation/Conversation";
import { Message } from "../message/Message";
import Avatar from "../../user.png"
// import { socket } from "../../App.js";
import "./chat.css"
import { useState } from "react";
import axios from "axios";
import api from "../../Webapi/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { io } from "socket.io-client";

export function Chat() {
    const [userPhoto, setUserPhoto] = useState(null);
    const [freindPhoto, setFreindPhoto] = useState(null);
    const [freindName, setFreindName] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const socket = useRef();
    const { user } = useSelector(state => state.user);
    const [keyword, setKeyword] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);




    const searchByKeyword = async () => {
        try {
            if(keyword){
                let response = await axios.get("http://localhost:3000/user/searchProfile/" + keyword);
                setSearchUsers(response.data.user);
            }
            if(keyword === "")
                setSearchUsers([]);
        }
        catch (err) {
            console.log(err);
        }
    }

    const createConversation = async (freindId) => {
        let flag = false;
        conversation.map((item)=>{
            item.members.map(member=>{
                if (member == freindId){
                    setCurrentChat(item);
                    flag=true;
                }
            })
        })
        if(!flag){
            const response = await axios.post(api.URL + api.CREATE_CONVERSATION,{senderId:user._id,receiverId:freindId});
            setCurrentChat(response.data);
            setConversation([...conversation,response.data]);
        }
    }


    const getConversation = async () => {
        const response = await axios.get(api.URL + "/conversation/" + user._id);
        setConversation(response.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedMessage = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        try {
            let response = await axios.post(api.URL + "/message", updatedMessage);
            setMessage([...message, response.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

    }
    useEffect(() => {
        getConversation();
    }, []);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessage((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);


    useEffect(() => {
        socket.current.emit("addUser", user._id);
    }, [user]);

    const getMessages = async () => {
        const response = await axios.get(api.URL + "/message/" + currentChat?._id);
        setMessage(response.data);
        if (currentChat != null) {
            let userId = currentChat.members.find((item) => item!=user._id);
            const freind = await axios.get(api.URL + api.GET_USER_BY_ID + userId);
            setFreindPhoto(freind.data.user.profilePhoto);
            setFreindName(freind.data.user.userName);
            setUserPhoto(user.profilePhoto);
        }
    }

    useEffect(() => {
        getMessages();
    }, [currentChat]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return <>
        <Navebar />
        <div className="chat-container">
            <div className="chat-user-box">
                <div className="chat-user-input">
                    <input type="text" placeholder="Search for friends" onChange={(event) => setKeyword(event.target.value)} onKeyUp={searchByKeyword} />
                </div>
                <div className="chat-user-main">
                    {(searchUsers.length==0) ? conversation.map((item, index) => <div key={index} onClick={() => setCurrentChat(item)}>
                        <Conversation conversation={item} currentUser={user} bool={false} />
                    </div>) : searchUsers.map((item, index) => <div key={index} onClick={() => createConversation(item._id)}>
                        <Conversation conversation={item} currentUser={user} bool={true} />
                    </div>)}
                </div>
            </div>
            {currentChat ? (
                <> 
                    <div className="chat-main">
                        <div className="chat-main-header">
                            <div className="chat-header-profile">
                                <img src={freindPhoto ? api.profilepic + freindPhoto : Avatar} alt="" />
                                <span className="conversationName">{freindName}</span>
                            </div>
                            <div className="chat-delete">
                                <i className="bi bi-trash3-fill"></i>
                            </div>
                        </div>
                        <div className="chat-main-box">
                            <div className="chatBox">
                                <div className="chatBoxWrapper ">
                                    <div className="chatBoxTop">
                                        {message.map((m, index) => <div key={index} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} profile={(m.sender === user._id) ? userPhoto : freindPhoto} />
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-main-functionality">
                            <input type="text" placeholder="Type a message" onChange={(event) => setNewMessage(event.target.value)} value={newMessage} />
                            <button className="btn-success" onClick={handleSubmit}>SEND</button>
                        </div>
                    </div>
                </>) : (<div className="noConversationText"><div >Open a conversation to start a chat.</div></div>)}
        </div>
    </>
}