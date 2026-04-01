import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Parameter() {

    const [parameter, setParameter] = useState([]);
    const [jenis, setJenis] = useState([]);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaParameter, setNamaParameter] = useState("");
    const [idJenis, setIdJenis] = useState("");
    const [namaJenis, setNamaJenis] = useState("");
    const [normalMin, setNormalMin] = useState("");
    const [normalMax, setNormalMax] = useState("");
    const [satuan, setSatuan] = useState("");

    const fetchData = async () => {
        try {
                const response = await api.get("/parameter");
                
                const data = response.data?.data?.data || [];
                
                setParameter(data);
                
            } catch (error) {
                console.log("Error fetch parameter:", error);
            }
        };
        
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/jenis");

                const data = response.data?.data?.data || [];

                setJenis(data);

            } catch (error) {
                console.log("Error fetch jenis:", error);
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
                console.log("Error fetch user:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/laporan");

                const data = response.data;

                setLaporan(data);

            } catch (error) {
                console.log("Error fetch laporan:", error);
            }
        };

        fetchData();
    }, []);

    const handleNamaJenisChange = (e) => {
        const value = e.target.value;
        setNamaJenis(value);

        const ditemukan = jenis.find(p => p.nama_jenis === value);
        if (ditemukan) {
            setIdJenis(ditemukan.id);
        } else {
            setIdJenis("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                nama_parameter: namaParameter,
                id_jenis: idJenis,
                nilai_normal_min: normalMin,
                nilai_normal_max: normalMax,
                satuan: satuan,
            };

            if (editId) {
                await api.put(`/parameter/${editId}`, data);
            } else {
                await api.post("/parameter", data);
            }

            setNamaParameter("");
            setNamaJenis("");
            setIdJenis("");
            setNormalMin("");
            setNormalMax("");
            setSatuan("");
            setEditId(null)

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaParameter(item.nama_parameter);
        setNamaJenis(item.jenis_pemeriksaan.nama_jenis);
        setNormalMin(item.nilai_normal_min);
        setNormalMax(item.nilai_normal_max);
        setSatuan(item.satuan);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/parameter/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
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
                                                <th>No</th>
                                                <th>Nama Parameter</th>
                                                <th>Jenis Pemeriksaan</th>
                                                <th>Normal min</th>
                                                <th>Normal max</th>
                                                <th>Satuan</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(parameter) && parameter.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {index + 1}
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
                                                    <td>
                                                        <div className="btttn">
                                                            <button className="btn-edit" onClick={() => handleEdit(item)}>
                                                                Edit
                                                            </button>
                                                            <button className="btn-delete"onClick={() => handleDelete(item.id)}>
                                                                Delete
                                                            </button>
                                                        </div>
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
                        <div>
                            <h3>Form Permintaan Pemeriksaan</h3>
                            <form onSubmit={handleSubmit}>
                                
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Nama Parameter :</label>
                                    <input 
                                        type="text" 
                                        value={namaParameter}
                                        onChange={(e) => setNamaParameter(e.target.value)}
                                        placeholder="Ketik nama Jenis..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Nama Jenis:</label>
                                    <input 
                                        type="text" 
                                        list="list-jenis"
                                        value={namaJenis}
                                        onChange={handleNamaJenisChange}
                                        placeholder="Ketik nama Jenis P..."
                                        required
                                    />
                                    <datalist id="list-jenis">
                                        {jenis.map((p) => (
                                            <option key={p.id} value={p.nama_jenis}></option>
                                        ))}
                                    </datalist>
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Normal Min :</label>
                                    <input 
                                        type="number" 
                                        value={normalMin}
                                        onChange={(e) => setNormalMin(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Normal Max :</label>
                                    <input 
                                        type="number" 
                                        value={normalMax}
                                        onChange={(e) => setNormalMax(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Satuan :</label>
                                    <input 
                                        type="text" 
                                        value={satuan}
                                        onChange={(e) => setSatuan(e.target.value)}
                                        placeholder="Ex : 1+2"
                                        required
                                    />
                                </div>
                                <button type="submit" className="bttn">
                                    {editId ? "Update" : "Tambah"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Parameter;