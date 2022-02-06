import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './header.css'
import config from '../../config.json'
import { useNavigate } from 'react-router-dom'
import NavButton from './nav-button'
import { useAppDispatch, useAppSelector } from '../../store'
import { setIsLightMode } from '../../slicers/adminSlice'

// ToDo vaheta ikoonid välja kohalike vastu

const PageHeader = () => {

    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [currentPage, setCurrentPage] = useState('home')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLightMode = useAppSelector((state) => state.admin.isLightMode)

    const navigateToUrl = (e, item) => {
        e.preventDefault()
        if (item.url) {
            navigate(item.url)
        }
        const currentUrl = window.location.href
        const urlLastPart = currentUrl.substr(currentUrl.lastIndexOf('/'))
        setCurrentPage(urlLastPart);
        toggleSidebar();
    }
    const [headerItems] = useState(config.headerItems)

    useEffect(() => {
        const value = sessionStorage.getItem(config.SESSION_STORAGE_LABEL) === 'true'
        dispatch(setIsLightMode(value))
    }, [])

    const changeTheme = () => {
        sessionStorage.setItem(config.SESSION_STORAGE_LABEL, !isLightMode)
        dispatch(setIsLightMode(!isLightMode))
    }

    const toggleSidebar = () => setSidebarToggle(!sidebarToggle)

    return (
        <PageHeaderStyle>
            <div className={`${isLightMode ? '' : 'dark'}`}>
                <nav className={`${sidebarToggle ? 'active' : ''}`}>
                    <div className='nav-bar'>
                        <i onClick={toggleSidebar} className='bx bx-menu sidebarOpen' />
                        <span className='logo navLogo'><a href='/'>Dater</a></span>

                        <div className='menu'>
                            <div className='logo-toggle'>
                                <span className='logo'><a href='/'>Dater</a></span>
                                <i onClick={toggleSidebar} className='bx bx-x siderbarClose' />
                            </div>

                            <ul className='nav-links'>
                                {headerItems.map((item) => {
                                    return (
                                        <li key={item.url}>
                                            <NavButton url={(e) => navigateToUrl(e, item)} text={item.label}
                                                       active={item.url === currentPage} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className='darkLight-searchBox'>
                            <div className='dark-light'>
                                <i onClick={changeTheme} className={`bx bx-sun sun ${isLightMode ? 'active' : ''} `} />
                                <i onClick={changeTheme}
                                   className={`bx bx-moon moon ${!isLightMode ? 'active' : ''}`} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </PageHeaderStyle>
    )
}
export default PageHeader

const PageHeaderStyle = styled.div`
  margin-bottom: 70px;

  .dark-light {
    display: flex;
    align-items: center;
  }

`
