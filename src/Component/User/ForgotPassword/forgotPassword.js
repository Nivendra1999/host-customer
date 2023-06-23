import axios from "axios";
import "../ForgotPassword/forgot.css"
import React, { useState } from 'react';
import { useEffect } from "react";
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import api from "../../../Webapi/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [otp, setOtp] = useState('');
    const [submitStatus, setsubmitStatus] = useState(false)
    const [emailinput, setemail] = useState("");
    const [responseOtp, setresponseOtp] = useState(null);
    const navigate = useNavigate();
    const submitEmail = async (email) => {
        try {
            let response = await axios.post(api.URL + api.FORGOT_PASSWORD, { email: email })
            setresponseOtp(response.data.otp)
            setsubmitStatus(true)
            let d = document.getElementById("otpdiv");
            let f = document.getElementsByClassName("forgot");
            f[0].style.height = "400px"
            d.style.display = "block";
        } catch (err) {
            toast.info("invalid email")
        }
    }

    const resendOtp = async () => {
        try {
            let response = await axios.post(api.URL + api.FORGOT_PASSWORD, { email: emailinput })
            setresponseOtp(response.data.otp)
            setsubmitStatus(true)
            let d = document.getElementById("otpdiv");
            let f = document.getElementsByClassName("forgot");
            f[0].style.height = "400px"
            d.style.display = "block";
        } catch (err) {
            toast.info("oops! somthing wrong");
        }

    }
    const submitOtp = () => {
         ((otp*1)==responseOtp )?  navigate("/setpassword",{state:{email:emailinput}}):toast.info("please enter valid otp") 
    }

    useEffect(() => {
        let d = document.getElementById("otpdiv");
        let f = document.getElementsByClassName("forgot");
        f[0].style.height = "300px"
        d.style.display = "none";
    }, [])

    return <>
        <ToastContainer />
        <div className="text-center forgot">
            <br />
            <h3>
                Enter your email address <br />
                or username <br />
            </h3>
            <h1><i class="bi bi-shield-lock"></i></h1>
            <input type="email" onChange={(event) => setemail(event.target.value)} className="emailinput" placeholder="enter your email or username" /><br />
            {submitStatus ? <p className="mt-3">Enter Otp</p> : <button onClick={() => submitEmail(emailinput)} className="mt-2 btn btn">Submit</button>}

            <div id="otpdiv">
                <div className="otp-container">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span style={{ marginLeft: "9px" }}></span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{ height: '40px', width: '40px' }}
                    />
                </div>
                <div className="mt-2">
                    <button className="btn btn" onClick={submitOtp}>Submit</button>
                    <span onClick={resendOtp}>resend otp</span>
                </div>


            </div>
        </div>
    </>
}
