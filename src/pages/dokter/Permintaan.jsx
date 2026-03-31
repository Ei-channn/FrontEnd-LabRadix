import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Permintaan() {

    const [laporan, setLaporan] = useState([]);
    const [permintaan, setPermintaan] = useState([]);
    const [user, setUser] = useState([]);
    const [totalPermintaan, setTotalPermintaan] = useState([]);
    const [jenis, setJenis] = useState([]);
    const [pasien, setPasien] = useState([]);

    const [namaPasienInput, setNamaPasienInput] = useState("");
    const [idPasien, setIdPasien] = useState("");              
    const [idJenis, setIdJenis] = useState("");
    const [tanggalPermintaan, setTanggalPermintaan] = useState(new Date().toISOString().split('T')[0]);
    const [statusPemeriksaan, setStatusPemeriksaan] = useState("antri");
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const [
                resPermintaan,
                resPasien,
                resStatistik,
                resUser,
                resLaporan,
                resJenis,
            ] = await Promise.all([
                    api.get("/permintaan"),
                    api.get("/pasien"),
                    api.get("/statistik"),
                    api.get("/user"),
                    api.get("/laporan"),
                    api.get("/jenis"),
                ]);

            setPermintaan(resPermintaan.data?.data?.data || []);
            setPasien(resPasien.data?.data?.data || []);
            setTotalPermintaan(resStatistik.data.data.total_permintaan);
            setUser(resUser?.data);
            setLaporan(resLaporan?.data);
            setJenis(resJenis.data?.data?.data || []);

        } catch (error) {
            console.log("Error fetch permintaan:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleNamaPasienChange = (e) => {
        const value = e.target.value;
        setNamaPasienInput(value);

        const ditemukan = pasien.find(p => p.nama_pasien === value);
        if (ditemukan) {
            setIdPasien(ditemukan.id);
        } else {
            setIdPasien("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idPasien) {
            alert("Silakan pilih Nama Pasien yang tersedia dari daftar!");
            return;
        }

        try {
            const data = {
                id_pasien: idPasien,
                id_jenis: idJenis,
                tanggal_permintaan: tanggalPermintaan,
                status_pemeriksaan: statusPemeriksaan,
            };

            await api.post("/permintaan", data);

            setNamaPasienInput("");
            setIdPasien("");
            setIdJenis("");
            setTanggalPermintaan(new Date().toISOString().split('T')[0]);
            setStatusPemeriksaan("antri");
            setEditId(null);
            
            alert("Data berhasil disimpan!");
            fetchData();
        } catch (error) {
            console.log(error);
            alert("Gagal menyimpan data. Cek console.");
        }
    };

    return (
        <div>
            <Nav />
            <main className="main">
                <div className="topbar">
                    <div className="page-title">
                        <span>Sistem Informasi</span>
                        Welcome {user?.name}
                    </div>
                    <div className="topbar-right">
                        <button className="topbar-btn">Hari Ini — 13 Mar 2026</button>
                        <button className="topbar-btn">Notifikasi</button>
                    </div>
                </div>
                <div className="container-main">
                    <div className="container-permintaan">
                        <div className="grid-5">
                            <div className="stat-card c1">
                                <div className="stat-value">{laporan.permintaan_harian || '0'}</div>
                                <div className="stat-label">Permintaan Harian</div>
                            </div>
                            <div className="stat-card c2">
                                <div className="stat-value">{totalPermintaan}</div>
                                <div className="stat-label">Total Permintaan</div>
                            </div>
                        </div>
                        <div className="grid-3">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <span className="card-title-dot"></span>
                                            {user?.role === 'admin' ? 'Parameter Pemeriksaan' :
                                                "Permintaan Aktif" 
                                            }
                                    </div> 
                                </div>
                                <div className="card-body" style={{padding: '11px 0 8px'}}>
                                    <table className="req-table">
                                        {user?.role === 'dokter' && (
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
                                                                {item.dokter?.nama_dokter}
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
                        </div>
                    </div>
                    <div className="container-form">
                        <div style={{ padding: '20px' }}>
                            <h3>Form Permintaan Pemeriksaan</h3>
                            <form onSubmit={handleSubmit}>
                                
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Nama Pasien:</label>
                                    <input 
                                        type="text" 
                                        list="list-pasien"
                                        value={namaPasienInput}
                                        onChange={handleNamaPasienChange}
                                        placeholder="Ketik nama pasien..."
                                        required
                                    />
                                    <datalist id="list-pasien">
                                        {pasien.map((p) => (
                                            <option key={p.id} value={p.nama_pasien}></option>
                                        ))}
                                    </datalist>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Jenis Pemeriksaan:</label>
                                    <select value={idJenis} onChange={(e) => setIdJenis(e.target.value)} required>
                                        <option value="">-- Pilih Jenis --</option>
                                        {jenis.map((j) => (
                                            <option key={j.id} value={j.id}>{j.nama_jenis}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Tanggal Permintaan:</label>
                                    <input 
                                        type="date" 
                                        value={tanggalPermintaan} 
                                        onChange={(e) => setTanggalPermintaan(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Status:</label>
                                    <select value={statusPemeriksaan} onChange={(e) => setStatusPemeriksaan(e.target.value)}>
                                        <option value="antri">Antri</option>
                                        <option value="proses">Proses</option>
                                        <option value="selesai">Selesai</option>
                                    </select>
                                </div>
                                <button type="submit">
                                    {editId ? "Update Data" : "Simpan Data"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Permintaan;