import {useState, useEffect} from 'react';
import api from "../../services/api";

function Arsip() {

    const [arsip, setArsip] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchArsip = async () => {
            try {
                const response = await api.get("/permintaan");
                const resUser = await api.get("/user");
                setUser(resUser.data || {});
                setArsip(response.data.data.data || []);
            } catch (error) {
                console.error("Error fetching arsip:", error);
            }
        };

        fetchArsip();
    }, []);

    const total = arsip.filter(p => p.status_pemeriksaan === "arsip").length;

    console.log("ARSIP:", total);

    return (
        <div>
            <main className="main">
                <div className="topbar">
                    <div className="page-title">
                        <span>Sistem Informasi</span>
                        Welcome {user?.name}
                    </div>
                </div>
                <div className="container-main">
                    <div className="container-permintaan">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    <span className="card-title-dot"></span>
                                    Arsip Permintaan
                                </div>
                            </div>
                            <div className="card-body" style={{padding: '11px 0 8px'}}>
                                <table className="req-table">
                                    <thead>
                                        <tr>
                                            <th>No Perm</th>
                                            <th>Pasien</th>
                                            <th>Dokter</th>
                                            <th>Jenis</th>
                                            <th>Tanggal</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(arsip) && arsip
                                            .filter(p => p.status_pemeriksaan === "arsip")
                                            .map((item) => (
                                                <tr
                                                    key={item.id}
                                                    onClick={() => handleSelectPermintaan(item)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <td>{item.no_permintaan}</td>
                                                    <td>{item?.pasien?.nama_pasien}</td>
                                                    <td>{item?.dokter?.user?.name}</td>
                                                    <td>
                                                        <span className={
                                                            `type-badge type-${
                                                                item.jenis_pemeriksaan?.kategori
                                                            }`}>
                                                            {item.jenis_pemeriksaan?.nama_jenis}
                                                        </span>
                                                    </td>
                                                    <td>{item.tanggal_permintaan}</td>
                                                    <td>
                                                        <span className={`status-badge status-arsip`}>
                                                            <span className="status-dot"></span>
                                                            {item.status_pemeriksaan}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Arsip;