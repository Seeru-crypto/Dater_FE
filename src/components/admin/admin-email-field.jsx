import React from 'react'
import styled from 'styled-components'
import "../../static/css-files/form-styles.css"

const AdminEmailField = ({ email, emailHandler, isDisabled }) => {
    return (
        <AdminEmailStyled>
                <input type='email' disabled={isDisabled} placeholder="email@email.com" autoComplete='off' required value={email} onChange={(e) => emailHandler(e.target.value)}
                       id='adminEmailInput' className={`admin-email-input ${isDisabled ? "disabled" : ""} `} />
        </AdminEmailStyled>
    )
}

export default AdminEmailField

const AdminEmailStyled = styled.div`
  .admin-email-input:disabled {
    background-color: gray;
  }
`
