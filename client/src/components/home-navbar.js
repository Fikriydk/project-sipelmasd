import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/black-logo.png";
import "../css/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <label className="logo">
                <Link to="/">
                        <img src={logo} alt="logo kr" />
                </Link>
            </label>
            <div className="nav-links">
                <Link to="/register">REGISTER</Link>
                <Link to="/login">LOGIN</Link>
            </div>
        </nav >
    );
}
export default Navbar;