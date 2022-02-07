import React, { memo, useEffect } from 'react'
import { getEvents } from '../../slicers/eventSlice'

import FilterTable from './filter-table'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'
import styled from 'styled-components'
import ErrorBar from '../functional-components/error-bar'
import LoadingBar from '../functional-components/loading-bar'

const ViewEvents = () => {
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.event.events)
    const loading = useAppSelector((state) => state.event.loading)
    const error = useAppSelector((state) => state.event.error)

    useEffect(() => {
        if (events[0] === undefined) dispatch(getEvents())
        if (error !== '') {
            const timer = setInterval(() => {
                dispatch(getEvents())
            }, config.HTTP_INTERVAL_VALUE)
            return () => clearTimeout(timer)
        }
    }, [error, dispatch, events])

    return (
        <ViewEventsStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <FilterTable data={events} />
        </ViewEventsStyle>
    )
}

const ViewEventsStyle = styled.div`
  background-color: var(--bkg);
  padding: 0 2rem 2rem 2rem;
  min-height: 100vh;
`

export default memo(ViewEvents)
