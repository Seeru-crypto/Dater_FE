import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styled from 'styled-components'

const FullDisplayCalendar = ({ eventData }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const formattedList = eventData.map((event) => {
            return {title: event.name, date: event.date};
        })
        setEvents(formattedList);
    }, [eventData])

    return (
        <CalendarStyle>
                <FullCalendar
                    firstDay="1"
                    events={events}
                    initialDate={new Date().toISOString()}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    editable={false}
                    selectable={false}
                    selectMirror
                    dayMaxEvents
                />
        </CalendarStyle>
    )
}

export default FullDisplayCalendar

const CalendarStyle = styled.div`
  //min-height: 100vh;

  .fc td, th, a, .fc.fc-theme-standard .fc-view-harness th {
    background-color: var(--bkg);
    color: var(--text);
  }
`