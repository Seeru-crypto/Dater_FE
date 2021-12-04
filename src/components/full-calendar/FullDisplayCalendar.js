import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const FullDisplayCalendar = ({ eventData }) => {
    return (
        <div>
            <div className="card">
                <FullCalendar
                    events={eventData}
                    initialDate={new Date().toISOString()}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth',
                    }}
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                />
            </div>
            )
        </div>
    )
}

export default FullDisplayCalendar
