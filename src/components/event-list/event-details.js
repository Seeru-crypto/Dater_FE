import React, { useState, useEffect, useRef } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import CalendarComponent from '../create-event/calendar-component'
import { confirmDialog } from 'primereact/confirmdialog'
import { DeleteData, UpdateData } from '../../API/api-requests'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import useGetId from '../../custom-hooks/useGetId'
import {
    positiveNotification,
    infoNotification,
} from '../../custom-hooks/notifications'
import { Toast } from 'primereact/toast'

import config from '../../config.json'

export const EventDetails = ({ selectedEvent, hideModal, modalState }) => {
    const toast = useRef(null)
    const [description, setDescription] = useState(selectedEvent.description)
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [date, setDate] = useState(selectedEvent.date)
    const [reminder, setReminder] = useState(selectedEvent.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEvent.reminderDays)
    const [accountForYear] = useState(false)

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

    const dateHandler = (selectedDate) => {
        setIsoDate(selectedDate.toISOString())
        let day = selectedDate.getDate()
        let month = selectedDate.getMonth() + 1
        let year = selectedDate.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }

    const deleteConfirmationDialog = () => {
        confirmDialog({
            message: 'Do you want to delete this event?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteEvent(),
        })
    }

    const deleteEvent = () => {
        DeleteData(apiPath, eventId)
        infoNotification(
            toast,
            'Delete successful',
            'This event has been deleted'
        )
    }

    const updateEvent = () => {
        const data = {
            eventName,
            date: isoDate,
            reminder,
            reminderDays,
            description,
            accountForYear,
        }
        UpdateData(`${apiPath}/${eventId}`, data)
        positiveNotification(
            toast,
            'Update successful',
            'This event has been updated'
        )
        setTimeout(() => {
            hideModal()
        }, 3000)
    }

    const eventModalFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => deleteConfirmationDialog()}
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
            <Toast ref={toast} />
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
                        selectedDate={new Date(date)}
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
