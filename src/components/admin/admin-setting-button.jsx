import styled from "styled-components";
import React from "react";

const AdminSettingButton = ({text, submitHandle}) => {

    return (
        <AdminSettingButtonStyle>
            <button
                className="admin-submit-btn"
                onClick={() => submitHandle()}>{text}</button>
        </AdminSettingButtonStyle>
    )
}

export default AdminSettingButton;

const AdminSettingButtonStyle = styled.div`
  .admin-submit-btn {
    padding: .5rem;
    border-radius: .5rem;
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

`