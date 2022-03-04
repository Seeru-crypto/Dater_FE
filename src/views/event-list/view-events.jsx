import React, { memo, useEffect } from 'react'
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

    return (
        <ViewEventsStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <EventTable data={events} />
        </ViewEventsStyle>
    )
}

const ViewEventsStyle = styled.div`
  padding: 0 2rem 2rem 2rem;
`

export default memo(ViewEvents)
