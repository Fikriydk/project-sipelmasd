import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import home from "../assets/icon/home-icon.png"
import user from "../assets/icon/profile-icon.png";
import "../css/login-user.css"

function LoginUser() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            localStorage.setItem("userProfile", JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }));
            
            alert("Login berhasil: " + userCredential.user.email);
            navigate("/user/layanan");
        } catch (error) {
            alert("Gagal: " + error.message);
        }
    }

    return (
        <div className="loginuser-page">
            <div className="home">
                <img src={home} alt="home icon" onClick={() => navigate("/")} />
            </div>
            <div className="content-wrapper">
                <div className="card-container">
                    <div className="loginuser-card">
                        <img src={user} alt="user icon" />
                        <h2>LOGIN USER</h2>
                        <input type="email" placeholder="Masukkan email anda" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Masukkan kata sandi" onChange={(e) => setPass(e.target.value)} />
                        <button className="loginuser-button" onClick={login}>LOGIN</button>
                        <p className="information">Belum punya akun?
                            <Link to="/register"> Daftar disini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default LoginUser;