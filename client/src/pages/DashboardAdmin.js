import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { fetchLaporan } from "../graphql/fetchLaporan";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "../components/sidebar-admin";
import "../css/dashboard-admin.css";

function DashboardAdmin() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState({
        status: "",
        kategori: "",
        lokasi: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("Anda belum login sebagai admin.");
            navigate("/");
        }
    }, []);

    const openModal = (report) => {
        setSelectedReport(report);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedReport(null);
        setModalOpen(false);
    };

    const handledelete = async (r) => {
        const konfirmasi = window.confirm("Yakin ingiin menghapus laporan ini?");
        if (!konfirmasi) return;

        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:5000/api/report/${r._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setReports(reports.filter((item) =>
                item._id !== r._id
            ));

            alert("Laporan berhasil dihapus!");
        } catch (err) {
            console.log("Gagal hapus:", err);
            alert("Gagal menghapus laporan")
        }
    }

    const handleupdate = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.put(`http://localhost:5000/api/report/${selectedReport._id}`, selectedReport, {
                headers: { authorization: `Bearer ${token}` }
            });

            const updatedReport = res.data;

            setReports((prevReports) =>
                prevReports.map((report) =>
                    report._id === updatedReport._id ? updatedReport : report
                )
            );

            alert("Berhasil diperbarui!");
            setModalOpen(false);
        } catch (err) {
            console.error("Gagal update: ", err.response?.data || err.message);
            alert("Gagal update");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLaporan(filter);
                setReports(data);
            } catch (err) {
                console.error("❌ Gagal ambil data dari GraphQL", err);
            }
        };
        fetchData();
    }, [filter]);


    return (
        <div className="dashboard-page">
            <Sidebar />
            <div className="table-wrapper">
                <div className="table-container">
                    <h2>Dashboard</h2>
                    <div className="filter-form" style={{ marginBottom: "16px" }}>
                        <select
                            placeholder="Status"
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            style={{ marginRight: "8px" }}
                        >
                            <option value="">--- Status ---</option>
                            <option value="Pending">Pending</option>
                            <option value="Berjalan">Berjalan</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                        <select
                            placeholder="Kategori"
                            value={filter.kategori}
                            onChange={(e) => setFilter({ ...filter, kategori: e.target.value })}
                            style={{ marginRight: "8px" }}
                        >
                            <option value="">--- Kategori ---</option>
                            <option value="keluhan">keluhan</option>
                            <option value="pengaduan">pengaduan</option>
                            <option value="aspirasi">aspirasi</option>
                        </select>
                        <select
                            placeholder="Lokasi"
                            value={filter.lokasi}
                            onChange={(e) => setFilter({ ...filter, lokasi: e.target.value })}
                            style={{ marginRight: "8px" }}
                        >
                            <option value="">--- Lokasi ---</option>
                            <option value="Kecamatan A">Kecamatan A</option>
                            <option value="Kecamatan B">Kecamatan B</option>
                            <option value="Kelurahan C">Kelurahan C</option>
                            <option value="Kota X">Kota X</option>
                        </select>
                    </div>
                    <table className="table-admin">
                        <thead className="title-table">
                            <tr>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>lokasi</th>
                                <th>tanggal</th>
                                <th>status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="body-table">
                            {reports.map((r) => (
                                <tr key={r._id}>
                                    <td>{DOMPurify.sanitize(r.nama)}</td>
                                    <td>{DOMPurify.sanitize(r.judul)}</td>
                                    <td>{DOMPurify.sanitize(r.kategori)}</td>
                                    <td>{DOMPurify.sanitize(r.lokasi)}</td>
                                    <td>
                                        {r.tanggal
                                            ? new Date(Number(r.tanggal)).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </td>
                                    <td>{DOMPurify.sanitize(r.status)}</td>
                                    <td>
                                        <button
                                            onClick={() => openModal(r)}
                                            title="Lihat / Edit"
                                            style={{ marginRight: "8px", background: "none", border: "none", cursor: "pointer" }}
                                        >
                                            <FaSearch color="blue" size={16} />
                                        </button>
                                        <button
                                            onClick={() => handledelete(r)}
                                            title="Hapus"
                                            style={{ background: "none", border: "none", cursor: "pointer" }}
                                        >
                                            <FaTimes color="red" size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Laporan"
                style={{
                    content: {
                        width: "400px",
                        height: "500px",
                        margin: "auto",
                        borderRadius: "12px",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
                        zIndex: 1000
                    }
                }}>
                {selectedReport && (
                    <div className="tampil-modal">
                        <h2>Edit Laporan</h2>
                        <label>Judul</label>
                        <input
                            type="text"
                            value={selectedReport.judul}
                            onChange={(e) => setSelectedReport({ ...selectedReport, judul: e.target.value })}
                        />
                        <label>Isi</label>
                        <input
                            className="isi-tampil"
                            value={selectedReport.isi}
                            onChange={(e) => setSelectedReport({ ...selectedReport, isi: e.target.value })}
                        />
                        <label>Kategori</label>
                        <select
                            value={selectedReport.kategori}
                            onChange={(e) => setSelectedReport({ ...selectedReport, kategori: e.target.value })}
                        >
                            <option value="keluhan">keluhan</option>
                            <option value="pengaduan">pengaduan</option>
                            <option value="aspirasi">aspirasi</option>
                        </select>

                        <label>Status</label>
                        <select
                            value={selectedReport.status}
                            onChange={(e) => setSelectedReport({ ...selectedReport, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Berjalan">Berjalan</option>
                            <option value="Selesai">Selesai</option>
                        </select>

                        <button onClick={handleupdate}>Simpan</button>
                        <button onClick={closeModal}>Tutup</button>
                    </div>
                )}
            </Modal>
        </div >

    );
}
export default DashboardAdmin;