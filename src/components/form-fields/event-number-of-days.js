import React from 'react'
import './form-styles.css'
import config from '../../config.json'
import styled from 'styled-components'

const EventNumberOfDays = ({ eventReminderDays, changeHandler }) => {

    const inputValidation = (userInput) => {
        const input = document.getElementById('eventNumberOfDays')
        if (parseInt(userInput, 10) <= config.DAYS_NOTICE_MAX_VAL || userInput === '') changeHandler(userInput)
        if (userInput === '') input.setCustomValidity('Input cannot be empty')
        else input.setCustomValidity('')
    }
    // ToDo add small grey text that max is 31 days
    return (
        <EventNumberStyle>
            <div className='floating-group'>
                <input type='number'
                       max={config.DAYS_NOTICE_MAX_VAL}
                       maxLength={2}
                       value={eventReminderDays} onChange={(e) => inputValidation(e.target.value)}
                       id='eventNumberOfDays' />
                <label className='floating-label' htmlFor='eventNumberOfDays'>How many days notice?</label>
            </div>
        </EventNumberStyle>
    )
}

export default EventNumberOfDays

const EventNumberStyle = styled.div`
  padding-top: 1.5rem;
`
