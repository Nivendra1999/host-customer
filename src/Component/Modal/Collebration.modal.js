import { useState } from "react";
import "./modal.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../Webapi/api";
export function Collebration() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [contactPersonName, setcontactpersonName] = useState("");
    const [contact, setcontact] = useState("");

    const collebrationform = async (event) => {
        event.preventDefault();
        if (!(name != "") && (email != " ") && (address != " ") && (contactPersonName != " ") && (contact != ""))
            toast.error("please enter all feilds");
        else {
            try {
                let response = await axios.post(api.colabrate, { BusinessFirmName: name, email: email, address: address, contactPersonName: contactPersonName, contact: contact })
                toast.success("submitted")
                clearinputfeild();
                let obj = document.getElementById('btnSave');
                obj.click();


            } catch (err) {
                console.log(err)
                toast.error("!oops something went wrong.")

            }
        }
    }

    const clearinputfeild = () => {
        setname("");
        setemail("");
        setaddress("");
        setcontactpersonName("");
        setcontact("");
      }
    


    return <>
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden={true}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="collebration-modal">
                        <div className='m-3'><img height={"25px"} width={"125px"} style={{ marginTop: "-10px" }} src="/img/logo-no-background.png" />
                            <button style={{ marginLeft: "295px" }} onClick={clearinputfeild}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className='text-center'><h4 className='text-white' style={{ marginLeft: "10px" }}>Collaborate with us</h4></div>

                    </div>
                    <div className="modal-body ">
                        <form name="form">
                            <div className='row'>
                                <div className='container'>
                                    <div className='form-group m-3'>
                                        <input onChange={(event) => setname(event.target.value)} className='form-control colloborationInput' value={name} placeholder='Enter your name' />
                                    </div>
                                    <div className='form-group m-3'>
                                        <input onChange={(event) => setemail(event.target.value)} className='form-control colloborationInput' value={email} placeholder='Enter your email' />
                                    </div>
                                    <div className='form-group m-3'>
                                        <input onChange={(event) => setaddress(event.target.value)} className='form-control colloborationInput' value={address} placeholder='Enter your address' />
                                    </div>
                                    <div className='form-group m-3'>
                                        <input onChange={(event) => setcontactpersonName(event.target.value)} className='form-control colloborationInput' value={contactPersonName} placeholder='Enter contact person name' />
                                    </div>
                                    <div className='form-group m-3'>
                                        <input onChange={(event) => setcontact(event.target.value)} className='form-control colloborationInput' value={contact} placeholder='Enter contact' />
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={clearinputfeild} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={collebrationform} type="submit" className="mbutton">Submit</button>

                        <input  id="btnSave" type="button" hidden={true} data-bs-dismiss="modal" />
                    </div>
                </div>
            </div>
        </div>

    </>
}