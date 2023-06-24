import { useNavigate } from "react-router-dom";
import { Navebar } from "../Navbar/Navbar";
import "../ResetPassword/reset.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../Webapi/api";
import axios from "axios";
export default function ResetPassword() {
    const{user}=useSelector((state)=>state.user)
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewpassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");
    const navigate = useNavigate();

    const submitnewpassword=async(event)=>{
        event.preventDefault();
        if(oldPassword==""||newPassword==""||conformPassword==""){
          toast.warning("please enter all feild");
        }
        else if(newPassword==conformPassword){
           try{
            let response = await axios.post(api.CHANGE_PASSWORD, {userId:user._id,password:newPassword,oldPassword:oldPassword})
            toast.success("password changed")
           }catch(err){
            toast.error("oops! something went wrong")
           }
        }
        else
        toast.warning("new password and old password must be same")
    }

    return <>
    <ToastContainer/>
        <Navebar />
        <div className="outer">
            <div className="maindiv" style={{ position: "absolute", display: "grid", placeitem: "center" }}>
                <div>
                    <div className="text-center mt-2">
                        <h3>Create New Password</h3>
                        <p style={{ fontSize: '20px' }}>Your new password must be different from<br />
                            privious used password.
                        </p>
                    </div>
                    <div className="text-center">
                        <div>
                            <label className="m-2">Enter Old Password</label>
                            <input onChange={(event)=>setoldPassword(event.target.value)} className="m-2" type="text" />
                        </div>
                        <div>
                            <label className="m-2">Enter New Password</label>
                            <input onChange={(event)=>setnewpassword(event.target.value)} className="m-2" type="text" />
                        </div>
                        <div>
                            <label className="m-2">Conform Password</label>&nbsp;&nbsp;
                            <input onChange={(event)=>setconformPassword(event.target.value)} className="m-2" type="text" />
                        </div>
                        <div className="buttons" >
                            <div>
                                <button onClick={() => navigate("/profile")} className="b1 btn">Back</button>
                            </div>
                            <div>
                                <button onClick={submitnewpassword} className="b2 btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}