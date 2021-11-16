import React, { useState, useRef } from 'react'
import CalendarComponent from './calendar-component'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { Tooltip } from 'primereact/tooltip'

import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { PostData } from '../../API/api-requests'
import config from '../../config.json'
import { positiveNotification } from '../../custom-hooks/notifications'
import { Toast } from 'primereact/toast'

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
        setDate(data.toISOString())
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
    }

    return (
        <Card style={{ marginBottom: '2em' }}>
            <Toast ref={toast} />

            <div
                style={{ marginTop: '10px' }}
                className="p-fluid p-formgrid p-grid"
            >
                <div className="p-field p-col">
                    <label htmlFor="firstname2">Firstname</label>
                    <InputText
                        className="p-inputtext-lg p-d-block"
                        maxLength={nameMaxLength}
                        placeholder="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="p-field p-col">
                    <label htmlFor="lastname2">Date:</label>
                    <CalendarComponent
                        dateHandler={dateHandler}
                        selectedEntry={date}
                    />
                </div>
            </div>

            <div
                style={{ marginTop: '10px' }}
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
                    <h5 style={{ padding: '10px' }}>Additional settings:</h5>
                    <div className="p-field-checkbox">
                        <Checkbox
                            inputId="city1"
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
                                    paddingLeft: '1rem',
                                }}
                            ></i>
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
                    <div className="p-field p-col"></div>
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
                        padding: '10px',
                        width: '15rem',
                    }}
                    className="p-button-rounded p-button-secondary"
                    onClick={submitForm}
                />
            </div>

            <div
                className="p-fluid p-formgrid p-grid"
                style={{
                    marginTop: '2rem',
                    justifyContent: 'center',
                }}
            ></div>
        </Card>
    )
}
export default AddEvent
