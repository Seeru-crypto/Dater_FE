import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const FullDisplayCalendar = ({ eventData }) => {
    const [events, setEvents] = useState(eventData.data)
    console.log(eventData.data)

    const currentDate = new Date().toISOString()
    console.log(currentDate)

    useEffect(() => {
        // eventService.getEvents().then((data) => setEvents(data))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <FullCalendar
                    events={events}
                    initialDate={currentDate}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                />
            </div>
        </div>
    )
}
export default FullDisplayCalendar
