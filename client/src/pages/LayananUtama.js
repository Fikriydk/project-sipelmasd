import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import "../css/layanan-utama.css";
import { useNavigate } from "react-router-dom";

function LayananUtama() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const userData = localStorage.getItem("userProfile");
        if (userData) {
            setAuthorized(true);
        } else {
            navigate("/login");
        }
        setLoading(false);
    }, []);
    if (loading) return null;
    if (!authorized) return null;

    return (
        <div className="layananutama-page">
            <Sidebar />
        </div>
    );
}
export default LayananUtama;