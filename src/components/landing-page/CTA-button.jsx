import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function CTAButton({ onClickHandler }) {
  return (
    <CtaStyle>
      <motion.button whileHover={{ scale: 1.1 }} className="main-cta-button" type="submit" onClick={(e) => onClickHandler(e)}>
        Add Event
      </motion.button>
    </CtaStyle>
  );
}
export default CTAButton;

const CtaStyle = styled.div`
  .main-cta-button {
    transition: all 0.5s;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: var(--add-border);
    color: var(--text);
    font-size: 1.5rem;
    padding: 16px;
    width: 220px;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
    display: inline-block;
    position: relative;
  }

  .main-cta-button:after {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 14px;
    right: -20px;
    transition: 0.5s;
  }

  .main-cta-button:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  .main-cta-button:hover:after {
    opacity: 1;
    right: 10px;
  }
`;
