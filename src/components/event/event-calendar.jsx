import React, {useEffect, useState} from 'react'
import config from '../../config.json'
import '../../static/css-files/form-styles.css'
import styled from 'styled-components'

const EventCalendar = ({ dateHandler, selectedDate, missing }) => {
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
          if (selectedDate === '') {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            setCurrentDate(formattedDate);
            dateHandler(currentDate);
        }
    }, [selectedDate])

    return (
        <EventDateStyle>
            <div className='floating-group'>
                <label className='date-label' htmlFor='dateInput'>event date</label>
                <input
                    type='date'
                    id='dateInput'
                    pattern="\d{4}-\d{2}-\d{2}"
                    min={config.CALENDAR_MIN_DATE}
                    max={config.CALENDAR_MAX_DATE}
                    className={`date ${missing ? 'missing' : ''}`}
                    value={currentDate}
                    onChange={(e) => {
                        setCurrentDate(e.target.value);
                        console.log(e.target.value);
                        dateHandler(new Date(e.target.value))
                    }}
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