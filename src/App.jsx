import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Dashboard from "./pages/dokter/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  )
}

export default App
