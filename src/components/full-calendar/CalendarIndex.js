import React, { useState, useEffect } from 'react'
import FullDisplayCalendar from './FullDisplayCalendar'
import config from '../../config.json'
import { Message } from 'primereact/message'
import { useAppDispatch, useAppSelector } from '../../store'
import { getEvents } from '../../slicers/eventSlice'
import styled from 'styled-components'

const CalendarIndex = () => {
    const [formattedDates, setFormattedDates] = useState([])
    const defaultErrorMessage = config.labels.defaultErrorMessage
    const events = useAppSelector((state) => state.event.events)
    const loading = useAppSelector((state) => state.event.loading)
    const error = useAppSelector((state) => state.event.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error!=="") {
            const timer = setInterval(() => {
                dispatch(getEvents())
            }, config.IntervalValue)
            return () => clearTimeout(timer);
        }
        if (events[0] === undefined) dispatch(getEvents());
        if (events) {
            const eventDataBody = events
            const currentYear = new Date().getFullYear()
            const newList = eventDataBody.map((event) => {
                const title = event.eventName
                const newDate = currentYear + event.date.substring(4, 10)
                return { ...event, title: title, date: newDate }
            });
            setFormattedDates(newList);
        }
    }, [error, dispatch, events]);

    return (
        <CalendarStyle>
            <div
                className="error-message"
                hidden={!error}
                     >
                <Message severity="error" text={defaultErrorMessage} />
            </div>
            {!loading && !error && (
                <div className="main-desc">
                    <p>
                        This is a general view, where all events are displayed.
                    </p>
                    <FullDisplayCalendar eventData={formattedDates} />
                </div>
            )}
            {loading && (
                <div className="calendar-loading-msg">
                    <i
                        className="pi pi-spin pi-spinner"
                    />
                </div>
            )}
        </CalendarStyle>
    )
}

const CalendarStyle = styled.div`
.error-message {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.main-desc {
    margin-top: 2rem;
}

.calendar-loading-msg {
    display: flex;
    justify-content: center;
}

.pi-spinner {
    font-size: 2em;
}
`
export default CalendarIndex
