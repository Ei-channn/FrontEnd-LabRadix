function Main() {
    return (
        <div>
            <main className="main">
                <div className="topbar">
                    <div className="page-title">
                        <span>Sistem Informasi</span>
                        Dashboard Utama
                    </div>
                    <div className="topbar-right">
                        <button className="topbar-btn">📅 Hari Ini — 13 Mar 2026</button>
                        <button className="topbar-btn">🔔 Notifikasi</button>
                        <button className="topbar-btn primary">＋ Permintaan Baru</button>
                    </div>
                </div>

                <div className="stats-row">
                    <div className="stat-card c1">
                        <div className="stat-icon">🧾</div>
                        <div className="stat-value">147</div>
                        <div className="stat-label">Total Permintaan</div>
                        <div className="stat-delta">↑ +18 dari kemarin</div>
                    </div>
                    <div className="stat-card c2">
                        <div className="stat-icon">🧪</div>
                        <div className="stat-value">98</div>
                        <div className="stat-label">Pemeriksaan Lab</div>
                        <div className="stat-delta">↑ +11 dari kemarin</div>
                    </div>
                    <div className="stat-card c3">
                        <div className="stat-icon">📡</div>
                        <div className="stat-value">49</div>
                        <div className="stat-label">Pemeriksaan Radiologi</div>
                        <div className="stat-delta">↑ +7 dari kemarin</div>
                    </div>
                    <div className="stat-card c4">
                        <div className="stat-icon">🚨</div>
                        <div className="stat-value">3</div>
                        <div className="stat-label">Nilai Kritis</div>
                        <div className="stat-delta down">⚠ Perlu tindakan segera</div>
                    </div>
                </div>
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <span className="card-title-dot"></span>
                                Permintaan Aktif
                            </div>
                            <span className="card-action">Lihat Semua</span>
                        </div>
                        <div className="card-body" style={{padding: '11px 0 8px'}}>
                            <table className="req-table">
                                <thead>
                                    <tr>
                                        <th>Pasien</th>
                                        <th>Jenis</th>
                                        <th>Pemeriksaan</th>
                                        <th>Dokter</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="patient-info">
                                            <span className="patient-name">Ahmad Fauzi</span>
                                            <span className="patient-id">#LAB-2026-0341</span>
                                            </div>
                                        </td>
                                        <td><span className="type-badge type-lab">🧪 Lab</span></td>
                                        <td style={{fontSize: "11px"}}>Darah Lengkap, HBA1C</td>
                                        <td style={{fontSize: "11px", color: '#8fa3bd'}}>dr. Sinta</td>
                                        <td><span className="status-badge status-proses"><span className="status-dot"></span>Proses</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="patient-info">
                                            <span className="patient-name">Siti Marlina</span>
                                            <span className="patient-id">#RAD-2026-0112</span>
                                            </div>
                                        </td>
                                        <td><span className="type-badge type-rad">📡 Radiologi</span></td>
                                        <td style={{fontSize: "11px"}}>Rontgen Thorax AP</td>
                                        <td style={{fontSize: "11px", color: '#8fa3bd'}}>dr. Hendra</td>
                                        <td><span className="status-badge status-antri"><span className="status-dot"></span>Antri</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="patient-info">
                                            <span className="patient-name">Budi Santoso</span>
                                            <span className="patient-id">#LAB-2026-0339</span>
                                            </div>
                                        </td>
                                        <td><span className="type-badge type-lab">🧪 Lab</span></td>
                                        <td style={{fontSize: "11px"}}>Fungsi Ginjal, Elektrolit</td>
                                        <td style={{fontSize: "11px", color: '#8fa3bd'}}>dr. Rina</td>
                                        <td><span className="status-badge status-selesai"><span className="status-dot"></span>Selesai</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="patient-info">
                                            <span className="patient-name">Dewi Rahayu</span>
                                            <span className="patient-id">#RAD-2026-0110</span>
                                            </div>
                                        </td>
                                        <td><span className="type-badge type-rad">📡 Radiologi</span></td>
                                        <td style={{fontSize: "11px"}}>CT Scan Kepala</td>
                                        <td style={{fontSize: "11px", color: '#8fa3bd'}}>dr. Agus</td>
                                        <td><span className="status-badge status-selesai"><span className="status-dot"></span>Selesai</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="patient-info">
                                            <span className="patient-name">Joko Prabowo</span>
                                            <span className="patient-id">#LAB-2026-0345</span>
                                            </div>
                                        </td>
                                        <td><span className="type-badge type-lab">🧪 Lab</span></td>
                                        <td style={{fontSize: "11px"}}>Kultur Darah</td>
                                        <td style={{fontSize: "11px", color: '#8fa3bd'}}>dr. Sinta</td>
                                        <td><span className="status-badge status-antri"><span className="status-dot"></span>Antri</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Status Pemeriksaan</div>
                        </div>
                        <div className="card-body">
                            <div className="status-stack">
                                <div className="status-item">
                                    <div className="status-item-icon si-antri">⏳</div>
                                    <div className="status-item-info">
                                    <div className="status-item-label">Antri</div>
                                    <div className="status-item-sub">Menunggu diproses</div>
                                    </div>
                                    <div className="status-item-count" style={{color: '#f59e0b'}}>24</div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon si-proses">⚙️</div>
                                    <div className="status-item-info">
                                    <div className="status-item-label">Diproses</div>
                                    <div className="status-item-sub">Sedang berjalan</div>
                                    </div>
                                    <div className="status-item-count" style={{color: '#9d7de8'}}>18</div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon si-selesai">✅</div>
                                    <div className="status-item-info">
                                    <div className="status-item-label">Selesai</div>
                                    <div className="status-item-sub">Siap distribusi</div>
                                    </div>
                                    <div className="status-item-count" style={{color: '#10b981'}}>105</div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon si-kritis">🚨</div>
                                    <div className="status-item-info">
                                    <div className="status-item-label">Nilai Kritis</div>
                                    <div className="status-item-sub">Perlu tindakan</div>
                                    </div>
                                    <div className="status-item-count" style={{color: '#f43f5e'}}>3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-3">
                    <div className="card" style={{animationDelay: "0.35s;"}}>
                        <div className="card-header">
                            <div className="card-title">Volume Harian</div>
                            <span className="card-action">7 Hari</span>
                        </div>
                        <div className="card-body">
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-dot" style={{background: "#2ec4b6"}}></div> Lab
                                </div>
                                <div className="legend-item">
                                    <div className="legend-dot" style={{background: "#9d7de8"}}></div> Radiologi
                                </div>
                            </div>
                            <div className="chart-wrap">
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="72" style={{height:"72%"}}></div>
                                    <div className="bar bar-rad" data-val="35" style={{height:"35%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="85" style={{height:"85%"}}></div>
                                    <div className="bar bar-rad" data-val="42" style={{height:"42%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="60" style={{height:"60%"}}></div>
                                    <div className="bar bar-rad" data-val="30" style={{height:"30%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="90" style={{height:"90%"}}></div>
                                    <div className="bar bar-rad" data-val="48" style={{height:"48%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="78" style={{height:"78%"}}></div>
                                    <div className="bar bar-rad" data-val="39" style={{height:"39%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="95" style={{height:"95%"}}></div>
                                    <div className="bar bar-rad" data-val="52" style={{height:"52%"}}></div>
                                </div>
                                <div className="bar-group">
                                    <div className="bar bar-lab" data-val="98" style={{height:"98%"}}></div>
                                    <div className="bar bar-rad" data-val="49" style={{height:"49%"}}></div>
                                </div>
                            </div>
                            <div className="chart-labels">
                                <div className="chart-label-item">Sen</div>
                                <div className="chart-label-item">Sel</div>
                                <div className="chart-label-item">Rab</div>
                                <div className="chart-label-item">Kam</div>
                                <div className="chart-label-item">Jum</div>
                                <div className="chart-label-item">Sab</div>
                                <div className="chart-label-item">Min</div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{animationDelay: "0.4s;"}}>
                        <div className="card-header">
                            <div className="card-title">
                                <span style={{color: "#f43f5e"}}>⚠</span> Flagging Nilai
                            </div>
                            <span className="card-action">Lihat Detail</span>
                        </div>
                        <div className="card-body">
                            <div className="flag-list">
                                <div className="flag-item">
                                    <div className="flag-alert">🔴</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Ahmad Fauzi · HbA1C</div>
                                        <div className="flag-detail">Normal: &lt;5.7% | Pasien: 12.4%</div>
                                    </div>
                                    <div className="flag-value flag-kritis">KRITIS</div>
                                </div>
                                <div className="flag-item">
                                    <div className="flag-alert">🟡</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Ani Wijaya · Kreatinin</div>
                                        <div className="flag-detail">Normal: 0.5–1.2 | Pasien: 2.8</div>
                                    </div>
                                    <div className="flag-value flag-abnormal">TINGGI</div>
                                </div>
                                <div className="flag-item">
                                    <div className="flag-alert">🔴</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Rudi H. · Kalium</div>
                                        <div className="flag-detail">Normal: 3.5–5.0 | Pasien: 6.8</div>
                                    </div>
                                    <div className="flag-value flag-kritis">KRITIS</div>
                                </div>
                                <div className="flag-item">
                                    <div className="flag-alert">🟡</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Maya S. · WBC</div>
                                        <div className="flag-detail">Normal: 4.5–11 | Pasien: 14.2</div>
                                    </div>
                                    <div className="flag-value flag-abnormal">TINGGI</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{animationDelay: "0.45s;"}}>
                        <div className="card-header">
                            <div className="card-title">Distribusi Hasil</div>
                            <span className="card-action">Kirim Semua</span>
                        </div>
                        <div className="card-body">
                            <div className="flag-list">
                                <div className="flag-item" style={{borderColor: "rgba(46,196,182,0.15)"}}>
                                    <div className="flag-alert" style={{background: "rgba(46,196,182,0.1)"}}>📤</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Budi Santoso</div>
                                        <div className="flag-detail">Fungsi Ginjal → dr. Rina</div>
                                    </div>
                                    <div className="flag-value" style={{color: "#2ec4b6", fontSize: "10px"}}>Terkirim</div>
                                </div>
                                <div className="flag-item" style={{borderColor: "rgba(46,196,182,0.15)"}}>
                                    <div className="flag-alert" style={{background: "rgba(46,196,182,0.1)"}}>📤</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Dewi Rahayu</div>
                                        <div className="flag-detail">CT Scan → dr. Agus</div>
                                    </div>
                                    <div className="flag-value" style={{color: "#2ec4b6", fontSize: "10px"}}>Terkirim</div>
                                </div>
                                <div className="flag-item" style={{borderColor: "rgba(46,196,182,0.15)"}}>
                                    <div className="flag-alert" style={{background: "rgba(46,196,182,0.1)"}}>📋</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Ahmad Fauzi</div>
                                        <div className="flag-detail">Darah Lengkap → dr. Sinta</div>
                                    </div>
                                    <div className="flag-value" style={{color: "#f59e0b", fontSize: "10px"}}>Pending</div>
                                </div>
                                <div className="flag-item" style={{borderColor: "rgba(46,196,182,0.15)"}}>
                                    <div className="flag-alert" style={{background: "rgba(46,196,182,0.1)"}}>👤</div>
                                    <div className="flag-info">
                                        <div className="flag-name">Pasien Langsung</div>
                                        <div className="flag-detail">Hasil siap diambil: 8 item</div>
                                    </div>
                                    <div className="flag-value" style={{color: "#9d7de8", fontSize: "10px"}}>8 item</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main;