import React, { useState, useEffect, useRef } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Tooltip } from 'primereact/tooltip'

import { DeleteData, UpdateData } from '../../API/api-requests'
import useGetId from '../../custom-hooks/useGetId'
import {
    positiveNotification,
    infoNotification,
} from '../../custom-hooks/notifications'
import CalendarComponent from '../create-event/calendar-component'
import config from '../../config.json'

//ToDo
// Add field validation, so that invalid input cannot be entered.
// make name and date fields required.
// Test if the isoDate  const/ dateHandler func can be removed
// Add notifcations dependent on the result on the API request. Show notification only if the Request has been succesful
// Test if <i> and <checkobx tagas can be made into 1 <i /> tag>
// export used css into a separate .css file
// use conifg values for Reminder in days min, max values
// Replace used px values with relative values
export const EventDetails = ({ selectedEvent, hideModal, modalState }) => {
    const toast = useRef(null)
    const [description, setDescription] = useState(selectedEvent.description)
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [date, setDate] = useState(selectedEvent.date)
    const [reminder, setReminder] = useState(selectedEvent.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEvent.reminderDays)
    const [accountForYear, setAccountForYear] = useState(
        selectedEvent.accountForYear
    )
    const [isoDate, setIsoDate] = useState(
        selectedEvent.date ? selectedEvent.date : null
    )

    const apiPath = config.apiPath
    const nameMaxLength = config.nameMaxLength
    const descMaxLength = config.descMaxLength

    const eventId = useGetId(selectedEvent)
    let showHideModal = modalState ? true : false

    useEffect(() => {
        setDescription(selectedEvent.description)
        setEventName(selectedEvent.eventName)
        setDate(selectedEvent.date)
        setIsoDate(selectedEvent.date)
        setReminder(selectedEvent.reminder)
        setReminderDays(selectedEvent.reminderDays)
    }, [selectedEvent])

    const dateHandler = (selectedDate) => {
        const newDate = selectedDate
        newDate.setHours(selectedDate.getHours()+2);

        setIsoDate(newDate.toISOString())

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
                        maxLength={nameMaxLength}
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
                        maxLength={descMaxLength}
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
                     />
                </div>
                {reminder && (
                    <div>
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
                                    color: "darkblue"
                                }}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="reminderDays">
                                Reminder in days
                            </label>
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
                    </div>
                )}
            </div>
        </Dialog>
    )
}
