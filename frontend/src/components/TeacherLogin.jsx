import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/style/login.css"; // Assuming your custom styles are here
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { updateUser } from "../Redux/Slice";
import React from "react";

function TeacherLogin() {
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(""); // State to manage the error message
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

    const loginUser = async (event) => {
        event.preventDefault();

        const em = email.current.value;
        const pass = password.current.value;
        const obj = { email: em, password: pass };

        try {
            const resp = await WebServise.postAPI(WebAPI.teacherLogin, obj);

            if (resp.data.status) {
                const userInfo = { ...resp.data.data, isLoginStatus: true };
                console.log(JSON.stringify(resp)+"_+_+")
                dispatch(updateUser(userInfo));

                if (userInfo.role === "user") {
                    navigate("/userHome");
                } else if (userInfo.role === "admin") {
                    navigate("/adminHome");
                }
                else if (userInfo.role === "main-admin") {
                    console.log("Main admin hai apan")
                    navigate("/MainAdminHome");
                }
            } else {
                
                setMsg(resp.data.message);

                setShowAlert(true); // Show the alert on login failure
            }
        } catch (error) {
            console.error("Login error:", error.response.data.message);
            setMsg(error.response.data.message);
            setShowAlert(true); // Show the alert on exception
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
                    {showAlert && (
                        <div className="alert">
                            <p>{msg}</p>
                            <button onClick={() => setShowAlert(false)}>Close</button>
                        </div>
                    )}
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

export default TeacherLogin;
