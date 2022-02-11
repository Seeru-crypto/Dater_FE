import React from 'react'
import styled from 'styled-components'
import "../form-fields/form-styles.css"

const AdminEmailField = ({ email, emailHandler, isDisabled }) => {
    return (
        <AdminEmailStyled>
                <input type='email' disabled={isDisabled} placeholder="email@email.com" autoComplete='off' required value={email} onChange={(e) => emailHandler(e.target.value)}
                       id='adminEmailInput' className='admin-email-input' />
        </AdminEmailStyled>
    )
}

export default AdminEmailField

const AdminEmailStyled = styled.div`
    .admin-email-input::placeholder{
      color:var(--text);
    }
`