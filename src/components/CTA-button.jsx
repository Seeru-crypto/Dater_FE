import React from 'react'
import styled from 'styled-components'

const CTAButton = ({ onClickHandler }) => {
    return (
        <CtaStyle>
        <input className="main-cta-button" formNoValidate={true} type='submit' onClick={(e) => onClickHandler(e)} value='Add Event' />
        </CtaStyle>
            )
}
export default CTAButton;

const CtaStyle = styled.div`
  display:flex;
`