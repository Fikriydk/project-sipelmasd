import React from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "../assets/icon/home-icon.png"
import user from "../assets/icon/profile-icon.png";
import "../css/login-pilihan.css"

function Register() {
    const navigate = useNavigate();

    return (
        <div className="LoginPilihan-page">
            <div className="home">
                <Link to="/">
                    <img src={home} alt="home icon" />
                </Link>
            </div>
            <div className="content-wrapper">
                <div className="card-container">
                    <div className="login-select-card">
                        <img src={user} alt="user icon" />
                        <button onClick={() => navigate("/login-user")}>USER</button>
                        <button onClick={() => navigate("/login-admin")}>ADMIN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;