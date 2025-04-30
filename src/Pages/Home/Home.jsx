import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'


const Home = ({ sidebar, setDarkMode, darkMode }) => {

  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div style={{ color: darkMode ? "white" : "black", background: darkMode ? "black" : "white" }} className={`container ${sidebar ? "" : 'large-container'}`}>
        <Feed setDarkMode={setDarkMode} darkMode={darkMode} category={category} />
      </div>
    </>
  )
}

export default Home
