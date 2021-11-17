import React, { useState, useRef } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { Tooltip } from 'primereact/tooltip'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'

import config from '../../config.json'
import { positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from './calendar-component'
import { PostData } from '../../API/api-requests'
//ToDo
// Add field validation, so that invalid input cannot be entered.
// Add form layout to the input!
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
    const nameMaxLength = config.nameMaxLength
    const descMaxLength = config.descMaxLength

    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours()+2);
        setDate(newDate);
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
        positiveNotification(toast, 'Event Created successfully', '');
        anulAllFields();
    }

    const anulAllFields = () => {
        setDate('');
        setDescription('');
        setName('');
        setReminder(false);
        setReminderInDays(0);
        setAccountForYear(false)
    }

    return (
        <Card style={{ marginBottom: '2em' }}>
            <Toast ref={toast} />
            <div
                className="p-fluid p-formgrid p-grid"
            >
                <div className="p-field p-col">
                    <label htmlFor="firstname2">Firstname</label>
                    <InputText
                        className="p-inputtext-lg p-d-block"
                        maxLength={nameMaxLength}
                        placeholder="name"
                        required = {true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="p-field p-col">
                    <label htmlFor="dateLabel">Date:</label>
                    <CalendarComponent
                        dateHandler={dateHandler}
                        selectedEntry={date}
                        required = {true}
                    />
                </div>
            </div>

            <div
                style={{ marginTop: '.5rem' }}
                className="p-fluid p-formgrid p-grid"
            >
                <div className="p-field p-col">
                    <label htmlFor="firstname2">Description:</label>
                    <InputTextarea
                        maxLength={descMaxLength}
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="p-field p-col">
                    <h5 style={{ padding: '.5rem' }}>Additional settings:</h5>
                    <div className="p-field-checkbox">
                        <Checkbox
                            inputId="reminderCheckbox"
                            value="Do you want reminders?"
                            onChange={() => setReminder(!reminder)}
                            checked={reminder}
                        />
                        <label htmlFor="city1">Do you want reminders?</label>
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
                                    color:"darkblue"
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
                            How many days notice?{' '}
                        </label>
                        <InputNumber
                            inputId="integeronly"
                            min={0}
                            max={31}
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
                        marginBottom: '1rem'

                    }}
                    className="p-button-rounded p-button-secondary"
                    onClick={submitForm}
                />
            </div>
        </Card>
    )
}
export default AddEvent
