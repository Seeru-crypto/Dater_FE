import React, { memo, useEffect, useRef, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from '../create-event/calendar-component'
import config from '../../config.json'
import dataValidation from '../../custom-hooks/dataValidation'

import {
    EventAccountForYear,
    EventDescription,
    EventName,
    EventReminder,
    EventReminderInDays,
} from '../form-components/fields'
import { useAppDispatch } from '../../store'
import { deleteEvent, getEvents, saveUpdatedEvent } from '../../slicers/eventSlice'

export const EventDetails = ({
    selectedEvent,
    hideModal,
    modalState,
}) => {
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
    const [eventTitle, setEventTitle] = useState('')

    const eventId = selectedEvent.id
    const labels = config.labels;
    const dispatch = useAppDispatch()
    let showHideModal = !!modalState

    useEffect(() => {
        setDescription(selectedEvent.eventDescription)
        setAccountForYear(selectedEvent.accountForYear)
        setEventName(selectedEvent.eventName)
        setDate(selectedEvent.date)
        setIsoDate(selectedEvent.date)
        setReminder(selectedEvent.reminder)
        setReminderDays(selectedEvent.reminderDays)
    }, [selectedEvent])

    useEffect(() => {
        const timeOutId = setTimeout(() => setEventTitle(eventName), 500)
        return () => {
            clearTimeout(timeOutId)
            setEventTitle('')
        }
    }, [eventName])

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
            accept: () => deleteSelectedEvent(),
        })
    }

    const checkData = () => {
        if (dataValidation(eventName, date)) return updateEvent()
        infoNotification(toast,  labels.invalidFormErrorHeader, '')
    }

    const deleteSelectedEvent = () => {
        dispatch(deleteEvent(eventId)).then(() => {
            positiveNotification(toast, "TEST", '');
            dispatch(getEvents());
        });
    };

    const updateEvent = () => {
        const data = {
            id: eventId,
            eventName,
            date: isoDate,
            reminder,
            reminderDays,
            eventDescription,
            accountForYear,
        }
        dispatch(saveUpdatedEvent(data)).then((res) => {
            positiveNotification(toast, labels.eventUpdatedMessage, '');
            dispatch(getEvents());
            if (res) {
                setTimeout(() => {
                    hideModal()
                }, 2000)
            }
        }).catch(() => errorNotification(toast, labels.defaultErrorMessage));
    }
    const nameHandler = (e) => setEventName(e);

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
                onClick={() => checkData()}
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
            <h5>{eventTitle}</h5>
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
                <div style={{ marginTop: '2rem' }} className="p-field">
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
                        reminderHandler={(e) => {
                            setReminder(e)
                            if (reminder !== 'true') setReminderDays(0)
                        }}
                    />
                </div>
                {reminder && (
                    <div>
                        <div className="p-field-checkbox">
                            <EventAccountForYear
                                eventAccountForYear={accountForYear}
                                changeHandler={(e) => setAccountForYear(e)}
                            />
                        </div>
                        <div className="p-field">
                            <EventReminderInDays
                                eventReminderDays={reminderDays}
                                changeHandler={(e) => setReminderDays(e)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Dialog>
    )
}

export default memo(EventDetails)
