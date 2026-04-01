import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Dokter() {

    const [spesialis, setSpesialis] = useState([]);
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaSpesialis, setNamaSpesialis] = useState("");
    const [namaUser, setNamaUser] = useState("");
    const [idUser, setIdUser] = useState("");
    const [idSpesialis, setIdSpesialis] = useState("");

    const fetchData = async () => {
        try {
                const resSpesialis = await api.get("/spesialis");
                const resUsers = await api.get("/users");
                
                setSpesialis(resSpesialis.data?.data?.data || []);
                setUsers(resUsers.data?.data?.data || []);
                
            } catch (error) {
                console.log("Error fetch :", error);
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

    const handleNamaUserChange = (e) => {
        const value = e.target.value;
        setNamaUser(value);

        const ditemukan = users.find(u => u.name === value && u.role === "dokter");

        if (ditemukan) {
            setIdUser(ditemukan.id);
        } else {
            setIdUser("");
        }
    };

    const handleNamaSpesialisChange = (e) => {
        const value = e.target.value;
        setNamaSpesialis(value);

        const ditemukan = spesialis.find(p => p.nama_spesialis === value);
        if (ditemukan) {
            setIdSpesialis(ditemukan.id);
        } else {
            setIdSpesialis("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                user_id : idUser,
                id_spesialis : idSpesialis
            };

            if (editId) {
                await api.put(`/dokter/${editId}`, data);
            } else {
                await api.post("/dokter", data);
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
        setNamaUser(item?.name);
        setNamaSpesialis(item?.spesialis?.nama_spesialis || '');
        setEditId(item?.id)
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
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
                                                <th>Nama</th>
                                                <th>no Telp</th>
                                                <th>Spesialis</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(users) && users.
                                                filter(u => u.role === "dokter").
                                                map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {index + 1} 
                                                    </td>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item?.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item?.no_telp}
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item?.dokter?.spesialis?.nama_spesialis || '-'}
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
                        <div>
                            <h3>Form Permintaan Pemeriksaan</h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Nama Dokter :</label>
                                    <input 
                                        type="text" 
                                        list="list-dokter"
                                        value={namaUser}
                                        onChange={handleNamaUserChange}
                                        placeholder="Ketik nama Jenis P..."
                                        required
                                    />
                                    <datalist id="list-dokter">
                                        {users
                                            .filter(u => u.role === "dokter")
                                            .map((u) => (
                                                <option key={u.id} value={u.name}></option>
                                        ))}
                                    </datalist>
                                </div>
                                <div style={{ marginBottom: "10px" }} className="form">
                                    <label>Nama Spesialis :</label>
                                    <input
                                        type="text"
                                        list="list-spesialis"
                                        value={namaSpesialis}
                                        onChange={handleNamaSpesialisChange}
                                        required
                                    />
                                    <datalist id="list-spesialis">
                                        {spesialis.map((s) => (
                                            <option key={s.id} value={s.nama_spesialis}></option>
                                        ))}
                                    </datalist>
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

export default Dokter;