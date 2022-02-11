import React from 'react'
import './form-styles.css'
import styled from 'styled-components'

const FieldInvalidMsg = ({ errorMessage }) => {

    return (
        <ErrorMessageStyle>
            {errorMessage && <em>{errorMessage}</em>}
        </ErrorMessageStyle>
    )
}

export default FieldInvalidMsg

const ErrorMessageStyle = styled.div`
  font-size: 0.7rem;
  margin-right: 0.8rem;
  padding-top: 0.2rem;
  margin-bottom: -1.1rem;
  color: var(--paragraph);
  display: flex;
  justify-content: flex-end;
`