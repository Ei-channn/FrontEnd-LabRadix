import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function InputHasil() {

    const [parameter, setParameter] = useState([]);
    const [permintaan, setPermintaan] = useState([]);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [hasil, setHasil] = useState({});

    const [selectPermintaan, setSelectPermintaan] = useState(null);
    const [idPermintaan, setIdPermintaan] = useState("");
    const [idJenis, setIdJenis] = useState("");
    
    const fetchData = async () => {
        try {
            const resPermintaan = await api.get("/permintaan");
            const resUser = await api.get("/user");
            const resLaporan = await api.get("/laporan");
            
            setPermintaan(resPermintaan.data?.data?.data || []);
            setUser(resUser.data || []);
            setLaporan(resLaporan.data || []);
                
        } catch (error) {
            console.log("Error fetch :", error);
        }
    };
        
    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectPermintaan = async (item) => {
        setSelectPermintaan(item);
        setIdPermintaan(item.id);
        setIdJenis(item.id_jenis);

        try {
            const res = await api.get(`/getParameter/${item.id_jenis}`);

            setParameter(res.data.data);

            setHasil({});

        } catch (error) {
            console.log("Error ambil parameter", error);
        }

    };

    const handleInputHasil = (parameterId, value) => {

        setHasil({
            ...hasil,
            [parameterId]: value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                id_permintaan: idPermintaan,
                hasil: parameter.map((p) => ({
                    id_parameter: p.id,
                    nilai_hasil: hasil[p.id] || ""
                }))
            };

            await api.post("/hasil", data);

            alert("Hasil berhasil disimpan");

            setIdPermintaan("");
            setSelectPermintaan(null);
            setParameter([]);
            setHasil({});
            fetchData();

        } catch (error) {
            console.log("Error simpan hasil", error);
            alert("Gagal menyimpan hasil");
        }
    }

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
                                <div className="stat-value">{laporan.pasien_harian}</div>
                                <div className="stat-label">Total Jenis Pemeriksaan</div>
                            </div>
                            <div className="stat-card c2">
                                <div className="stat-value">{laporan.total_pasien}</div>
                                <div className="stat-label">Total Pasien</div>
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
                                        <thead>
                                            <tr>
                                                <th>No Perm</th>
                                                <th>Pasien</th>
                                                <th>Dokter</th>
                                                <th>Jenis Pemeriksaan</th>
                                                <th>Tanggal Perm</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(permintaan) && permintaan.
                                                filter(u => u.status_pemeriksaan != "selesai").
                                                map((item) => (
                                                <tr key={item.id} onClick={() => handleSelectPermintaan(item)}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item?.no_permintaan}
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item?.pasien?.nama_pasien}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item?.dokter?.user?.name}
                                                    </td>
                                                    <td>
                                                        <span className={
                                                            `type-badge type-${
                                                                item.jenis_pemeriksaan?.kategori
                                                            }`}>
                                                            {item.jenis_pemeriksaan?.nama_jenis}
                                                        </span>
                                                    </td>
                                                    <td 
                                                        style={{
                                                            fontSize: "11px", color: '#8fa3bd'
                                                    }}>
                                                        {item.tanggal_permintaan}
                                                    </td>
                                                    <td>
                                                        <span className={
                                                        `status-badge status-${
                                                            item.status_pemeriksaan}`}>
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
                    <div className="container-form">
                        <div style={{padding:"20px"}}>
                            <h2>Input Hasil Pemeriksaan</h2>
                            {selectPermintaan && (
                                <div className="info-permintaan">
                                    <h3>Permintaan Dipilih</h3>
                                    <p>Pasien : {selectPermintaan.pasien?.nama_pasien}</p>
                                    <p>Dokter : {selectPermintaan.dokter?.user?.name}</p>
                                    <p>Jenis : {selectPermintaan.jenis_pemeriksaan?.nama_jenis}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                {parameter.length > 0 && (
                                    <div>
                                        <h3>Parameter Pemeriksaan</h3>
                                        {parameter.map((p) => (
                                            <div
                                                key={p.id}
                                                style={{
                                                    marginBottom:"10px",
                                                    display:"flex",
                                                    gap:"10px",
                                                    alignItems:"center"
                                                }}
                                            >
                                                <label>
                                                    {p.nama_parameter}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={hasil[p.id] || ""}
                                                    onChange={(e) =>
                                                        handleInputHasil(p.id, e.target.value)
                                                    }
                                                    required
                                                />
                                                <span>{p.satuan}</span>
                                                <p>
                                                    normal: {p.nilai_normal_min +  ' - '  + p.nilai_normal_max}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {parameter.length > 0 && (
                                    <button type="submit" style={{marginTop:"20px"}}>
                                        Simpan Hasil
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default InputHasil;