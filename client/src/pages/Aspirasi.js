import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify';
import Sidebar from "../components/sidebar";
import "../css/support.css";

function Aspirasi() {
    const [nama, setNama] = useState("");
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [lokasi, setLokasi] = useState("Kecamatan A");

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error("Kamu belum login");

            const token = await user.getIdToken();

            await axios.post("http://localhost:5000/api/report", {
                nama: DOMPurify.sanitize(nama),
                judul: DOMPurify.sanitize(judul),
                isi: DOMPurify.sanitize(isi),
                kategori: "aspirasi",
                lokasi: DOMPurify.sanitize(lokasi),
                userId: user.uid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Aspirasi berhasil dikirim.");
            setJudul(""); setIsi(""); setLokasi("");
        } catch (err) {
            alert("Gagal kirim: " + err.message);
        }
    };

    return (
        <div className="support-page">
            <Sidebar />
            <div className="support-wrapper">
                <div className="support-container">
                    <form className="support-card" onSubmit={handleSubmit}>
                        <h2>Aspirasi Masyarakat</h2>
                        <input type="text" placeholder="Masukkan Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
                        <input type="text" placeholder="Masukkan judul aspirasi" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                        <select value={lokasi} onChange={(e) => setLokasi(e.target.value)} required>
                            <option value="Kecamatan A">Kecamatan A</option>
                            <option value="Kecamatan B">Kecamatan B</option>
                            <option value="Kelurahan C">Kelurahan C</option>
                            <option value="Kota X">Kota X</option>
                        </select>
                        <input className="description-text" type="text" placeholder="Masukkan isi aspirasi" value={isi} onChange={(e) => setIsi(e.target.value)} required />
                        <button type="submit" className="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Aspirasi;