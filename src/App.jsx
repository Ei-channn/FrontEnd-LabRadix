import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Dashboard from "./pages/dokter/Dashboard";
import Login from "./pages/Auth/login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  )
}

export default App
