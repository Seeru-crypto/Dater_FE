import React, { memo, useEffect } from 'react'
import { Button } from 'primereact/button'
import { checkEvents, getEvents } from '../../slicers/eventSlice'

import FilterTable from './filter-table'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'
import styled from 'styled-components'
import ErrorBar from '../functional-components/error-bar'
import LoadingBar from '../functional-components/loading-bar'

// ToDo Add searching by name and description
const ViewEvents = () => {
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.event.events)
    const loading = useAppSelector((state) => state.event.loading)
    const error = useAppSelector((state) => state.event.error)

    useEffect(() => {
        if (events[0] === undefined) dispatch(getEvents())
        if (error!=="") {
            const timer = setInterval(() => {
                dispatch(getEvents())
            }, config.IntervalValue)
        return () => clearTimeout(timer);
        }
    }, [error, dispatch, events]);

    const handleEventCheck = () => dispatch(checkEvents());
    return (
        <ViewEventsStyle>
            <div
                hidden={!!error}
                className='p-grid vertical-container'
            >
                <h5 className='p-col p-col-align-start'>Number of events: {events.length}</h5>
                <div>
                    <div className='p-col p-col-align-end'>
                        <Button
                            onClick={() => handleEventCheck()}
                            className='p-button-outlined p-button-secondary'
                        >
                            <i className='pi pi-envelope p-px-2' />
                            <span> Check dates </span>
                        </Button>
                    </div>
                </div>
            </div>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <FilterTable data={events} />
        </ViewEventsStyle>
    )
}

const ViewEventsStyle = styled.div`

.vertical-container {
    padding: 1rem;
}
`


export default memo(ViewEvents)
