import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from './pages/home.tsx'
import YouTubeStudio from './pages/youtubeStudio.tsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/youtubestudio' element={<YouTubeStudio />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
