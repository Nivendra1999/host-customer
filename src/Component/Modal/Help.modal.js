import axios from "axios";
import { useState } from "react";
import api from "../../Webapi/api";
import { toast } from "react-toastify";

export function Help() {
    const [modalemail, setmodalemail] = useState("");
    const [query, setquery] = useState("");

    const obj=document.getElementById("submitmodal")
    const sendhelpmessage = async (event) => {
        event.preventDefault();
        if (modalemail == "" || query == "")
            toast.error("please enter field first");
        else {
            try {
                let response = await axios.post(api.help, { email: modalemail, problem: query });
                if (response) {
                    toast.success("query submitted")
                    closehelpPage();
                    obj.click();
                     
                }
                else {
                    toast.error('oops! something went wrong')
                }
            } catch (err) {
                toast.error("internal server error")

            }
        }
    }
    const closehelpPage = () => {
        setmodalemail("");
        setquery("");
    }

    return <>
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden={true}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ width: "400px" }}>

                <div className="modal-content">
                    <div className='text-end mt-3'>
                        <button onClick={closehelpPage} type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" />
                    </div>


                    <div className='text-center'>
                        <form className="m-3" onSubmit={sendhelpmessage}>
                            <input type="email" onChange={(event) => setmodalemail(event.target.value)} className="form-control m-t-4" value={modalemail} placeholder="enter your email" />
                            <textarea onChange={(event) => setquery(event.target.value)} placeholder="enter your query" value={query} className="form-control mt-4" />
                            <input id="submitmodal" hidden={true} type="button" data-bs-dismiss="modal"/>
                            <button className='mt-4 btn btn postuploadbutton' style={{ width: "80%",fontSize:"20px" }} type="submit">Submit</button><br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}