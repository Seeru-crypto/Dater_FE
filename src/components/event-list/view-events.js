import React, { memo, useEffect } from 'react'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'
import { checkEvents, getEvents } from '../../slicers/eventSlice'

import FilterTable from './filter-table'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'
import styled from 'styled-components'

const ViewEvents = () => {
    const defaultErrorMessage = config.labels.defaultErrorMessage
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
            <div
                hidden={!error}
                className="error-msg"
                >
                <Message severity='error' text={defaultErrorMessage} />
            </div>
            {loading && (
                <div className="loading-msg">
                    <i
                        className='pi pi-spin pi-spinner'
                    />
                </div>
            )}
            <FilterTable data={events} />
        </ViewEventsStyle>
    )
}

const ViewEventsStyle = styled.div`

.vertical-container {
    padding: 1rem;
}

.error-msg {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.loading-msg {
    display: flex;
    justify-content: center;
}

.pi-spinner {
    font-size: 2em;
}
`


export default memo(ViewEvents)
