import { useState } from "react";
import { Navebar } from "../Navbar/Navbar";
import "./update.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Avtar from "../../user.png";
import api from "../../Webapi/api";
import { setUser } from "../../redux-conflig/userSlice";

export default function UpdateDetails() {
  const { user } = useSelector(state => state.user)

  const [name, setName] = useState(user.name);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [gender, setGender] = useState(user.gender);
  const [art, setArt] = useState(user.art);
  const [address, setAddress] = useState(user.address);
  const [about, setAbout] = useState(user.about);
  const [imgpath, setimgpath] = useState(user.profilePhoto ? user.profilePhoto : Avtar);
  const [profilephoto, setprofilephotos] = useState(user.profilePhoto);
  const [profilestatus, setprofilestatus] = useState(user.profilePhoto ? true : false);
  const [mgenderstaus, setmgender] = useState(user.gender == "male");
  const [fgenderstaus, setfgender] = useState(user.gender == "female")


  const dispatch = useDispatch();



  const updateProfile = async (event) => {
    event.preventDefault();
    window.alert(profilephoto)
    const formData = new FormData();
    formData.append('name', name)
    formData.append('userName', userName)
    formData.append('email', email)
    formData.append('contact', contact)
    formData.append('gender', gender)
    formData.append('art', art);
    formData.append('address', address)
    formData.append('about', about)
    formData.append('file', profilephoto)
    formData.append("_id", user._id);
    
    try {
      let response = await axios.post(api.URL + api.updateprofile, formData);
      let updatedUser = await axios.get(api.URL + "/user/searchById/" + user._id);
      console.log(updatedUser)
      toast.success("user Updated");
      dispatch(setUser({ ...user, profilePhoto: updatedUser.data.user.profilePhoto }))
      localStorage.setItem("user",JSON.stringify({ ...user, profilePhoto: updatedUser.data.user.profilePhoto }));


    } catch (err) {
      console.log(err);
      toast.error("oops! something went wrong")
    }


  }

  const setprofile = (event) => {
    event.preventDefault();
    setimgpath("");
    setprofilestatus(false)
    setimgpath(URL.createObjectURL(event.target.files[0]))
    setprofilephotos(event.target.files[0])

  }
  const selectgender = (event) => {
    if (event.value == "male")
      setmgender(true);
    setfgender(true)
  }

  return <>
    <Navebar />
    <ToastContainer />
    <div className="container container2  mt-3" >
      <div className="row">
        <div className="col-md-6 mt-4 img1">
          <img src="/img/guitar2.jpg" id="image" />
        </div>
        <div className="col-md-6 mt-3 container container3">
          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-md-4 mt-3 me-3">
                <img src={profilestatus ? api.profilepic + user.profilePhoto : imgpath} className="profilepic" />
                <div className="text-center">
                  <label htmlFor="files" className="btn inputpic_lable mbtn">Edit Profile</label>
                  <input multiple="" accept='image/jpeg,image/png' name="file" id="files" onChange={setprofile} style={{ visibility: "hidden" }} type="file" />
                </div>
              </div>
              <div className="col-md-7">
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="form-control mt-2" placeholder="Enter Name" />
                <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} className="form-control mt-2" placeholder="Enter UserName" />
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control mt-2" placeholder="Enter Email" />
                <input type="text" value={contact} onChange={(event) => setContact(event.target.value)} className="form-control mt-2" placeholder="Enter Contact" />

                <input id="male" onClick={(event) => selectgender(event.target)} checked={mgenderstaus} className="mt-2" type="radio" onChange={(event) => setGender(event.target.value)} value='male' name="gender" /> male &nbsp;&nbsp;&nbsp;
                <input id="female" onClick={(event) => selectgender(event.target)} checked={fgenderstaus} className="mt-2" type="radio" onChange={(event) => setGender(event.target.value)} value='female' name="gender" /> female

                <select className="form-control mt-2" onChange={(event) => setArt(event.target.value)} type='text-field' >
                  <option >{user.art ? user.art : "Select Art"}</option>
                  <option >Singer</option>
                  <option >Dancer</option>
                  <option >Tabla</option>
                  <option >Guitarist</option>
                  <option >Pianoist</option>
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <textarea value={address} placeholder="Add Address" onChange={(event) => setAddress(event.target.value)} className="form-control text1"  ></textarea>
            </div>
            <div className="row mt-2">
              <textarea value={about} placeholder="Add Bio" onChange={(event) => setAbout(event.target.value)} className="form-control text1"  ></textarea>
            </div>
            <div style={{ marginLeft: '275px' }} type="submit">
              <button className="btn btn-primary  mt-3 mbtn">update</button>
            </div>
            <div style={{ marginTop: '-37px' }}>
              <Link to='/profile'> <button className="btn btn-primary mbtn">Back</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  </>
}