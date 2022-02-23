import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styled from 'styled-components'
import {motion} from "framer-motion";
import {eventList} from "../../static/animations/motion";

const FullDisplayCalendar = ({ eventData }) => {

    return (
        <CalendarStyle
            initial={eventList.initial}
            animate={eventList.animate}
            transition={eventList.transition}
        >
                <FullCalendar
                    firstDay="1"
                    events={eventData}
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

const CalendarStyle = styled(motion.div)`

  .fc td, th, a, .fc.fc-theme-standard .fc-view-harness th {
    background-color: var(--bkg);
    color: var(--text);
  }
`