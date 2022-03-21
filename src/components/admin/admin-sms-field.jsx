import React, { useState } from 'react';
import styled from 'styled-components';
import '../../static/css-files/form-styles.css';
import { InputText } from 'primereact/inputtext';
import { adminSmsValidation } from '../../utils/dataValidation';

function AdminSmsField({ value, smsHandler, isDisabled }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const inputvalidation = (newValue) => {
    const res = adminSmsValidation(newValue);
    res.result ? setIsInvalid(false) : setIsInvalid(true);
    smsHandler(newValue);
  };

  return (
    <AdminSmsFieldStyle>
      <span className="p-float-label">
        <InputText
          id="phoneNr"
          disabled={isDisabled}
          className={`admin-sms-input ${isDisabled ? 'disabled' : ''} ${isInvalid ? 'invalid' : ''} `}
          autoComplete="off"
          value={value}
          onChange={(e) => {
            inputvalidation(e.target.value);
          }}
        />
        <label htmlFor="phoneNr">Phone number</label>
      </span>
    </AdminSmsFieldStyle>
  );
}

export default AdminSmsField;

const AdminSmsFieldStyle = styled.div`
  width: 10rem;
`;
