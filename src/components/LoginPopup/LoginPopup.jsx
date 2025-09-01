import React, { useState } from 'react';
import "./Loginpopup.css"
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../context/Storecontext';


const LoginPopup = ({ setShowlogin }) => {
    const {setToken} = useContext(StoreContext);
    const [currentstate, setCurrentstate] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const OnchangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data,[name]:value})
    }

    const onLoginSubmit = async(e)=>{
        e.preventDefault();
        let newurl = "https://fooddelivery-server-3.onrender.com";
        if(currentstate==="Login"){
            newurl += "api/user/login"
        }else{
            newurl += "api/user/register"
        }
        
        const reaponse =await axios.post(newurl, data);
        
        if(reaponse.data.success){
            setToken(reaponse.data.token);
            localStorage.setItem("token", reaponse.data.token);
            setShowlogin(false);
        }else{
            alert(reaponse.data.message);
        }

    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLoginSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentstate}</h2>
                    <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">

                    {currentstate==="Login" ?<></>: <input onChange={OnchangeHandler} value={data.name} type="name" name="name"  required placeholder='Your name' />}
                    

                    <input onChange={OnchangeHandler} value={data.email} type="email" name="email" id="email" required placeholder='Your email' />
                    
                    <input onChange={OnchangeHandler} value={data.password} type="password" name="password" id="password" required placeholder='Password' />
                </div>
                <button type='submit'>{currentstate === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing, i agree to the terms of use & Privacy policy.</p>
                </div>
                {currentstate === "Login"
                    ? <p>Create a new account? <span onClick={()=>setCurrentstate("Sign Up")}>Click here</span></p> :
                    <p>Already have a account? <span onClick={()=>setCurrentstate("Login")}>Login here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup
