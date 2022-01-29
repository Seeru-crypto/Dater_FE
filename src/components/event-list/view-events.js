import React, { memo, useEffect } from 'react'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'
import { checkEvents, getEvents } from '../../slicers/eventSlice'

import FilterTable from './filter-table'
import config from '../../config.json'
import { useAppDispatch, useAppSelector } from '../../store'

const ViewEvents = () => {
    const defaultErrorMessage = config.labels.defaultErrorMessage
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.event.events)
    const loading = useAppSelector((state) => state.event.loading)
    const error = useAppSelector((state) => state.event.error)

    useEffect(() => {
        if (events[0] === undefined) dispatch(getEvents())
    }, [dispatch, events]);

    useEffect(() => {
        if (error!=="") {
            const timer = setInterval(() => {
                dispatch(getEvents())
            }, config.IntervalValue)
        return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleEventCheck = () => dispatch(checkEvents());
    return (
        <div>
            <div
                hidden={!!error}
                style={{ padding: '1rem' }}
                className='p-grid vertical-container'
            >
                <h5 className='p-col p-col-align-start'>View events: </h5>
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
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity='error' text={defaultErrorMessage} />
            </div>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                        className='pi pi-spin pi-spinner'
                        style={{ fontSize: '2em' }}
                    />
                </div>
            )}
            <FilterTable data={events} />
        </div>
    )
}
export default memo(ViewEvents)
