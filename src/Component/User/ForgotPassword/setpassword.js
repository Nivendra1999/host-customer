import { useLocation, useNavigate } from "react-router-dom"
import "../ForgotPassword/setpassword.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import api from "../../../Webapi/api";

export default function SetPassword() {
    const state = useLocation();
    const email1 = state.state?.email
    const [newpassword, setnewpassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");

    const navigate = useNavigate();

    const back = (event) => {
        event.preventDefault();
        navigate("/forgotPassword")
    }

    const submitnewpassword = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(api.SET_NEW_PASSWORD, { email: email1, newPassword: newpassword })
            if(response.status){
                 toast.success("password changed")
             navigate("/")
            }
            
        } catch (err) {
            console.log(err)
            toast.info("invalid input");
        }
    }

    return <>
        <ToastContainer />
        <div className="text-center maindiv">
            <br />
            <div>
                <h4>Set New Password</h4>
            </div>
            <div>
                <form className="">
                    <div className="form-group">
                        <input onChange={(event) => setnewpassword(event.target.value)} type="text" className="inputfeild" placeholder="enter new password" />
                    </div>
                    <div >
                        <input onChange={(event) => setconformPassword(event.target.value)} type="text" className="inputfeild" placeholder="re-enter password" />
                    </div>
                    <div className="butons">
                        <button onClick={back} className="buttons btn btn-btn">Back</button>
                        <button onClick={submitnewpassword} className="buttons btn btn--btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}