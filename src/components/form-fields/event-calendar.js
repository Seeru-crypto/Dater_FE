import React, { useEffect, useState } from 'react'
import config from '../../config.json'
import './form-styles.css'
import styled from 'styled-components'

const EventCalendar = ({ dateHandler, selectedDate, missing }) => {
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        const modifyDate = (isoDate) => {
            let day = isoDate.getDate();
            if (day < 10) day = `0${day}`

            let month = isoDate.getMonth() + 1
            if (month < 10) month = `0${month}`

            return `${isoDate.getFullYear()}-${month}-${day}`;
        }

        if (selectedDate === '') setCurrentDate(modifyDate(new Date()))
        else setCurrentDate(modifyDate(selectedDate));
    }, [selectedDate])

    return (
        <EventDateStyle>
            <div className='floating-group'>
                <label className='date-label' htmlFor='dateInput'>event date</label>
                <input type='date' id='dateInput'
                       min={config.CALENDAR_MIN_DATE}
                       max={config.CALENDAR_MAX_DATE}
                       className={`date ${missing ? 'missing' : ''}`}
                       value={currentDate}
                       onChange={(e) => dateHandler(new Date(e.target.value))}
                />
            </div>
        </EventDateStyle>
    )
}

export default React.memo(EventCalendar)

const EventDateStyle = styled.div`
  .date-label {
    top: -1rem;
    color: var(--btn);
    position: absolute;

    left: 1rem;
    transform: translateY(-50%);
    text-transform: uppercase;
    font-size: .8rem;
  }
`