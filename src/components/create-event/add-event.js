import React, { useState, useRef } from 'react'

import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { Tooltip } from 'primereact/tooltip'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'

import config from '../../config.json'
import {
    positiveNotification,
    infoNotification,
} from '../../custom-hooks/notifications'
import CalendarComponent from './calendar-component'
import dataValidation from '../../custom-hooks/dataValidation'
import { PostData } from '../../API/api-requests'
import {
    EventDescription,
    EventName,
    EventReminder,
} from '../form-components/fields'

//ToDo
// Add field validation, so that invalid input cannot be entered.
// make name and date fields required.
// Make the styles used here into a separate .css file
// Make  the tooltip desc, reminderDaysNotice mix, max values into a separate config file

const AddEvent = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [description, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)
    const [accountForYear, setAccountForYear] = useState(false)

    const toast = useRef(null)

    const apiPath = config.apiPath
    const daysNoticeMaxValue = config.daysNoticeMaxValue
    const daysNoticeMinValue = config.daysNoticeMinValue

    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2)
        setDate(newDate)
    }

    const checkData = () => {
        if (dataValidation(name, date)) return submitForm()
        infoNotification(toast, 'please fill fields', '')
    }

    const submitForm = () => {
        const data = {
            eventName: name,
            date: date,
            reminder: reminder,
            reminderDays: reminderInDays,
            description: description,
            accountForYear,
        }
        PostData(apiPath, data)
        positiveNotification(toast, 'Event Created successfully', '')
        anulAllFields()
    }

    const anulAllFields = () => {
        setDate('')
        setDescription('')
        setName('')
        setReminder(false)
        setReminderInDays(0)
        setAccountForYear(false)
    }

    return (
        <Card style={{ marginBottom: '2rem' }}>
            <Toast ref={toast} />
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <div className="p-field p-col">
                        <EventName
                            name={name}
                            nameHandler={(e) => setName(e)}
                        />
                    </div>
                </div>
                <div className="p-field p-col">
                    <div className="p-field p-col">
                        <CalendarComponent
                            dateHandler={dateHandler}
                            selectedDate={date}
                        />
                    </div>
                </div>
            </div>

            <div
                style={{ marginTop: '.5rem' }}
                className="p-fluid p-formgrid p-grid"
            >
                <div className="p-field p-col">
                    <EventDescription
                        desc={description}
                        descHandler={(e) => setDescription(e)}
                    />
                </div>
                <div className="p-field p-col">
                    <h5 style={{ padding: '.5rem' }}>Additional settings:</h5>
                    <div className="p-field-checkbox">
                        <EventReminder
                            reminder={reminder}
                            reminderHandler={(e) => setReminder(e)}
                        />
                    </div>
                    {reminder && (
                        <div className="p-field-checkbox">
                            <Checkbox
                                className="p-d-block"
                                inputId="accountForYear"
                                value="Account for year?"
                                onChange={() =>
                                    setAccountForYear(!accountForYear)
                                }
                                checked={accountForYear}
                            />
                            <label
                                className="p-d-block"
                                htmlFor="accountForYear"
                            >
                                Account for year?
                            </label>
                            <Tooltip target=".pi-info-circle" />
                            <i
                                className="pi pi-info-circle"
                                data-pr-tooltip="Will the reminder be sent every year or on the selected year"
                                data-pr-position="right"
                                data-pr-at="right+5 top"
                                data-pr-my="left center-2"
                                style={{
                                    fontSize: '1rem',
                                    paddingLeft: '.5rem',
                                    color: 'darkblue',
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {reminder && (
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="integeronly">
                            How many days notice?
                        </label>
                        <InputNumber
                            inputId="integeronly"
                            min={daysNoticeMinValue}
                            max={daysNoticeMaxValue}
                            value={reminderInDays}
                            onValueChange={(e) => setReminderInDays(e.value)}
                        />
                    </div>
                    <div className="p-field p-col" />
                </div>
            )}
            <div
                className="p-fluid p-formgrid p-grid"
                style={{
                    marginTop: '2rem',
                    justifyContent: 'center',
                }}
            >
                <Button
                    label="Add Event"
                    style={{
                        display: 'flex',
                        padding: '1rem',
                        width: '15rem',
                        marginBottom: '1rem',
                    }}
                    className="p-button-rounded p-button-secondary"
                    onClick={checkData}
                />
            </div>
        </Card>
    )
}
export default AddEvent
