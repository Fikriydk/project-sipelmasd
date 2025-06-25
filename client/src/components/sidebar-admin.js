import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

            <div className="logout-section">
                {open && <button className="log-out" onClick={() => {
                    localStorage.removeItem("adminToken");
                    navigate("/login");
                }}>Log-out</button>}
            </div>
        </div>
    )
}
export default Sidebar; 