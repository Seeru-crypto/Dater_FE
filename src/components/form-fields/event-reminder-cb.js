import { Checkbox } from 'primereact/checkbox'
import React from 'react'
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
                {config.labels.reminderLabel}
            </label>
        </CheckBoxStyle>
    )
}
export default EventReminder

const CheckBoxStyle = styled.div`
  margin-top: -1.5rem;
  display: flex;

  label {
    padding-left: 0.5rem;
    color: var(--text);
  }
`