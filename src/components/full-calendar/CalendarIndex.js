import React, { useState, useEffect } from 'react'
import FullDisplayCalendar from './FullDisplayCalendar'
import config from '../../config.json'
import useGetData from '../../API/useGetData'
import { Message } from 'primereact/message'

const CalendarIndex = () => {
    const [formattedDates, setFormattedDates] = useState([])

    const apiPath = 'http://localhost:8080/api/event'
    const defaultErrorMessage = config.labels.defaultErrorMessage
    let { getData: eventData, isPending, error } = useGetData(apiPath)

    useEffect(() => {
        if (eventData) {
            const eventDataBody = eventData.data
            const currentYear = new Date().getFullYear()
            const newList = eventDataBody.map((event) => {
                const title = event.eventName
                const newDate = currentYear + event.date.substring(4, 10)
                return { ...event, title: title, date: newDate }
            })
            setFormattedDates(newList)
        }
    }, [eventData])

    return (
        <div>
            <div
                hidden={error ? false : true}
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity="error" text={defaultErrorMessage} />
            </div>
            {!isPending && !error && (
                <div style={{ marginTop: '2rem' }}>
                    <FullDisplayCalendar eventData={formattedDates} />
                </div>
            )}
            {isPending && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '2em' }}
                    ></i>
                </div>
            )}
        </div>
    )
}
export default CalendarIndex
