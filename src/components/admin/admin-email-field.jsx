import React, { useState } from 'react';
import styled from 'styled-components';
import '../../static/css-files/form-styles.css';
import { InputText } from 'primereact/inputtext';
import { adminEmailValidation } from '../../utils/dataValidation';

function AdminEmailField({ email, emailHandler, isDisabled }) {
  const emailMaxLength = 35;
  const [isInvalid, setIsInvalid] = useState(false);

  const inputvalidation = (newValue) => {
    const res = adminEmailValidation(newValue);
    res.result ? setIsInvalid(false) : setIsInvalid(true);
    emailHandler(newValue);
  };

  return (
    <AdminEmailStyled>
      <span className="p-float-label">
        <InputText
          type="email"
          maxLength={emailMaxLength}
          disabled={isDisabled}
          autoComplete="off"
          value={email}
          onChange={(e) => inputvalidation(e.target.value)}
          id="adminEmailInput"
          className={`admin-email-input ${isInvalid ? 'invalid' : ''} ${isDisabled ? 'disabled' : ''} `}
        />
        <label htmlFor="phoneNr">E-mail aadress</label>
      </span>
    </AdminEmailStyled>
  );
}

export default AdminEmailField;

const AdminEmailStyled = styled.div``;
