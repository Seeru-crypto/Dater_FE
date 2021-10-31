import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'

const CalendarComponent = ({ dateHandler, selectedDate }) => {
    const [date, setDate] = useState(selectedDate ? selectedDate : null)
    const yearNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                className="p-ml-2"
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

    const changeHandler = (e) => {
        dateHandler(e.value)
        setDate(e.value)
    }

    return (
        <div>
            <Calendar
                placeholder="Add date"
                dateFormat="dd-mm-yy"
                id="navigatorstemplate"
                value={date}
                onChange={(e) => {
                    changeHandler(e)
                }}
                monthNavigator
                yearNavigator
                yearRange="1950:2030"
                monthNavigatorTemplate={monthNavigatorTemplate}
                yearNavigatorTemplate={yearNavigatorTemplate}
            />
        </div>
    )
}
export default CalendarComponent
