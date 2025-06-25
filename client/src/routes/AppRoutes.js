import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginPilihan from "../pages/LoginPilihan";
import LoginAdmin from "../pages/LoginAdmin";
import LoginUser from "../pages/LoginUser";
import Register from "../pages/Register";
import Keluhan from "../pages/Keluhan";
import Pengaduan from "../pages/Pengaduan";
import Aspirasi from "../pages/Aspirasi";

const Home = lazy(() => import("../pages/Home"));
const LayananUtama = lazy(() => import("../pages/LayananUtama"))
const DashboardAdmin = lazy(() => import("../pages/DashboardAdmin"));

function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPilihan />} />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/login-user" element={<LoginUser />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/user/layanan" element={<LayananUtama />} />
                <Route path="/user/layanan/keluhan" element={<Keluhan />} />
                <Route path="/user/layanan/pengaduan" element={<Pengaduan />} />
                <Route path="/user/layanan/aspirasi" element={<Aspirasi />} />
            </Routes>
        </Suspense>
    );
}
export default AppRoutes;