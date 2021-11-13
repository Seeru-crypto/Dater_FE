import React, { useState, useEffect } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import CalendarComponent from '../create-event/calendar-component'
import { DeleteData, UpdateData } from '../../API/api-requests'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import Alert from 'react-bootstrap/Alert'
import useGetId from '../../custom-hooks/useGetId'

import config from '../../config.json'

export const EventDetails = ({ selectedEvent, hideModal, modalState }) => {
    console.log(selectedEvent)
    const [description, setDescription] = useState(selectedEvent.description)
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [date, setDate] = useState(selectedEvent.date)
    const [reminder, setReminder] = useState(selectedEvent.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEvent.reminderDays)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showDeleted, setShowDeleted] = useState(false)

    const [isoDate, setIsoDate] = useState(
        selectedEvent.date ? selectedEvent.date : null
    )

    const apiPath = config.apiPath
    const eventId = useGetId(selectedEvent)
    let showHideModal = modalState ? true : false

    useEffect(() => {
        setDescription(selectedEvent.description)
        setEventName(selectedEvent.eventName)
        setDate(selectedEvent.date)
        setReminder(selectedEvent.reminder)
        setReminderDays(selectedEvent.reminderDays)
    }, [selectedEvent])

    const showAlert = (type) => {
        if (type === 'update') {
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                hideModal()
            }, 2500)
        }
        if (type === 'delete') {
            setShowDeleted(true)
            setTimeout(() => setShowDeleted(false), 2500)
        }
    }

    const dateHandler = (selectedDate) => {
        setIsoDate(selectedDate.toISOString())
        let day = selectedDate.getDate()
        let month = selectedDate.getMonth() + 1
        let year = selectedDate.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }

    const deleteEvent = () => {
        //ToDo
        //  Ask for user confirmation, before deleting!
        DeleteData(apiPath, eventId)
        showAlert('delete')
    }

    const updateEvent = () => {
        const data = {
            eventName,
            date: isoDate,
            reminder,
            reminderDays,
            description,
        }
        UpdateData(`${apiPath}/${eventId}`, data)
        showAlert('update')
    }

    const eventModalFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => deleteEvent()}
            />

            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideModal}
            />

            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => updateEvent()}
            />
        </React.Fragment>
    )

    return (
        <Dialog
            visible={showHideModal}
            style={{ width: '450px' }}
            header="Event Details"
            modal
            className="p-fluid"
            footer={eventModalFooter}
            onHide={hideModal}
        >
            {showSuccess && (
                <div>
                    <Alert variant="success">This item has been updated.</Alert>
                </div>
            )}
            {showDeleted && (
                <div>
                    <Alert variant="danger">This item has been deleted!</Alert>
                </div>
            )}
            <h5>{eventName}</h5>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="eventName">Event name:</label>
                    <InputText
                        value={eventName}
                        id="eventName"
                        maxLength="20"
                        type="text"
                        onInput={(e) => {
                            setEventName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="selectedDate">Date:</label>
                    <CalendarComponent
                        dateHandler={dateHandler}
                        selectedDate={date}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="description">description</label>
                    <InputTextarea
                        value={description}
                        id="description"
                        maxLength="120"
                        autoResize
                        type="text"
                        onInput={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    className="p-field"
                >
                    <label style={{ paddingRight: '1rem' }}>
                        send e-mail notification?
                    </label>
                    <Checkbox
                        checked={reminder}
                        onChange={(e) => {
                            setReminder(!reminder)
                            if (reminder) setReminderDays(0)
                        }}
                    ></Checkbox>
                </div>
                {reminder && (
                    <div className="p-field">
                        <label htmlFor="reminderDays">Reminder in days</label>
                        <InputNumber
                            value={reminderDays}
                            inputId="integeronly"
                            min={0}
                            max={31}
                            id="reminderDays"
                            onInput={(e) => {
                                setReminderDays(e.target.value)
                            }}
                            onValueChange={(e) => {
                                setReminderDays(e.target.value)
                            }}
                        />
                    </div>
                )}
            </div>
        </Dialog>
    )
}
