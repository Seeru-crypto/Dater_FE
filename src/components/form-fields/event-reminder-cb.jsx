import React, {memo} from 'react'
import { Checkbox } from 'primereact/checkbox'
import config from '../../config.json'
import styled from 'styled-components'
import './form-styles.css'

const EventReminder = ({ reminder, reminderHandler }) => {

    return (
        <CheckBoxStyle>
            <Checkbox
                inputId='reminderCheckbox'
                onChange={() => reminderHandler(!reminder)}
                checked={reminder}
            />
            <label htmlFor='reminderCheckbox'>
                {config.LABELS.REMINDER_LABEL}
            </label>
        </CheckBoxStyle>
    )
}
export default memo (EventReminder);

const CheckBoxStyle = styled.div`
  margin-top: -1.5rem;
  display: flex;

  label {
    padding-left: 0.5rem;
    color: var(--text);
  }
`