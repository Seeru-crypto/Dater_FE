import React, { useState } from 'react'
import CalendarComponent from './calendar-component'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

import { InputNumber } from 'primereact/inputnumber'
import { PostData } from '../../API/api-requests'
import config from '../../config.json'
const AddPerson = () => {
    const apiPath = config.apiPath
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [description, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)

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
        }

        PostData(apiPath, data)
        alert('Item added!')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div style={{ padding: '10px' }}>
                        <InputText
                            maxLength="20"
                            placeholder="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col">
                    <div style={{ padding: '10px' }}>
                        <CalendarComponent
                            dateHandler={dateHandler}
                            selectedEntry={date}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InputTextarea
                        maxLength="120"
                        style={{ width: '15rem', height: '8rem' }}
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label
                        className="p-col-fixed"
                        style={{
                            width: '250px',
                            paddingRight: '10px',
                            paddingLeft: '10px',
                        }}
                    >
                        Do you want date reminder?
                    </label>
                    <Checkbox
                        inputId="binary"
                        checked={reminder}
                        onChange={(e) => setReminder(e.checked)}
                    />
                </div>

                {reminder && (
                    <div style={{ paddingLeft: '2rem' }} className="col">
                        <div className="row">
                            <div>
                                <label
                                    style={{
                                        width: '300px',
                                        paddingLeft: '10px',
                                    }}
                                    htmlFor="integeronly"
                                >
                                    How many days notice?
                                </label>
                                <div className="col">
                                    <InputNumber
                                        inputId="integeronly"
                                        min={0}
                                        max={31}
                                        value={reminderInDays}
                                        onValueChange={(e) =>
                                            setReminderInDays(e.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="row">
                <Button
                    style={{ width: '150px' }}
                    label="Submit"
                    onClick={submitForm}
                />
            </div>
        </div>
    )
}
export default AddPerson
