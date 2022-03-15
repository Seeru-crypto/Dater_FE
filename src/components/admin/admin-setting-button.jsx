import styled from 'styled-components';
import React from 'react';

function AdminSettingButton({ text, submitHandle }) {
  return (
    <AdminSettingButtonStyle>
      <button type="submit" className="admin-submit-btn" onClick={() => submitHandle()}>
        {text}
      </button>
    </AdminSettingButtonStyle>
  );
}

export default AdminSettingButton;

const AdminSettingButtonStyle = styled.div`
  .admin-submit-btn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: black 1px solid;
    background-color: transparent;
    color: var(--git-icon);
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
  }

  .admin-submit-btn:hover {
    transition: all 0.5s;
    cursor: pointer;
    background-color: var(--add-border);
    color: white;
  }
`;
