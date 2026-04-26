import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Dashboard from "./pages/Dashboard";
import Permintaan from "./pages/dokter/Permintaan";
import Pasien from "./pages/admin/Pasien";
import JenisPemeriksaan from "./pages/admin//JenisPemeriksaan";
import Parameter from './pages/admin/Parameter';
import Spesialis from './pages/admin/Spesialis';
import Dokter from './pages/admin/dokter';
import Login from "./pages/Auth/login";
import User from './pages/admin/User';
import InputHasil from './pages/petugas-lab/inputHasil';
import Distribusi from './pages/petugas-lab/Distribusi';
import Nav from './components/Nav';
import Arsip from './pages/dokter/Arsip';

function App() {

  const location = useLocation(); 

  return (
    <>
      {location.pathname !== "/login" && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/permintaan" element={<Permintaan />}/>
        <Route path="/pasien" element={<Pasien />}/>
        <Route path="/jenis" element={<JenisPemeriksaan />}/>
        <Route path="/parameter" element={<Parameter />}/>
        <Route path="/spesialis" element={<Spesialis />}/>
        <Route path="/dokter" element={<Dokter />}/>
        <Route path="/users" element={<User />}/>
        <Route path="/input-hasil" element={<InputHasil />}/>
        <Route path="/distribusi" element={<Distribusi />}/>
        <Route path="/arsip" element={<Arsip />}/>
      </Routes>
    </>
  )
}

export default App
