import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Spesialis() {

    const [spesialis, setSpesialis] = useState([]);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaSpesialis, setNamaSpesialis] = useState("");

    const fetchData = async () => {
        try {
                const resSpesialis = await api.get("/spesialis");
                
                setSpesialis(resSpesialis.data?.data?.data || []);
                
            } catch (error) {
                console.log("Error fetch spesialis:", error);
            }
        };
        
    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                nama_spesialis: namaSpesialis
            };

            if (editId) {
                await api.put(`/spesialis/${editId}`, data);
            } else {
                await api.post("/spesialis", data);
            }

            setNamaSpesialis("");
            setEditId(null)

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaSpesialis(item.nama_spesialis);
        setEditId(item.id)
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/spesialis/${id}`);
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
                                                <th>Nama Spesialis</th>
                                                <th>Jumlah Dokter</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(spesialis) && spesialis.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {index + 1} 
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.nama_spesialis}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.dokter_count}
                                                    </td>
                                                    <td className="btttn">
                                                        <button className="btn-edit" onClick={() => handleEdit(item)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn-delete"onClick={() => handleDelete(item.id)}>
                                                            Delete
                                                        </button>
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
                        <div style={{ padding: '20px' }}>
                            <h3>Form Permintaan Pemeriksaan</h3>
                            <form onSubmit={handleSubmit}>
                                
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Nama Spesialis :</label>
                                    <input 
                                        type="text" 
                                        value={namaSpesialis}
                                        onChange={(e) => setNamaSpesialis(e.target.value)}
                                        placeholder="Ketik nama Spesialis..."
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

export default Spesialis;