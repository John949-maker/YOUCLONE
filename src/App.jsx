import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {

  const [sidebar, setSidebar] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);
  return (
    <div className='bg-black'>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video darkMode={darkMode} />} />
      </Routes>
    </div>

  )
}

export default App
