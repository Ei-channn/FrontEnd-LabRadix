import { useEffect, useState } from "react";
import api from "../../services/api";

function Spesialis() {

    const [spesialis, setSpesialis] = useState([]);
    const [totalSpesialis, setTotalSpesialis] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [user, setUser] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaSpesialis, setNamaSpesialis] = useState("");

    const fetchData = async (pageNum) => {
        try {
                const resSpesialis = await api.get(`/spesialis?page=${pageNum}`);
                
                setSpesialis(resSpesialis.data?.data?.data || []);
                setLastPage(resSpesialis.data?.data?.last_page);
                setTotalSpesialis(resSpesialis.data?.data?.total);
                
        } catch (error) {
            console.log("Error fetch spesialis:", error);
        }
    };
        
    useEffect(() => {
        fetchData([page]);
    }, [page]);

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
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await api.delete(`/spesialis/${id}`);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    };

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
                                        Data Spesialis
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
                    {totalSpesialis > 10 && (
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
                                    <label>Nama Spesialis :</label>
                                    <input 
                                        type="text" 
                                        value={namaSpesialis}
                                        onChange={(e) => setNamaSpesialis(e.target.value)}
                                        placeholder="Ketik nama Spesialis..."
                                        required
                                    /><hr />
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