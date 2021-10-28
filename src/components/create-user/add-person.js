import React, { useState, useEffect } from 'react'
import CalendarComponent from './calendar-component'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

import { InputNumber } from 'primereact/inputnumber'
import { PostData } from '../API/api-requests'
import config from '../../config.json'
const AddPerson = () => {
    const apiPath = config.apiPath
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [description, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)

    const dateHandler = (data) => {
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }

    const submitForm = () => {
        const data = {
            entryName: name,
            date: date,
            reminder: true,
            reminderDays: reminderInDays,
            description: description,
        }

        PostData(apiPath, data)
        alert('Item added!')
    }

    useEffect(() => {}, [])

    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div
                    className="p-field p-col-12 p-md-6"
                    style={{ padding: '10px' }}
                >
                    <InputText
                        placeholder="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div
                    className="p-field p-col-12 p-md-6"
                    style={{ padding: '10px' }}
                >
                    <CalendarComponent dateHandler={dateHandler} />
                </div>

                <div className="p-field p-grid">
                    <div className="p-col">
                        <InputTextarea
                            style={{ width: '15rem', height: '8rem' }}
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <div className="checkbox p-col">
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
                </div>

                {reminder && (
                    <div className="p-field p-grid">
                        <label
                            className="p-col-fixed"
                            style={{ width: '300px', paddingLeft: '10px' }}
                            htmlFor="integeronly"
                        >
                            How many days notice?
                        </label>
                        <div className="p-col p-md-3">
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
                )}
            </div>
            <Button
                style={{ width: '150px' }}
                label="Submit"
                onClick={submitForm}
            />
        </div>
    )
}
export default AddPerson
