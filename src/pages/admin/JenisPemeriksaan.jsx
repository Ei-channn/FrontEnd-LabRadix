import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function JenisPemeriksaan() {

    const [jenis, setJenis] = useState([]);
    const [totalJenis, setTotalJenis] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namajenis, setNamaJenis] = useState("");
    const [kategori, setKategori] = useState("");

    const fetchData = async () => {
        try {
            const response = await api.get("/jenis");
            setJenis(response.data?.data?.data || []);
            setLastPage(response.data?.data?.last_page);
            setTotalJenis(response.data?.data?.total);
        } catch (error) {
            console.log("Error fetch jenis:", error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

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
                const response = await api.get("/laporan");

                const data = response.data;

                setLaporan(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                nama_jenis: namajenis,
                kategori: kategori,
            };

            if (editId) {
                await api.put(`/jenis/${editId}`, data);
            } else {
                await api.post("/jenis", data);
            }

            setNamaJenis("");
            setKategori("");
            setEditId(null)

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaJenis(item.nama_jenis);
        setKategori(item.kategori);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/jenis/${id}`);
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
                                                <th>Nama Jenis</th>
                                                <th>Total Parameter</th>
                                                <th>Kategori</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(jenis) && jenis.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.nama_jenis}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.parameter_pemeriksaan_count}
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.kategori}
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
                    {totalJenis > 10 && (
                        <div style={{ marginTop: "10px" }}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                >
                                Prev
                            </button>
                            {[...Array(lastPage)].map((_, i) => (
                                <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                style={{
                                    fontWeight: page === i + 1 ? "bold" : "normal",
                                    margin: "0 3px"
                                }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={page === lastPage}
                                onClick={() => setPage(page + 1)}
                                >
                                Next
                            </button>
                        </div>
                    )}
                    </div>
                    <div className="container-form">
                        <div>
                            <h3>Form Permintaan Pemeriksaan</h3>
                            <form onSubmit={handleSubmit}>
                                
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Nama Jenis Pemeriksaan :</label>
                                    <input 
                                        type="text" 
                                        value={namajenis}
                                        onChange={(e) => setNamaJenis(e.target.value)}
                                        placeholder="Ketik nama Jenis..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Kategori :</label>
                                    <select 
                                        value={kategori} 
                                        onChange={(e) => setKategori(e.target.value)} 
                                        required
                                    >
                                        <option value="">-- Pilih --</option>
                                        <option value="labotarium">Labotarium</option>
                                        <option value="radiologi">Radiologi</option>
                                    </select>
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

export default JenisPemeriksaan;