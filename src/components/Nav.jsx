function Nav() {
    return (
        <div className="side">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">🔬</div>
                    <div className="logo-name">LabRadix</div>
                    <div className="logo-sub">Lab & Radiologi</div>
                </div>

                <nav className="nav-section">
                    <div className="nav-label">Menu Utama</div>
                    <a className="nav-item" href="#">Dashboard</a>
                    <a className="nav-item" href="#">Permintaan</a>
                    <a className="nav-item" href="#">Laboratorium</a>
                    <a className="nav-item" href="#">Radiologi</a>

                    <div className="nav-label">Hasil & Laporan</div>
                    <a className="nav-item" href="#">Input Hasil</a>
                    <a className="nav-item" href="#">Nilai Kritis</a>
                    <a className="nav-item" href="#">Distribusi</a>
                    <a className="nav-item" href="#">Arsip</a>

                    <div className="nav-label">Pengaturan</div>
                    <a className="nav-item" href="#">Settings</a>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-avatar">DR</div>
                    <div className="user-info">
                        <div className="user-name">dr. Rini A.</div>
                        <div className="user-role">Analis Lab</div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Nav;