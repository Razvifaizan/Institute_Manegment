import { Link } from "react-router-dom";
import Logo from "../assets/Images/logo.webp";
import React from "react";

function Home() {
    return (
        <>
            <section
                id="hero"
                className="hero section p-0"
                style={{
                    height: '100vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <img
                    src={Logo}
                    alt="Institute Logo"
                    style={{
                        width: '100%', // Logo ko full width me dikhai dena
                        height: '100vh', // Height auto rakhein taaki aspect ratio maintain ho
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
                <div
                    className="overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgb(5 76 80 / 80%', // Adjust opacity as needed
                        zIndex: 2,
                    }}
                ></div>
               <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
                    <h1 className="hero-title text-light">Welcome to Our Institute</h1>
                    <p className="hero-description text-light">
                        Register now and start exploring our free courses!
                    </p>
                    {/* Updated Button for Registration */}
                    <Link to="/register" className="btn">Register Now to Try Free Courses</Link>
                </div>
            </section>
        </>
    );
}

export default Home;
