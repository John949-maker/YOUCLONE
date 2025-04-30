// src/Components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

import menu_icon from '../../assets/menu.png';
import YouTube from '../../assets/youtube-icon.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import i18n from '../../i18n';

const Navbar = ({ setSidebar, setDarkMode, darkMode }) => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
      .then(() => console.log('Language changed to', lng))
      .catch((err) => console.error('Language change error:', err));
  };

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="Menu" />
        <Link className='logo-link' to="/">
          <img className="logo" src={YouTube} alt="Logo" />
          <span style={{color: darkMode ? "white" : 'black'}}>YouTube</span>
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder={t('search')} />
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More Options" />
        <img src={notification_icon} alt="Notifications" />
        <img src={profile_icon} className='user-icon' alt="Profile" />

        <div className="language-buttons">
          <button className='language-button active' onClick={() => changeLanguage('uz')}>O'zbekcha</button>
          <button className='language-button' onClick={() => changeLanguage('en')}>English</button>
        </div>

        <button className="dark-mode-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <span className='material-icons icon'>☀️ Light</span> : <span className='label'>🌙 Dark</span>}
        </button>


      </div>
    </nav>
  );
};

export default Navbar;
