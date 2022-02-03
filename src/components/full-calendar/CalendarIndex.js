import React, { useEffect, useState } from 'react'
import FullDisplayCalendar from './FullDisplayCalendar'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'
import { getEvents } from '../../slicers/eventSlice'
import styled from 'styled-components'
import LoadingBar from '../functional-components/loading-bar'
import ErrorBar from '../functional-components/error-bar'

const CalendarIndex = () => {
    const [formattedDates, setFormattedDates] = useState([])
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
            <ErrorBar error={error} />

            {!loading && !error && (
                <div className="main-desc">
                    <p>
                        This is a general view, where all events are displayed.
                    </p>
                    <FullDisplayCalendar eventData={formattedDates} />
                </div>
            )}
            <LoadingBar loading={loading} />

        </CalendarStyle>
    )
}

const CalendarStyle = styled.div`

.main-desc {
    margin-top: 2rem;
}
`
export default CalendarIndex
