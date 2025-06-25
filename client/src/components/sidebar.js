import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from "../assets/logo/white-logo.png";
import profile from "../assets/icon/profile-icon.png";
import "../css/sidebar.css"

function Sidebar() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <div className={`sidebar ${open ? "expanded" : "collapse"}`}>
            <div className="logo-area" onClick={() => setOpen(!open)}>
                <img src={logo} alt="icon logo" />
            </div>

            {open && <div className="profile-section">
                <img src={profile} alt="profile" className="profile-pic" />
            </div>}

            <div className="menu-section">
                {open && <ul>
                    <li onClick={() => navigate("/user/layanan/keluhan")}>Keluhan</li>
                    <li onClick={() => navigate("/user/layanan/pengaduan")}>Pengaduan</li>
                    <li onClick={() => navigate("/user/layanan/aspirasi")}>Aspirasi</li>
                </ul>}
            </div>

            <div className="logout-section">
                {open && <button className="log-out" onClick={() => {
                    const auth = getAuth();
                    signOut(auth)
                        .then(() => {
                            localStorage.removeItem("userProfile");

                            console.log("User berhasil logout dari Firebase");
                            navigate("/login");
                        })
                        .catch((error) => {
                            console.error("Gagal logout:", error);
                            alert("Terjadi kesalahan saat logout.");
                        });
                }}>Log-out</button>}
            </div>
        </div>
    )
}
export default Sidebar; 