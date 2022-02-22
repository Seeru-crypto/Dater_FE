import React from 'react'
import styled from 'styled-components'
import "../../static/css-files/form-styles.css"

const AdminSmsField = ({value, handleValue, disable}) => {

    return (
        <AdminSmsFieldStyle>
            <label htmlFor="phone">Enter phone nr:</label>
            <input placeholder="123456789" disabled={true} type="tel" id="sms-number" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
        </AdminSmsFieldStyle>
    )
}

export default AdminSmsField;

const AdminSmsFieldStyle = styled.div`
  width: 10rem;
  .sms-number::placeholder{
    color:gray;
  }
`