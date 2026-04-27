import { useEffect, useState } from "react";
import api from "../../services/api";

function Dokter() {

    const [spesialis, setSpesialis] = useState([]);
    const [dokter, setDokter] = useState([]);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null); 
    
    const [showModalSpesialis, setShowModalSpesialis] = useState(false);
    const [pageSpesialis, setPageSpesialis] = useState(1);
    const [lastPageSpesialis, setLastPageSpesialis] = useState(1);

    const [showModalDokter, setShowModalDokter] = useState(false);
    const [pageDokter, setPageDokter] = useState(1);
    const [lastPageDokter, setLastPageDokter] = useState(1);

    const [search, setSearch] = useState("");

    const [namaSpesialis, setNamaSpesialis] = useState("");
    const [namaUser, setNamaUser] = useState("");
    const [idUser, setIdUser] = useState("");
    const [idSpesialis, setIdSpesialis] = useState("");

    const fetchData = async (pageS = 1, pageD = 1) => {
        try {
            const resSpesialis = await api.get(`/spesialis?page=${pageS}`);
            const resDokter = await api.get(`/dokter?page=${pageD}`);
            const resUsers = await api.get("/users");
            
            setSpesialis(resSpesialis.data?.data?.data || []);
            setLastPageSpesialis(resSpesialis.data?.data?.last_page || 1);

            setUsers(resUsers.data?.data?.data || []);
            
            setDokter(resDokter.data?.data?.data || []);
            setLastPageDokter(resDokter.data?.data?.last_page || 1);

        } catch (error) {
            console.log("Error fetch :", error);
        }
    };
        
    useEffect(() => {
        fetchData(pageSpesialis, pageDokter);
    }, [pageSpesialis, pageDokter]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user");
                setUser(response.data);
            } catch (error) {
                console.log("Error fetch user:", error);
            }
        };

        fetchUser();
    }, []);

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
            setNamaUser("");
            setIdUser("");
            setIdSpesialis("");
            setEditId(null);

            alert("Data berhasil disimpan!");
            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaUser(item?.name);
        setIdUser(item?.id);

        setNamaSpesialis(item?.dokter?.spesialis?.nama_spesialis || '');
        setIdSpesialis(item?.dokter?.spesialis?.id || '');

        setEditId(item?.dokter?.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await api.delete(`/dokter/${id}`);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const filteredDokter = users.filter(d =>
        d.role === "dokter" && d.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredSpesialis = spesialis.filter(s =>
        s.nama_spesialis.toLowerCase().includes(search.toLowerCase())
    );

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
                    </div>
                </div>
                <div className="container-main">
                    <div className="container-permintaan">
                        <div className="grid-3">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <span className="card-title-dot"></span>
                                        Data Dokter
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
                                            {Array.isArray(users) && users
                                                .filter(u => u.role === "dokter")
                                                .map((item, index) => (
                                                <tr key={item.id}>
                                                    <td style={{fontSize: "11px"}}>
                                                        {(pageDokter - 1) * 10 + index + 1}
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
                                                        <button className="btn-delete" onClick={() => handleDelete(item?.dokter?.id)}>
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
                            <h3>Tambah Spesialis Dokter</h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Nama Dokter :</label>
                                    <input 
                                        type="text" 
                                        value={namaUser}
                                        readOnly
                                        onClick={() => setShowModalDokter(true)}
                                        placeholder="Pilih Dokter..."
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }} className="form">
                                    <label>Nama Spesialis :</label>
                                    <input
                                        type="text"
                                        value={namaSpesialis}
                                        onClick={() => setShowModalSpesialis(true)}
                                        readOnly
                                        placeholder="Pilih Spesialis"
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

                {showModalDokter && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Pilih Dokter</h3>

                            <input
                                type="text"
                                placeholder="Cari dokter..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="modal-body">
                                {filteredDokter.length > 0 ? (
                                    filteredDokter.map(item => (
                                        <div
                                            key={item.id}
                                            className="modal-item"
                                            onClick={() => {
                                                setNamaUser(item.name);
                                                setIdUser(item.id);
                                                setShowModalDokter(false);
                                                setSearch("");
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                                        Tidak ditemukan
                                    </p>
                                )}
                            </div>

                            <div className="modal-footer">
                                <div className="modal-pagination">
                                    <button
                                        className="page-btn"
                                        disabled={pageDokter === 1}
                                        onClick={() => setPageDokter(pageDokter - 1)}
                                    >
                                        Prev
                                    </button>

                                    {[...Array(lastPageDokter)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${pageDokter === i + 1 ? "active" : ""}`}
                                            onClick={() => setPageDokter(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-btn"
                                        disabled={pageDokter === lastPageDokter}
                                        onClick={() => setPageDokter(pageDokter + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                                <button className="btn-tutup" onClick={() => setShowModalDokter(false)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}

                {showModalSpesialis && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Pilih Spesialis</h3>

                            <input
                                type="text"
                                placeholder="Cari spesialis..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="modal-body">
                                {filteredSpesialis.map(item => (
                                    <div
                                        key={item.id}
                                        className="modal-item"
                                        onClick={() => {
                                            setNamaSpesialis(item.nama_spesialis);
                                            setIdSpesialis(item.id);
                                            setShowModalSpesialis(false);
                                            setSearch("");
                                        }}
                                    >
                                        {item.nama_spesialis}
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <div className="modal-pagination">
                                    <button
                                        className="page-btn"
                                        disabled={pageSpesialis === 1}
                                        onClick={() => setPageSpesialis(pageSpesialis - 1)}
                                    >
                                        Prev
                                    </button>

                                    {[...Array(lastPageSpesialis)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${pageSpesialis === i + 1 ? "active" : ""}`}
                                            onClick={() => setPageSpesialis(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-btn"
                                        disabled={pageSpesialis === lastPageSpesialis}
                                        onClick={() => setPageSpesialis(pageSpesialis + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                                <button className="btn-tutup" onClick={() => setShowModalSpesialis(false)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}

export default Dokter;