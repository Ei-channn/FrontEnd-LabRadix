import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
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

function App() {
  return (
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
    </Routes>
  )
}

export default App
