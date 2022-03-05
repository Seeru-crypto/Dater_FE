import React, {memo, useEffect, useState} from 'react'
import { getEvents } from '../../slicers/eventSlice'

import EventTable from '../../components/event-list/event-table'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'
import styled from 'styled-components'
import ErrorBar from '../../components/functional-components/error-bar'
import LoadingBar from '../../components/functional-components/loading-bar'

const ViewEvents = () => {
    const dispatch = useAppDispatch()
    const {events, loading, error} = useAppSelector((state) => state.event)
    const [formattedEvents, setFormattedEvents] = useState([]);

    useEffect(() => {
        if (error !== '') {
            const timer = setInterval(() => {
                dispatch(getEvents())
            }, config.HTTP_INTERVAL_VALUE)
            return () => clearTimeout(timer)
        }
    }, [error, dispatch, events])

    useEffect(() => {
        if (events[0] === undefined) dispatch(getEvents())
    }, [])

    useEffect(() => {
        if (events){
            const newEvents = events.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString(
                    'en-gb',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'utc',
                        hour12: false
                    }
                )
                const formattedReminderDate = new Date(event.dateNextReminder).toLocaleDateString(
                    'en-gb',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'utc',
                        hour12: false
                    }
                )
                return {...event, formattedDate, formattedReminderDate}
            });
            setFormattedEvents(newEvents);
        };
    }, [events])

    return (
        <ViewEventsStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <EventTable data={formattedEvents} />
        </ViewEventsStyle>
    )
}

const ViewEventsStyle = styled.div`
  padding: 0 2rem 2rem 2rem;
`

export default memo(ViewEvents)
