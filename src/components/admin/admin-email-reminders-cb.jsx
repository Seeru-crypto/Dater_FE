import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';

function AdminEmailRemindersCb({ emailReminder, emailReminderHandler, toolTipMessage }) {
  return (
    <AdminEmailReminderStyle>
      <div className="p-field-checkbox">
        <Checkbox
          className="p-d-block"
          inputId="accountForYear"
          id="accountForYear"
          value={emailReminder}
          onChange={() => emailReminderHandler(!emailReminder)}
          checked={emailReminder}
        />
        <label className="p-d-block" htmlFor="accountForYear">
          Enable email reminders?
          <span>
            <Tooltip target=".pi-info-circle" />
            <i
              className="pi pi-info-circle admin-reminder-icon"
              data-pr-tooltip={toolTipMessage}
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            />
          </span>
        </label>
      </div>
    </AdminEmailReminderStyle>
  );
}

export default AdminEmailRemindersCb;

const AdminEmailReminderStyle = styled.div`
  .pi-info-circle {
    color: var(--text);
  }

  .admin-reminder-icon {
    padding-left: 0.5rem;
  }
`;
