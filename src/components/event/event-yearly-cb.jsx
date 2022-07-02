import React, { memo } from 'react';
import { Checkbox } from 'primereact/checkbox';
import styled from 'styled-components';
import '../../static/css-files/form-styles.css';
import { Tooltip } from 'primereact/tooltip';
import config from '../../config.json';

function EventYearlyCb({ eventAccountForYear, changeHandler }) {
  const labels = config.LABELS;

  return (
    <CheckBoxStyle>
      <div className="p-field-checkbox">
        <Checkbox
          className="p-d-block"
          inputId="accountForYear"
          value="Account for year?"
          onChange={() => changeHandler(!eventAccountForYear)}
          checked={eventAccountForYear}
        />
        <span className="annual-label-grp">
          <label className="p-d-block label" htmlFor="accountForYear">
            {labels.ACCOUNT_FOR_YEAR_LABEL}
          </label>
          <Tooltip target=".pi-info-circle" />
          <i
            className="pi pi-info-circle"
            data-pr-tooltip={labels.ACCOUNT_FOR_YEAR_TOOLTIP}
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          />
        </span>
      </div>
    </CheckBoxStyle>
  );
}
export default memo(EventYearlyCb);

const CheckBoxStyle = styled.div`
  margin-top: -1.5rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;

  .label {
    padding-left: 0.5rem;
    color: var(--text);
  }

  .pi-info-circle {
    font-size: 1rem;
    padding-left: 0.5rem;
    color: var(--text);
  }

  .annual-label-grp {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (max-width: 960px) {
    align-items: center;
    justify-content: center;

    .annual-label-grp {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .p-field-checkbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;
