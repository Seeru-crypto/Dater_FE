import styled from 'styled-components';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';

function AdminSmsCb({ isSmsActive, handleSmsActive, toolTipMessage }) {
  return (
    <AdminSmsCbStyle>
      <div className="p-field-checkbox">
        <Checkbox
          className="p-d-block"
          disabled
          inputId="sendSms"
          value={isSmsActive}
          onChange={() => handleSmsActive(!isSmsActive)}
          checked={isSmsActive}
        />
        <label className="p-d-block" htmlFor="sendSms">
          Enable email reminders?
          <span>
            <Tooltip target=".pi-info-circle" />
            <i className="pi pi-info-circle admin-reminder-icon" data-pr-tooltip={toolTipMessage} />
          </span>
        </label>
      </div>
    </AdminSmsCbStyle>
  );
}

export default AdminSmsCb;

const AdminSmsCbStyle = styled.div`
  .pi-info-circle {
    color: var(--text);
  }

  .admin-reminder-icon {
    padding-left: 0.5rem;
  }
`;
