import { useEffect, useState } from "react";
import api from "../services/api";

function Main() {

    const [totalPermintaan, setTotalPermintaan] = useState(0);
    const [kategori, setKategori] = useState([]);
    const [permintaan, setPermintaan] = useState([]);
    const [hasil, setHasil] = useState([]);
    const [status, setStatus] = useState([]);
    const [kritis, setKritis] = useState([]);
    const [distribusi, setDistribusi] = useState([]);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [parameter, setParameter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/permintaan");

                const data = response.data?.data?.data || [];

                setPermintaan(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/hasil");

                const data = response.data?.data?.[0]?.data || [];

                setHasil(data);

            } catch (error) {
                console.log("Error fetch hasil:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/status");

                setStatus(response.data);

            } catch (error) {
                console.log("Error fetch hasil:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/statusKritis");

                setKritis(response.data.data);

            } catch (error) {
                console.log("Error fetch hasil:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/statistik");

                setTotalPermintaan(response.data.data.total_permintaan);
                setKategori(response.data.data.per_kategori);

            } catch (error) {
                console.log("Error fetch hasil:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/distribusi");

                const data = response.data?.data?.data || [];

                setDistribusi(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("laporan");

                const data = response.data;

                setLaporan(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/parameter");

                const data = response.data?.data?.data || [];

                setParameter(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    console.log(parameter)

    return (
        <div>
            <main className="main">
                <div className="topbar">
                    <div className="page-title">
                        <span>Sistem Informasi</span>
                        Welcome {user?.name}
                    </div>
                    <div className="topbar-right">
                        <button className="topbar-btn">Hari Ini — 13 Mar 2026</button>
                        <button className="topbar-btn">Notifikasi</button>
                        {user?.role === "dokter" && (
                            <button className="topbar-btn primary">+ Permintaan Baru</button>
                        )}
                    </div>
                </div>

                {user?.role === 'admin' && (
                    <div className="stats-row">
                        <div className="stat-card c1">
                            <div className="stat-value">{laporan.pasien_harian}</div>
                            <div className="stat-label">Pasien Harian</div>
                        </div>
                        <div className="stat-card c2">
                            <div className="stat-value">{laporan.total_pasien}</div>
                            <div className="stat-label">Total Pasien</div>
                        </div>
                        <div className="stat-card c3">
                            <div className="stat-value">{laporan.total_dokter}</div>
                            <div className="stat-label">Total Dokter</div>
                        </div>
                        <div className="stat-card c4">
                            <div className="stat-value">{laporan.total_petugas_lab}</div>
                            <div className="stat-label">Total Petugas Lab</div>
                        </div>
                    </div>
                )}
                {(user?.role === 'dokter' || user?.role === 'petugas_lab') && (
                    <div className="stats-row">
                        <div className="stat-card c1">
                            <div className="stat-value">{totalPermintaan}</div>
                            <div className="stat-label">Total Permintaan</div>
                        </div>
                        {Array.isArray(kategori) && kategori.map((item) => (
                            <div key={item.kategori} className={`stat-card ${item.kategori}`} >
                                <div className="stat-value">{item.total}</div>
                                <div className="stat-label">Pemeriksaan {item.kategori}</div>
                            </div>
                        ))}
                        <div className="stat-card c4">
                            <div className="stat-value">{kritis}</div>
                            <div className="stat-label">Nilai Kritis</div>
                        </div>
                    </div>
                )}
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <span className="card-title-dot"></span>
                                    {user?.role === 'admin' ? 'Parameter Pemeriksaan' : "Permintaan Aktif"}
                            </div> 
                            <span className="card-action">Lihat Semua</span>
                        </div>
                        <div className="card-body" style={{padding: '11px 0 8px'}}>
                            <table className="req-table">
                                {user?.role === 'admin' && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>Parameter</th>
                                                <th>Jenis</th>
                                                <th>Normal Min</th>
                                                <th>Normal Max</th>
                                                <th>Satuan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(parameter) && parameter.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">{item.nama_parameter}</span>
                                                        </div>
                                                    </td>
                                                    <td><span className={`type-badge type-${item.jenis_pemeriksaan?.kategori}`}>{item.jenis_pemeriksaan?.nama_jenis}</span></td>
                                                    <td style={{fontSize: "11px"}}>{item.nilai_normal_min}</td>
                                                    <td style={{fontSize: "11px", color: '#8fa3bd'}}>{item.nilai_normal_max}</td>
                                                    <td style={{fontSize: "11px", color: '#8fa3bd'}}>{item.satuan}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}
                                {(user?.role === 'dokter' || user?.role === 'petugas_lab') && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>Pasien</th>
                                                <th>Jenis</th>
                                                <th>Pemeriksaan</th>
                                                <th>Dokter</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(permintaan) && permintaan.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">{item.pasien?.nama_pasien}</span>
                                                        </div>
                                                    </td>
                                                    <td><span className={`type-badge type-${item.jenis_pemeriksaan?.kategori}`}>{item.jenis_pemeriksaan?.kategori}</span></td>
                                                    <td style={{fontSize: "11px"}}>{item.jenis_pemeriksaan?.nama_jenis}</td>
                                                    <td style={{fontSize: "11px", color: '#8fa3bd'}}>{item.dokter?.nama_dokter}</td>
                                                    <td><span className={`status-badge status-${item.status_pemeriksaan}`}><span className="status-dot"></span>{item.status_pemeriksaan}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Status Pemeriksaan</div>
                        </div>
                        <div className="card-body">
                            <div className="container-status">
                                <div className="status-stack">
                                    <div className="status-item">
                                        <div className="status-item-icon si-selesai"></div>
                                        <div className="status-item-info">
                                            <div className="status-item-label">Selesai</div>
                                            <div className="status-item-sub">Siap distribusi</div>
                                        </div>
                                        <div className="status-item-count flag-selesai">{status?.selesai}</div>
                                    </div>
                                </div>
                                <div className="status-stack">
                                    <div className="status-item">
                                        <div className="status-item-icon si-proses"></div>
                                        <div className="status-item-info">
                                            <div className="status-item-label">Proses</div>
                                            <div className="status-item-sub">Sedang dikerjakan</div>
                                        </div>
                                        <div className="status-item-count flag-proses">{status?.proses}</div>
                                    </div>
                                </div>
                                <div className="status-stack">
                                    <div className="status-item">
                                        <div className="status-item-icon si-antri"></div>
                                        <div className="status-item-info">
                                            <div className="status-item-label">Antri</div>
                                            <div className="status-item-sub">Menunggu diproses</div>
                                        </div>
                                        <div className="status-item-count flag-antri">{status?.antri}</div>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon si-kritis"></div>
                                    <div className="status-item-info">
                                        <div className="status-item-label">Nilai Kritis</div>
                                        <div className="status-item-sub">Perlu tindakan</div>
                                    </div>
                                    <div className="status-item-count" style={{color: '#f43f5e'}}>{kritis}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-3">
                    <div className="card" style={{animationDelay: "0.35s"}}>
                        <div className="card-header">
                            <div className="card-title">Volume Harian</div>
                            <span className="card-action">7 Hari</span>
                        </div>
                        <div className="card-body">
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-dot" style={{background: "#2ec4b6"}}></div> Lab
                                </div>
                                <div className="legend-item">
                                    <div className="legend-dot" style={{background: "#9d7de8"}}></div> Radiologi
                                </div>
                            </div>
                            <div className="chart-labels">
                                <div className="chart-label-item">Sen</div>
                                <div className="chart-label-item">Sel</div>
                                <div className="chart-label-item">Rab</div>
                                <div className="chart-label-item">Kam</div>
                                <div className="chart-label-item">Jum</div>
                                <div className="chart-label-item">Sab</div>
                                <div className="chart-label-item">Min</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <span style={{color: "#f43f5e"}}>⚠</span> Flagging Nilai
                            </div>
                            <span className="card-action">Lihat Semua</span>
                        </div>
                        <div className="card-body">
                            <div className="flag-list">
                                {Array.isArray(hasil) && hasil.map((item) => (
                                    <div className="flag-item" key={item.id}>
                                        <div className={`flag-alert bg-${item.status}`} ></div>
                                        <div className="flag-info">
                                            <div className="flag-name">
                                                {item.permintaan_pemeriksaan?.pasien?.nama_pasien} - {item.parameter_pemeriksaan?.nama_parameter}
                                            </div>
                                            <div className="flag-detail">
                                                Normal: {item.parameter_pemeriksaan?.nilai_normal_min} | Pasien: {item?.nilai_hasil}
                                            </div>
                                        </div>
                                        <div className={`flag-value flag-${item.status}`}>
                                            {item.status?.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{animationDelay: "0.45s"}}>
                        <div className="card-header">
                            <div className="card-title">Distribusi Hasil</div>
                        </div>
                        <div className="card-body">
                            {Array.isArray(distribusi) && distribusi.map((item) => (
                                <div className="flag-list" key={item.id}>
                                    <div className="flag-item" style={{borderColor: "rgba(46,196,182,0.15)"}}>
                                        <div className="flag-alert" style={{background: "rgba(46,196,182,0.1)"}}></div>
                                        <div className="flag-info">
                                            <div className="flag-name">{item.hasil_pemeriksaan?.permintaan_pemeriksaan?.pasien?.nama_pasien}</div>
                                            <div className="flag-detail">{item.hasil_pemeriksaan?.permintaan_pemeriksaan?.jenis_pemeriksaan?.nama_jenis} 
                                                → {item.hasil_pemeriksaan?.permintaan_pemeriksaan?.dokter?.nama_dokter}
                                                </div>
                                        </div>
                                        <div className="flag-value" style={{color: "#2ec4b6", fontSize: "10px"}}>{item.dikirim_ke_pasien == '1' ? 'Terkirim' : 'Belum'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main;