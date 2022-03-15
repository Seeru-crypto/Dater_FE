import styled from 'styled-components';
import React from 'react';

function NavButton({ text, url, active }) {
  return (
    <NavButtonStyle>
      <button
        type="submit"
        className={`${active ? 'active' : ''} nav-button`}
        id={text}
        title={text}
        onClick={(e) => {
          url(e);
          return false;
        }}
      >
        {text}
      </button>
    </NavButtonStyle>
  );
}

const NavButtonStyle = styled.div`
  padding-top: 1rem;
  .nav-button {
    background-color: transparent;
    border: transparent;
    color: var(--nav-text-color);
    text-align: center;
    display: inline-block;
    font-size: 1.2rem;
    margin: 10px 30px;
    cursor: pointer;
  }

  .active {
    border-radius: 0.5rem;
    padding: 0.25rem 0.4rem;
    background-color: var(--details-bkg);
    color: var(--git-icon);
  }
`;

export default NavButton;
