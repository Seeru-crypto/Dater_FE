import React from 'react'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import config from '../../config.json'
import './form-styles.css'

const CalendarComponent = ({ dateHandler, selectedDate }) => {
    const calendarMinYear = config.calendarMinYear
    const calendarMaxYear = config.calendarMaxYear
    const yearRange = `${calendarMinYear}:${calendarMaxYear}`

    // ToDo redesign it with default date input element!
    const yearNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                className='p-ml-2'
                style={{ lineHeight: 1 }}
            />
        )
    }
    const monthNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                style={{ lineHeight: 1 }}
            />
        )
    }

    const changeHandler = (e) => dateHandler(e.value)

    return (
        <Calendar
            required={true}
            className='event-calendar'
            inputClassName='event-calendar'
            placeholder='* Add date'
            dateFormat='dd-mm-yy'
            id='navigatorstemplate'
            readOnlyInput={true}
            value={selectedDate}
            onChange={(e) => {
                changeHandler(e)
            }}
            monthNavigator
            yearNavigator
            yearRange={yearRange}
            monthNavigatorTemplate={monthNavigatorTemplate}
            yearNavigatorTemplate={yearNavigatorTemplate}
        />
    )
}
export default CalendarComponent
