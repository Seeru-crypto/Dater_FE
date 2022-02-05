import styled from 'styled-components'
import React from 'react'

const NavButton = ({ text, url, active }) => {
    return (
        <NavButtonStyle>
            <a className={active ? 'active' : ''} id={text} title={text} href='#' onClick={(e) => {
                url(e)
                return false
            }}>
                {text}
            </a>
        </NavButtonStyle>
    )
}

const NavButtonStyle = styled.div`
  .active {
    color: #094067;
  }
`

export default NavButton