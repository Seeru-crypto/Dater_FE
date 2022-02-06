import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styled from 'styled-components'

const FullDisplayCalendar = ({ eventData }) => {
    return (
        <CalendarStyle>
                <FullCalendar
                    firstDay="1"
                    events={eventData}
                    initialDate={new Date().toISOString()}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: '',
                    }}
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                />
            )
        </CalendarStyle>
    )
}

export default FullDisplayCalendar

const CalendarStyle = styled.div`

  .fc td, th, a, .fc.fc-theme-standard .fc-view-harness th {
    background-color: var(--bkg);
    color: var(--text);
  }




`