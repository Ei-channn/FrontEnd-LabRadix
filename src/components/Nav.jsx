import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function Nav() {

    console.log("TOKEN:", localStorage.getItem("token"));

    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await api.post("/logout");

        localStorage.removeItem("token");

        navigate("/login");
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/user");

                const data = response.data;

                setUser(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="side">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon"></div>
                    <div className="logo-name">LabRadix</div>
                    <div className="logo-sub">Lab & Radiologi</div>
                </div>

                <nav className="nav-section">
                    <div className="nav-label">Menu Utama</div>
                    <Link to="/dashboard"><p className="nav-item">Dashboard</p></Link>
                    {user.role === 'dokter' && (
                        <Link to="/permintaan"><p className="nav-item">Permintaan</p></Link>
                    )}

                    {user.role === 'admin' && (
                        <>
                            <a className="nav-item" href="#">Input User</a>
                            <a className="nav-item" href="#">Input Pasien</a>
                        </>
                    )}

                    <div className="nav-label">Hasil & Laporan</div>
                    {user?.role === 'petugas_lab' && (
                        <>
                            <a className="nav-item" href="#">Input Hasil</a>
                            <a className="nav-item" href="#">Distribusi</a>
                        </>
                    ) }
                    {user.role === 'dokter' && (
                        <a className="nav-item" href="#">Nilai Kritis</a>
                    )}
                    {user.role === 'admin' && (
                        <>
                            <a className="nav-item" href="#">Jenis Pemeriksaan</a>
                            <a className="nav-item" href="#">Parameter Pemeriksaan</a>
                        </>
                    )}
                    <a className="nav-item" href="#">Arsip</a>

                    <div className="nav-label">Pengaturan</div>
                    <a className="nav-item" href="#">Settings</a>
                </nav>
                <div className="sidebar-footer">
                    <div className="user-avatar">{user?.role == 'dokter' ? 'DR' : 
                                                user.role == 'admin' ? 'A' : 
                                                'L'}</div>
                    <div className="user-info">
                        <div className="user-name">{user?.name}</div>
                        <div className="user-role">{user?.role}</div>
                    </div>
                    <div className="container-button">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Nav;