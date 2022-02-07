import React from 'react'
import { InputText } from 'primereact/inputtext'
import styled from 'styled-components'

const AdminEmailField = ({ email, emailHandler }) => {
    return (
        <AdminEmailStyled>
            <div className='p-d-flex'>
                <InputText
                    className='p-inputtext-lg p-d-block'
                    placeholder='* email'
                    required={true}
                    value={email}
                    onChange={(e) => emailHandler(e.target.value)}
                />
            </div>
        </AdminEmailStyled>
    )
}

export default AdminEmailField

const AdminEmailStyled = styled.div``
