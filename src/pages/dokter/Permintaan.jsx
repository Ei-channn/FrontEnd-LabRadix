import Nav from "../../components/Nav";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Permintaan() {

    const [laporan, setLaporan] = useState({});
    const [permintaan, setPermintaan] = useState([]);
    const [user, setUser] = useState({});
    const [totalPermintaan, setTotalPermintaan] = useState(0);
    const [jenis, setJenis] = useState([]);
    const [pasien, setPasien] = useState([]);

    const [showModalPasien, setShowModalPasien] = useState(false);
    const [showModalJenis, setShowModalJenis] = useState(false);
    const [namaJenisInput, setNamaJenisInput] = useState("");
    const [search, setSearch] = useState("");
    const [pagePasien, setPagePasien] = useState(1);
    const [lastPagePasien, setLastPagePasien] = useState(1);
    const [pageJenis, setPageJenis] = useState(1);
    const [lastPageJenis, setLastPageJenis] = useState(1);

    const [namaPasienInput, setNamaPasienInput] = useState("");
    const [idPasien, setIdPasien] = useState("");              
    const [idJenis, setIdJenis] = useState("");
    const [tanggalPermintaan, setTanggalPermintaan] = useState(new Date().toISOString().split('T')[0]);
    const [statusPemeriksaan, setStatusPemeriksaan] = useState("antri");
    const [editId, setEditId] = useState(null);

    const fetchData = async (pageP = 1, pageJ = 1, keyword = "") => {
        try {
            const [
                resPermintaan,
                resPasien,
                resStatistik,
                resUser,
                resLaporan,
                resJenis,
            ] = await Promise.all([
                api.get("/permintaan"),
                api.get(`/pasien?page=${pageP}&search=${keyword}`),
                api.get("/statistik"),
                api.get("/user"),
                api.get("/laporan"),
                api.get(`/jenis?page=${pageJ}`),
            ]);
            
            setPermintaan(resPermintaan.data?.data?.data ?? []);
            setPasien(resPasien.data?.data?.data ?? []);
            setTotalPermintaan(resStatistik.data?.data?.total_permintaan ?? 0);
            setUser(resUser?.data ?? {});
            setLaporan(resLaporan?.data ?? {});
            setJenis(resJenis.data?.data?.data ?? []);
            setLastPagePasien(resPasien.data?.data?.last_page ?? 1);
            setLastPageJenis(resJenis.data?.data?.last_page ?? 1);

        } catch (error) {
            console.error("Error fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData(pagePasien, pageJenis, search);
    }, [pagePasien, pageJenis, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idPasien) {
            alert("Silakan pilih Nama Pasien!");
            return;
        }

        try {
            const data = {
                id_pasien: idPasien,
                id_jenis: idJenis,
                tanggal_permintaan: tanggalPermintaan,
                status_pemeriksaan: statusPemeriksaan,
            };

            await api.post("/permintaan", data);

            setNamaPasienInput("");
            setIdPasien("");
            setIdJenis("");
            setTanggalPermintaan(new Date().toISOString().split('T')[0]);
            setStatusPemeriksaan("antri");

            fetchData(pagePasien, pageJenis, search);

            alert("Data berhasil disimpan!");
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
                </div>

                <div className="container-main">
                    <div className="container-permintaan">

                        <div className="grid-5">
                            <div className="stat-card c1">
                                <div className="stat-value">{laporan.permintaan_harian || '0'}</div>
                                <div className="stat-label">Permintaan Harian</div>
                            </div>
                            <div className="stat-card c2">
                                <div className="stat-value">{totalPermintaan || '0'}</div>
                                <div className="stat-label">Total Permintaan</div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <span className="card-title-dot"></span>
                                        Permintaan Aktif
                                    </div> 
                                </div>

                                <div className="card-body" style={{padding: '11px 0 8px'}}>
                                    <table className="req-table">
                                        <thead>
                                            <tr>
                                                <th>Pasien</th>
                                                <th>Kategori</th>
                                                <th>Jenis Pemeriksaan</th>
                                                <th>Tanggal</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {permintaan
                                                .filter(u => u.status_pemeriksaan !== "arsip")
                                                .map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.pasien?.nama_pasien}</td>
                                                    <td>
                                                        <span className={`type-badge type-${item.jenis_pemeriksaan?.kategori}`}>
                                                            {item.jenis_pemeriksaan?.kategori}
                                                        </span>
                                                    </td>
                                                    <td>{item.jenis_pemeriksaan?.nama_jenis}</td>
                                                    <td>{item.tanggal_permintaan}</td>
                                                    <td>
                                                        <span className={`status-badge status-${item.status_pemeriksaan}`}>
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
                        <h3>Form Permintaan Pemeriksaan</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form">
                                <label>Nama Pasien:</label>
                                <input 
                                    type="text"
                                    value={namaPasienInput}
                                    onClick={() => setShowModalPasien(true)}
                                    placeholder="pilih pasien..."
                                    readOnly
                                    required
                                />
                            </div>

                            <div className="form">
                                <label>Jenis Pemeriksaan:</label>
                                <input 
                                    type="text"
                                    value={namaJenisInput}
                                    onClick={() => setShowModalJenis(true)}
                                    placeholder="pilih jenis..."
                                    readOnly
                                    required
                                />             
                            </div>

                            <div className="form">
                                <label>Tanggal:</label>
                                <input type="date" value={tanggalPermintaan} onChange={(e) => setTanggalPermintaan(e.target.value)} />
                            </div>

                            <div className="form">
                                <label>Status:</label>
                                <select value={statusPemeriksaan} onChange={(e) => setStatusPemeriksaan(e.target.value)}>
                                    <option value="antri">Antri</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                            </div>

                            <button className="bttn">Simpan Data</button>
                        </form>
                    </div>
                </div>

                {showModalPasien && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Pilih Pasien</h3>

                            <input
                                type="text"
                                placeholder="Cari pasien..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPagePasien(1);
                                }}
                            />

                            <div className="modal-body">
                                {pasien.map(item => (
                                    <div
                                        key={item.id}
                                        className="modal-item"
                                        onClick={() => {
                                            setNamaPasienInput(item.nama_pasien);
                                            setIdPasien(item.id);
                                            setShowModalPasien(false);
                                        }}
                                    >
                                        {item.nama_pasien}
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <div className="modal-pagination">
                                    <button
                                        className="page-btn"
                                        disabled={pagePasien === 1}
                                        onClick={() => setPagePasien(pagePasien - 1)}
                                    >
                                        Prev
                                    </button>

                                    {[...Array(lastPagePasien)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${pagePasien === i + 1 ? "active" : ""}`}
                                            onClick={() => setPagePasien(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-btn"
                                        disabled={pagePasien === lastPagePasien}
                                        onClick={() => setPagePasien(pagePasien + 1)}
                                    >
                                        Next
                                    </button>
                                </div>

                                <button className="btn-tutup" onClick={() => setShowModalPasien(false)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}
                {showModalJenis && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Pilih Jenis Pemeriksaan</h3>

                            <input
                                type="text"
                                placeholder="Cari jenis..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPageJenis(1);
                                }}
                            />

                            <div className="modal-body">
                                {jenis.length > 0 ? (
                                    jenis.map(item => (
                                        <div
                                            key={item.id}
                                            className="modal-item"
                                            onClick={() => {
                                                setNamaJenisInput(item.nama_jenis);
                                                setIdJenis(item.id);
                                                setShowModalJenis(false);
                                                setSearch("");
                                            }}
                                        >
                                            {item.nama_jenis}
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: "12px" }}>Tidak ditemukan</p>
                                )}
                            </div>

                            <div className="modal-footer">
                                <div className="modal-pagination">
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

                                <button className="btn-tutup" onClick={() => setShowModalJenis(false)}>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Permintaan;