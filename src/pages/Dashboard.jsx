import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

    const [totalPermintaan, setTotalPermintaan] = useState(0);
    const [kategori, setKategori] = useState([]);
    const [permintaan, setPermintaan] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [hasil, setHasil] = useState([]);
    const [status, setStatus] = useState([]);
    const [statusPemeriksaan, setStatusPemeriksaan] = useState([]);
    const [distribusi, setDistribusi] = useState([]);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [parameter, setParameter] = useState([]);
    const [jenis, setJenis] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    resPermintaan,
                    resPasien,
                    resHasil,
                    resStatus,
                    resStatusPemeriksaan,
                    resStatistik,
                    resUser,
                    resUserRole,
                    resLaporan,
                    resParameter,
                    resJenis,
                    resDistribusi
                ] = await Promise.all([
                        api.get("/permintaan").catch(() => []),
                        api.get("/pasien").catch(() => []),
                        api.get("/hasil").catch(() => []),
                        api.get("/status").catch(() => []),
                        api.get("/statusPemeriksaan").catch(() => []),
                        api.get("/statistik").catch(() => []),
                        api.get("/user").catch(() => []),
                        api.get("/userRole").catch(() => []),
                        api.get("/laporan").catch(() => []),
                        api.get("/parameter").catch(() => []),
                        api.get("/jenis").catch(() => []),
                        api.get("/distribusi").catch(() => [])
                    ]);

                setPermintaan(resPermintaan.data?.data?.data || []);
                setPasien(resPasien.data?.data?.data || []);
                setHasil(resHasil.data?.data?.[0]?.data || []);
                setStatus(resStatus?.data);
                setStatusPemeriksaan(resStatusPemeriksaan?.data);
                setTotalPermintaan(resStatistik.data.data.total_permintaan);
                setKategori(resStatistik.data.data.per_kategori);
                setDistribusi(resDistribusi.data?.data?.data || []);
                setUser(resUser?.data);
                setUsers(resUserRole?.data?.data);
                setLaporan(resLaporan?.data);
                setParameter(resParameter.data?.data?.data || []);
                setJenis(resJenis.data?.data?.data || []);

            } catch (error) {
                console.log("Error fetch :", error);
            }
        };

        fetchData();
    }, []);

    const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    // console.log("TOKEN:", localStorage.getItem("token"));

    return (
        <div>
            <main className="main">
                <div className="topbar">
                    <div className="page-title">
                        <span>Sistem Informasi</span>
                        Welcome {user?.name}
                    </div>
                    <div className="topbar-right">
                        <button className="topbar-btn">Hari Ini - {today}</button>
                        <button className="topbar-btn">Notifikasi</button>
                        {user?.role === "dokter" && (
                            <Link to="/permintaan">
                                <button className="topbar-btn primary">+ Permintaan Baru</button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="stats-row">
                    {user?.role === 'admin' && (
                        <>
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
                        </>
                    )}
                    {(user?.role === 'dokter' || user?.role === 'petugas_lab') && (
                        <>
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
                                <div className="stat-value">{statusPemeriksaan.kritis || 0}</div>
                                <div className="stat-label">Nilai Kritis</div>
                            </div>
                        </>
                    )}
                </div>
                
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <span className="card-title-dot"></span>
                                    {user?.role === 'admin' ? 'Parameter Pemeriksaan' :
                                        "Permintaan Aktif" 
                                    }
                            </div> 
                            <Link to="/parameter">
                                <span className="card-action">Lihat Semua</span>
                            </Link>
                        </div>
                        <div className="card-body" style={{padding: '11px 0 8px'}}>
                            <table className="req-table">
                                {user?.role === 'admin' && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Parameter</th>
                                                <th>Jenis</th>
                                                <th>Normal Min</th>
                                                <th>Normal Max</th>
                                                <th>Satuan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(parameter) && parameter.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.nama_parameter}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={
                                                            `type-badge type-${
                                                                item.jenis_pemeriksaan?.kategori
                                                            }`}>
                                                            {item.jenis_pemeriksaan?.nama_jenis}
                                                        </span>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.nilai_normal_min}
                                                    </td>
                                                    <td 
                                                        style={{
                                                            fontSize: "11px", color: '#8fa3bd'
                                                    }}>
                                                        {item.nilai_normal_max}
                                                    </td>
                                                    <td 
                                                        style={{fontSize: "11px", color: '#8fa3bd'
                                                    }}>
                                                        {item.satuan}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}
                                {(user?.role === 'dokter' || user?.role === 'petugas_lab') && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>No Perm</th>
                                                <th>Pasien</th>
                                                <th>Jenis</th>
                                                <th>Pemeriksaan</th>
                                                <th>Dokter</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(permintaan) && permintaan.
                                                filter(u => u.status_pemeriksaan != "arsip").
                                                map((item) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.no_permintaan}
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.pasien?.nama_pasien}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`type-badge type-${
                                                            item.jenis_pemeriksaan?.kategori
                                                        }`}>
                                                            {item.jenis_pemeriksaan?.kategori}
                                                        </span>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.jenis_pemeriksaan?.nama_jenis}
                                                    </td>
                                                    <td style=
                                                        {{fontSize: "11px", color: '#8fa3bd'}}>
                                                        {item.dokter?.user?.name}
                                                    </td>
                                                    <td><span className={
                                                        `status-badge status-${
                                                            item.status_pemeriksaan}`}>
                                                            <span className="status-dot"></span>
                                                            {item.status_pemeriksaan}
                                                        </span>
                                                    </td>
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
                            <div className="card-title">
                                {user.role === 'admin' ? 'Jenis Pemeriksaan' : "Status Pemeriksaan"}
                            </div>
                            {user.role === 'admin' && (
                                <Link to="/jenis">
                                    <span className="card-action">Lihat Semua</span>
                                </Link>
                            )}
                        </div>
                        {user.role === 'admin' && (
                            <div className="card-body" style={{padding: '11px 0 8px'}}>
                                <table className="req-table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Pemeriksaan</th>
                                            <th>Kategori</th>
                                            <th>Jumah Parameter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(jenis) && jenis.map((item, index) => (
                                            <tr key={item.id}>
                                                <td style={{fontSize: "11px"}}>{index + 1}</td>
                                                <td>
                                                    <div className="patient-info">
                                                        <span className="patient-name">
                                                            {item.nama_jenis}
                                                        </span>
                                                    </div>
                                                    </td>
                                                <td>
                                                    <span className={`type-badge type-${
                                                        item.kategori}`
                                                    }>
                                                        {item.kategori}
                                                    </span>
                                                </td>
                                                <td style={{fontSize: "11px", color: '#8fa3bd'}}>
                                                    {item.parameter_pemeriksaan_count}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {(user.role === 'dokter' || user.role === 'petugas_lab') && (
                            <div className="card-body">
                                <div className="container-status">
                                    <div className="status-stack">
                                        <div className="status-item">
                                            <div className="status-item-icon si-selesai"></div>
                                            <div className="status-item-info">
                                                <div className="status-item-label">Selesai</div>
                                                <div className="status-item-sub">
                                                    Siap distribusi
                                                </div>
                                            </div>
                                            <div className="status-item-count flag-selesai">
                                                {status?.selesai}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="status-stack">
                                        <div className="status-item">
                                            <div className="status-item-icon si-proses"></div>
                                            <div className="status-item-info">
                                                <div className="status-item-label">Proses</div>
                                                <div className="status-item-sub">
                                                    Sedang dikerjakan
                                                </div>
                                            </div>
                                            <div className="status-item-count flag-proses">
                                                {status?.proses}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="status-stack">
                                        <div className="status-item">
                                            <div className="status-item-icon si-antri"></div>
                                            <div className="status-item-info">
                                                <div className="status-item-label">Antri</div>
                                                <div className="status-item-sub">
                                                    Menunggu diproses
                                                </div>
                                            </div>
                                            <div className="status-item-count flag-antri">
                                                {status?.antri}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="status-item">
                                        <div className="status-item-icon si-kritis"></div>
                                        <div className="status-item-info">
                                        <div className="status-item-label">Nilai Kritis</div>
                                            <div className="status-item-sub">Perlu tindakan</div>
                                        </div>
                                        <div className="status-item-count" 
                                            style={{color: '#f43f5e'}}
                                        >
                                            {statusPemeriksaan.kritis || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid-4">
                    {user.role === 'admin' && (
                        <>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        User Data
                                    </div> 
                                    <Link to="/users">
                                        <span className="card-action">Lihat Semua</span>
                                    </Link>
                                </div>
                                <div className="card-body" style={{padding: '11px 0 8px'}}>
                                    <table className="req-table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(users) && users.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {index + 1}
                                                    </td>
                                                    <td >
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`type-badge type-${
                                                            item.role}`
                                                        }>
                                                            {item.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <span className="card-title-dot"></span>
                                        Pasien Data
                                    </div>
                                    <Link to="/pasien">
                                        <span className="card-action">Lihat Semua</span>
                                    </Link>
                                </div>
                                <div className="card-body" style={{padding: '11px 0 8px'}}>
                                    <table className="req-table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Tanggal Lahir</th>
                                                <th>Alamat</th>
                                                <th>Jenis Kelamin</th>
                                                <th>No Telp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(pasien) && pasien.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>{index + 1}</td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.nama_pasien}
                                                            </span>
                                                        </div>
                                                        </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.tanggal_lahir}
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.alamat}
                                                    </td>
                                                    <td style={{fontSize: "11px", color: '#8fa3bd'}}>
                                                        {item.jenis_kelamin}
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.no_telp}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                    {(user.role === 'dokter' || user.role === 'petugas_lab') && (
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    Flagging Nilai
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="flag-list">
                                    {Array.isArray(hasil) && hasil.map((item) => (
                                        <div className="flag-item" key={item.id}>
                                            <div className={`flag-alert bg-${item.status}`} ></div>
                                            <div className="flag-info">
                                                <div className="flag-name">
                                                    {item.permintaan_pemeriksaan?.pasien?.
                                                    nama_pasien} - {
                                                        item.parameter_pemeriksaan?.nama_parameter
                                                    }
                                                </div>
                                                <div className="flag-detail">
                                                    Normal: 
                                                    {item.parameter_pemeriksaan?.nilai_normal_min
                                                    } | Pasien: {item?.nilai_hasil}
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
                    )}
                    {user.role === 'dokter' && (
                        <div className="card" style={{animationDelay: "0.35s"}}>
                            <div className="card-header">
                                <div className="card-title">Volume Mingguan</div>
                                <span className="card-action">7 Hari</span>
                            </div>
                            <div className="card-body">
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <div className="legend-dot" 
                                            style={{background: "#2ec4b6"}}>
                                        </div> Normal
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot" 
                                            style={{background: "#9d7de8"}}>
                                        </div> Tinggi
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot" 
                                            style={{background: "#f59e0b"}}>
                                        </div> Rendah
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot" 
                                            style={{background: "#f43f5e"}}>
                                        </div> Kritis
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
                    )}
                    {user.role === 'petugas_lab' && (
                        <div className="card" style={{animationDelay: "0.45s"}}>
                            <div className="card-header">
                                <div className="card-title">Distribusi Hasil</div>
                            </div>
                            <div className="card-body" style={{padding: '11px 0 8px'}}>
                                <table className="req-table">
                                    <thead>
                                        <tr>
                                            {/* <th>No</th> */}
                                            <th>Petugas</th>
                                            <th>no Perm</th>
                                            <th>Tanggal Kirim</th>
                                            <th>ke Pasien</th>
                                            <th>Metode</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(distribusi) && distribusi.map((item) => (
                                            <tr key={item.id}>
                                                {/* <td style={{fontSize: "11px"}}>{index + 1}</td> */}
                                                <td>
                                                    <div className="patient-info">
                                                        <span className="patient-name">
                                                            {item?.user?.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{fontSize: "11px"}}>
                                                    {item?.permintaan_pemeriksaan?.no_permintaan}
                                                </td>
                                                <td style={{fontSize: "11px"}}>
                                                    {item.tanggal_kirim}
                                                </td>
                                                <td>
                                                    <span className={`type-badge type-${
                                                        item.dikirim_ke_pasien == 1 ? 'Done' : 'Nope'}`
                                                    }>
                                                        {item.dikirim_ke_pasien == 1 ? 'Sudah' : 'Belum'}
                                                    </span>
                                                </td>
                                                <td style={{fontSize: "11px"}}>
                                                    {item.metode_pengiriman}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard;