import { useEffect, useState } from "react";
import api from "../../services/api";

function Parameter() {

    const [parameter, setParameter] = useState([]);
    const [totalParameter, setTotalParameter] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [pageJenis, setPageJenis] = useState(1);
    const [lastPageJenis, setLastPageJenis] = useState(1);
    const [jenis, setJenis] = useState([]);
    const [user, setUser] = useState([]);
    const [editId, setEditId] = useState(null); 

    const [namaParameter, setNamaParameter] = useState("");
    const [idJenis, setIdJenis] = useState("");
    const [namaJenis, setNamaJenis] = useState("");
    const [normalMin, setNormalMin] = useState("");
    const [normalMax, setNormalMax] = useState("");
    const [satuan, setSatuan] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    const fetchData = async (pageNum) => {
        try {
            const response = await api.get(`/parameter?page=${pageNum}`);
                
            setParameter(response.data?.data?.data || []);
            setLastPage(response.data?.data?.last_page);
            setTotalParameter(response.data?.data?.total);
                
        } catch (error) {
            console.log("Error fetch parameter:", error);
        }
    };
        
    useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchDataJenis = async (pageNum) => {
        try {
            const response = await api.get(`/jenis?page=${pageNum}`);

            setJenis(response.data?.data?.data || []);
            setLastPageJenis(response.data?.data?.last_page);
            
        } catch (error) {
            console.log("Error fetch jenis:", error);
        }
    };
    
    useEffect(() => {
        fetchDataJenis(pageJenis);
    }, [pageJenis]);

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
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await api.delete(`/parameter/${id}`);
                fetchParameters(page);
            } catch (error) {
                console.error("Delete error:", error);
            }
        }
    };

    const filteredJenis = jenis.filter(j =>
        j.nama_jenis.toLowerCase().includes(search.toLowerCase())
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
                                        Parameter Jenis Pemeriksaan
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
                        {totalParameter > 10 && (
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
                                        value={namaJenis}
                                        onClick={() => setShowModal(true)}
                                        onChange={handleNamaJenisChange}
                                        placeholder="Ketik nama Jenis P..."
                                        readOnly
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Normal Min :</label>
                                    <input 
                                        type="number" 
                                        value={normalMin}
                                        onChange={(e) => setNormalMin(e.target.value)}
                                        placeholder="0"
                                        required
                                        min="0"
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }} className="form">
                                    <label>Normal Max :</label>
                                    <input 
                                        type="number" 
                                        value={normalMax}
                                        onChange={(e) => setNormalMax(e.target.value)}
                                        placeholder="0"
                                        required
                                        min="0"
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
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Pilih Jenis</h3>

                            <input
                                type="text"
                                placeholder="Cari jenis..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="modal-body">
                                {filteredJenis.length > 0 ? (
                                    filteredJenis.map(item => (
                                        <div
                                            key={item.id}
                                            className="modal-item"
                                            onClick={() => {
                                                setNamaJenis(item.nama_jenis);
                                                setIdJenis(item.id);
                                                setShowModal(false);
                                                setSearch("");
                                            }}
                                        >
                                            {item.nama_jenis}
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                                        Tidak ditemukan
                                    </p>
                                )}
                            </div>

                            <div className="modal-footer">
                                <div className="modal-pagination" style={{ marginTop: "10px" }}>
                                    <button
                                        className="page-btn"
                                        disabled={pageJenis === 1}
                                        onClick={() => setPageJenis(pageJenis - 1)}
                                    >
                                        Prev
                                    </button>
                                    
                                    {[...Array(lastPageJenis)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${pageJenis === i + 1 ? "active" : ""}`}
                                            onClick={() => setPageJenis(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-btn"
                                        disabled={pageJenis === lastPageJenis}
                                        onClick={() => setPageJenis(pageJenis + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                                <button className="btn-tutup" onClick={() => setShowModal(false)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Parameter;