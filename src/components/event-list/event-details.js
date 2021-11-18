import React, { useState, useEffect, useRef } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
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
import {
    EventDescription,
    EventName,
    EventReminder,
} from '../form-components/fields'

//ToDo
// Add field validation, so that invalid input cannot be entered.
// make name and date fields required.
// Test if the isoDate  const/ dateHandler func can be removed
// Add notifcations dependent on the result on the API request. Show notification only if the Request has been succesful
// export used css into a separate .css file
export const EventDetails = ({ selectedEvent, hideModal, modalState }) => {
    const toast = useRef(null)
    const [eventDescription, setDescription] = useState(
        selectedEvent.description
    )
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
    const daysNoticeMaxValue = config.daysNoticeMaxValue
    const daysNoticeMinValue = config.daysNoticeMinValue

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
        newDate.setHours(selectedDate.getHours() + 2)

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
            eventDescription,
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
    const nameHandler = (e) => setEventName(e)

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
                    <EventName name={eventName} nameHandler={nameHandler} />
                </div>
                <div>
                    <label htmlFor="selectedDate">Date:</label>
                    <CalendarComponent
                        dateHandler={dateHandler}
                        selectedDate={new Date(date)}
                    />
                </div>
                <div className="p-field">
                    <EventDescription
                        desc={eventDescription}
                        descHandler={(e) => setDescription(e)}
                    />
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    className="p-field"
                >
                    <EventReminder
                        reminder={reminder}
                        reminderHandler={(e) => setReminder(e)}
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
                                    color: 'darkblue',
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
                                min={daysNoticeMinValue}
                                max={daysNoticeMaxValue}
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
