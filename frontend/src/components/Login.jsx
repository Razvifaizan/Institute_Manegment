import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/style/login.css";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { updateUser } from "../Redux/Slice";
import React from "react";

function Login() {
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

   const loginUser = async (event) => {
    event.preventDefault();

    const em = email.current.value;
    const pass = password.current.value;

    const obj = { email: em, password: pass };

    try {
        const resp = await WebServise.postAPI(WebAPI.loginAPI, obj);
        console.log(JSON.stringify(resp)+"....");

        if (resp.data.status) {
            const userInfo = { ...resp.data.data, isLoginStatus: true };
            console.log(userInfo);
            dispatch(updateUser(userInfo));

            if (userInfo.role === "user") {
                navigate("/userHome");
            } else if (userInfo.role === "admin") {
                navigate("/adminHome");
            }
        } else {
            setMsg(resp.data.message);
        }
    } catch (error) {
        console.error("Login error:", error);

        // Use the error object to show the message
        if (error.response) {
            // Server responded with a status other than 200 range
            setMsg(error.response.data.message || "An error occurred during login.");
        } else if (error.request) {
            // Request was made but no response received
            setMsg("No response from server. Please try again later.");
        } else {
            // Something happened while setting up the request
            setMsg("Login failed. Please check your input and try again.");
        }
    }
};


    return (
        <div className="box">
            <div className="wrapper">
                <div className="container loginContainer">
                    <h1>Welcome</h1>
                    <form className="form loginform" onSubmit={loginUser}>
                        <input ref={email} type="text" placeholder="Username" required />
                        <input ref={password} type="password" placeholder="Password" required />
                        <button type="submit" id="login-button">Login</button>
                    </form>
                    {msg && <p className="error-message">{msg}</p>}
                </div>
                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}

export default Login;
