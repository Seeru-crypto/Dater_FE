import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../static/css-files/header.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import config from '../../config.json';
import NavButton from '../../components/navbar/nav-button';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrentPage, setIsLightMode } from '../../slicers/adminSlice';

function Navbar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLightMode = useAppSelector((state) => state.admin.isLightMode);
  const currentPage = useAppSelector((state) => state.admin.currentPage);

  const navigateToUrl = (e, item) => {
    e.preventDefault();
    if (item.url) {
      navigate(item.url);
    }
    const currentUrl = window.location.href;
    const urlLastPart = currentUrl.substr(currentUrl.lastIndexOf('/'));
    dispatch(setCurrentPage(urlLastPart));
    toggleSidebar();
  };
  const [headerItems] = useState(config.headerItems);

  useEffect(() => {
    const value = sessionStorage.getItem(config.SESSION_STORAGE_LABEL) === 'true';
    dispatch(setIsLightMode(value));
  }, [dispatch]);

  const changeTheme = () => {
    sessionStorage.setItem(config.SESSION_STORAGE_LABEL, (!isLightMode).toString());
    dispatch(setIsLightMode(!isLightMode));
  };

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

  const linkAnimations = {
    type: 'spring',
    stiffness: 200,
  };

  return (
    <PageHeaderStyle>
      <div className={`${isLightMode ? '' : 'dark'}`}>
        <nav className={`${sidebarToggle ? 'active' : ''}`}>
          <div className="nav-bar">
            <i onClick={toggleSidebar} tabIndex={0} onKeyDown={toggleSidebar} aria-label="text" role="button" className="bx bx-menu sidebarOpen" />
            <span className="logo navLogo">Dater</span>
            <div className="menu">
              <div className="logo-toggle">
                <i tabIndex={0} onKeyDown={toggleSidebar} aria-label="text" role="button" onClick={toggleSidebar} className="bx bx-x siderbarClose" />
              </div>

              <ul className="nav-links">
                {headerItems.map((item) => {
                  return (
                    <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} transition={linkAnimations} key={item.url}>
                      <NavButton url={(e) => navigateToUrl(e, item)} text={item.label} active={item.url === currentPage} />
                    </motion.li>
                  );
                })}
                <li key="theme-btn">
                  <div className="dark-light">
                    <i
                      tabIndex={0}
                      aria-label="text"
                      onKeyDown={changeTheme}
                      role="button"
                      onClick={changeTheme}
                      className={`bx bx-sun sun ${isLightMode ? 'active' : ''} `}
                    />
                    <i
                      tabIndex={0}
                      aria-label="text"
                      onKeyDown={changeTheme}
                      role="button"
                      onClick={changeTheme}
                      className={`bx bx-moon moon ${!isLightMode ? 'active' : ''}`}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </PageHeaderStyle>
  );
}
export default Navbar;

const PageHeaderStyle = styled.div`
  margin-bottom: 70px;

  .bx-moon,
  .bx-sun {
    padding: 0.75rem;
    margin-top: -1rem;
  }

  .logo.navLogo {
    margin-bottom: -1.5rem;
  }

  @media (max-width: 790px) {
    .bx-sun {
      margin-top: 0;
      position: absolute;
    }

    .bx-moon {
      margin-top: 0;
    }
  }
`;
