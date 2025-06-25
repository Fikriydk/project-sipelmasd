import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import home from "../assets/icon/home-icon.png"
import user from "../assets/icon/profile-icon.png";
import "../css/login-admin.css"

function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            const token = res.data.adminToken;

            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload.role !== "admin") {
                alert("Akun ini bukan admin!");
                return;
            }

            localStorage.setItem("adminToken", token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            alert("Gagal: " + err.response?.data?.error);
        }
    }

    return (
        <div className="loginadmin-page">
            <div className="home">
                    <img src={home} alt="home icon" onClick={() => navigate("/")} />
            </div>
            <div className="content-wrapper">
                <div className="card-container">
                    <div className="loginadmin-card">
                        <img src={user} alt="user icon" />
                        <h2>LOGIN ADMIN</h2>
                        <form onSubmit={handleLogin} className="form-log">
                            <input type="email" placeholder="Masukkan email anda" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Masukkan kata sandi" onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" className="loginadmin-button">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginAdmin;