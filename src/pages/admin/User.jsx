import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function User() {

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [noTelp, setNoTelp] = useState("");

    const fetchData = async (pageNum) => {
        try {
            const response = await api.get(`/users?page=${pageNum}`);

            setUsers(response.data?.data?.data || []);
            setLastPage(response.data?.data?.last_page);
            setTotalUsers(response.data?.data?.total);

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
                name: name,
                email: email,
                password: password,
                role: role,
                no_telp: noTelp,
            };

            if (editId) {
                await api.put(`/users/${editId}`, data);
            } else {
                await api.post("/users", data);
            }

            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setNoTelp("");
            setEditId(null);

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setEmail(item.email);
        setPassword(item.password);
        setRole(item.role);
        setNoTelp(item.no_telp);
        setEditId(item.id);
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
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>No Telp</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(users) && users.
                                                filter(u => u.role !== 'admin').
                                                map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="patient-info">
                                                            <span className="patient-name">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{fontSize: "11px"}}>
                                                        {item.email}
                                                    </td>
                                                    <td style=
                                                        {{fontSize: "11px", color: '#8fa3bd'}}>
                                                        {item.role}
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
                    {totalUsers > 10 && (
                        <div className="modal-pagination" style={{ marginTop: "10px" }}>
                                <button
                                    className="page-btn"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Prev
                                </button>
                                {[...Array(lastPage)].map((_, i) => (
                                    <button
                                        key={i}
                                        className={`page-btn ${page === i + 1 ? "active" : ""}`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="page-btn"
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
                                    <label>Nama :</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ketik nama pasien..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Email :</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Password :</label>
                                    <input 
                                        type="text" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ex : Ex : 1234..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Role :</label>
                                    <select 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)} 
                                        required
                                    >
                                        <option value="">-- Pilih Role --</option>
                                        <option value="dokter">Dokter</option>
                                        <option value="petugas_lab">Petugas Lab</option>
                                    </select>
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

export default User;