import styled from 'styled-components'
import React from 'react'

// ToDo change anchors into butoons with anchorm like styling
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
  padding-top: 1rem;
  .active {
    color: var(--text);
  }
`

export default NavButton