import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import home from "../assets/icon/home-icon.png"
import user from "../assets/icon/profile-icon.png";
import "../css/register.css"

function Register() {
    const [email, setEmail] = useState("");
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: nama
            });
            alert("Registrasi berhasil: " + userCredential.user.displayName);
        } catch (error) {
            alert("Gagal: " + error.message);
        }
    }


    return (
        <div className="register-page">
            <div className="home">
                <Link to="/">
                    <img src={home} alt="home icon" />
                </Link>
            </div>
            <div className="content-wrapper">
                <div className="card-container">
                    <div className="register-card">
                        <img src={user} alt="user icon" />
                        <h2>REGISTER</h2>
                        <input type="email" placeholder="Masukkan email anda" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Masukkan nama anda" onChange={(e) => setNama(e.target.value)} />
                        <input type="password" placeholder="Masukkan kata sandi" onChange={(e) => setPassword(e.target.value)} />
                        <button className="register-button" onClick={register}>REGISTER</button>
                        <p className="information">Sudah punya akun?
                            <Link to="/login-user"> login disini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;