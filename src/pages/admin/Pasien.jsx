import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Pasien() {

    const [pasien, setPasien] = useState([]);
    const [totalPasien, setTotalPasien] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaPasien, setNamaPasien] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [alamat, setAlamat] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [chatId, setChatId] = useState("");

    const fetchData = async (pageNum = 1) => {
        try {
            const response = await api.get(`/pasien?page=${pageNum}`);
            setPasien(response.data?.data?.data || []);
            setLastPage(response.data?.data?.last_page);
            setTotalPasien(response.data?.data?.total);
        } catch (error) {
            console.log("Error fetch pasien:", error);
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
                nama_pasien: namaPasien,
                tanggal_lahir: tanggalLahir,
                jenis_kelamin: jenisKelamin,
                alamat: alamat,
                no_telp: noTelp,
                telegram_chat_id: chatId,
            };

            if (editId) {
                await api.put(`/pasien/${editId}`, data);
            } else {
                await api.post("/pasien", data);
            }

            setNamaPasien("");
            setTanggalLahir("");
            setJenisKelamin("");
            setAlamat("");
            setNoTelp("");
            setChatId("");
            setEditId(null);

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaPasien(item.nama_pasien);
        setTanggalLahir(item.tanggal_lahir);
        setJenisKelamin(item.jenis_kelamin);
        setAlamat(item.alamat);
        setNoTelp(item.no_telp);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/pasien/${id}`);
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
                                <div className="stat-label">Pasien Harian</div>
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
                                                <th>Nama</th>
                                                <th>Tanggal Lahir</th>
                                                <th>Jenis Kelamin</th>
                                                <th>Alamat</th>
                                                <th>No Telp</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(pasien) && pasien.map((item) => (
                                                <tr key={item.id}>
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
                                                        {item.jenis_kelamin }
                                                    </td>
                                                    <td style=
                                                        {{fontSize: "11px", color: '#8fa3bd'}}>
                                                        {item.alamat}
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.no_telp}
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
                        {totalPasien > 10 && (
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
                                    <label>Nama Pasien :</label>
                                    <input 
                                        type="text" 
                                        value={namaPasien}
                                        onChange={(e) => setNamaPasien(e.target.value)}
                                        placeholder="Ketik nama pasien..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Tanggal Lahir :</label>
                                    <input 
                                        type="date" 
                                        value={tanggalLahir} 
                                        onChange={(e) => setTanggalLahir(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Jenis Kelamin :</label>
                                    <select 
                                        value={jenisKelamin} 
                                        onChange={(e) => setJenisKelamin(e.target.value)} 
                                        required
                                    >
                                        <option value="">-- Pilih Jenis Kelamin --</option>
                                        <option value="laki_laki">Laki-Laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Alamat :</label>
                                    <input 
                                        type="text" 
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                        placeholder="Ex : Kediri..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>No Telp :</label>
                                    <input 
                                        type="number" 
                                        value={noTelp}
                                        onChange={(e) => setNoTelp(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Chat ID :</label>
                                    <input 
                                        type="number" 
                                        value={chatId}
                                        onChange={(e) => setChatId(e.target.value)}
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

export default Pasien;