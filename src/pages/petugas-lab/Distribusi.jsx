import { useState, useEffect } from "react";
import api from "../../services/api";
import Nav from "../../components/Nav";

function Distribusi() {

    const [permintaan, setPermintaan] = useState([]);
    const [user, setUser] = useState({});
    const [laporan, setLaporan] = useState({});

    const [selectPermintaan, setSelectPermintaan] = useState(null);
    const [idPermintaan, setIdPermintaan] = useState("");
    const [tanggalKirim, setTanggalKirim] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [kirim, setKirim] = useState(false);
    const [metodePengiriman, setMetodePengiriman] = useState("");

    const fetchData = async () => {
        try {

            const resPermintaan = await api.get("/permintaan");
            const resUser = await api.get("/user");
            const resLaporan = await api.get("/laporan");

            setPermintaan(resPermintaan.data?.data?.data || []);
            setUser(resUser.data || {});
            setLaporan(resLaporan.data || {});

        } catch (error) {
            console.log("Error fetch :", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectPermintaan = (item) => {
        setSelectPermintaan(item);
        setIdPermintaan(item.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idPermintaan) {
            alert("Pilih permintaan terlebih dahulu");
            return;
        }
        try {

            const data = {
                id_permintaan: idPermintaan,
                tanggal_kirim: tanggalKirim,
                kirim_ke_pasien: kirim ===  "true",
                metode_pengiriman: metodePengiriman,
            };

            await api.post("/distribusi", data);

            alert("Distribusi berhasil");

            setSelectPermintaan(null);
            setIdPermintaan("");
            setKirim("");
            setMetodePengiriman("");
            fetchData();
        } catch (error) {
            console.log("Error distribusi", error);
            alert("Gagal menyimpan distribusi");
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
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    Permintaan Selesai
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="req-table">
                                    <thead>
                                        <tr>
                                            <th>No Perm</th>
                                            <th>Pasien</th>
                                            <th>Dokter</th>
                                            <th>Jenis</th>
                                            <th>Tanggal</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permintaan
                                            .filter(p => p.status_pemeriksaan === "selesai")
                                            .map((item) => (
                                                <tr
                                                    key={item.id}
                                                    onClick={() => handleSelectPermintaan(item)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <td>{item.no_permintaan}</td>
                                                    <td>{item?.pasien?.nama_pasien}</td>
                                                    <td>{item?.dokter?.user?.name}</td>
                                                    <td>
                                                        {item.jenis_pemeriksaan?.nama_jenis}
                                                    </td>
                                                    <td>{item.tanggal_permintaan}</td>
                                                    <td>{item.status_pemeriksaan}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="container-form">
                        <div>
                            <h2>Distribusi Hasil</h2>
                            {selectPermintaan && (
                                <div className="info-permintaan">
                                    <h3>Permintaan Dipilih</h3>
                                    <p>Pasien : {selectPermintaan?.pasien?.nama_pasien}</p>
                                    <p>Dokter : {selectPermintaan?.dokter?.user?.name}</p>
                                    <p>Jenis : {selectPermintaan?.jenis_pemeriksaan?.nama_jenis}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "10px" }} className="form">
                                    <label>Tanggal Kirim</label>
                                    <input
                                        type="date"
                                        value={tanggalKirim}
                                        onChange={(e) => setTanggalKirim(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "10px" }} className="form">
                                    <label>Kirim ke Pasien</label>
                                    <select
                                        value={kirim}
                                        onChange={(e) => setKirim(e.target.value)} 
                                        required
                                    >
                                        <option value="">Pilih</option>
                                        <option value="true">Ya</option>
                                        <option value="false">Tidak</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: "10px" }} className="form">
                                    <label>Metode Pengiriman</label>
                                    <select
                                        value={metodePengiriman}
                                        onChange={(e) => setMetodePengiriman(e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Metode</option>
                                        <option value="pdf">PDF</option>
                                        <option value="cetak">Cetak</option>
                                        <option value="telegram">Telegram</option>
                                    </select>
                                </div>
                                <button type="submit" className="bttn">
                                    Simpan Distribusi
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Distribusi;