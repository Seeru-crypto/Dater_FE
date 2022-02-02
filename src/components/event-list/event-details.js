import React, { memo, useEffect, useRef, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from '../form-fields/calendar-component'
import config from '../../config.json'
import dataValidation from '../../custom-hooks/dataValidation'
import styled from 'styled-components'

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
        selectedEvent.description,
    )
    const labels = config.labels
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [date, setDate] = useState(selectedEvent.date)
    const [reminder, setReminder] = useState(selectedEvent.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEvent.reminderDays)
    const [accountForYear, setAccountForYear] = useState(
        selectedEvent.accountForYear,
    )
    const [isoDate, setIsoDate] = useState(
        selectedEvent.date ? selectedEvent.date : null,
    )

    const eventId = selectedEvent.id
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
        infoNotification(toast, labels.invalidFormErrorHeader, '')
    }

    const deleteSelectedEvent = async () => afterRequestActions(await dispatch(deleteEvent(eventId)))

    const updateEvent = async () => {
        const data = {
            id: eventId,
            eventName,
            date: isoDate,
            reminder,
            reminderDays,
            eventDescription,
            accountForYear,
        }
        afterRequestActions(await dispatch(saveUpdatedEvent(data)))
    }

    const afterRequestActions = (res) => {
        if (res.meta.requestStatus === 'fulfilled') {
            positiveNotification(toast, labels.eventUpdatedMessage, '')
            dispatch(getEvents())
        } else errorNotification(toast, labels.defaultErrorMessage)
    }

    const eventModalFooter = (
        <React.Fragment>
            <Button
                label='Delete'
                icon='pi pi-check'
                className='p-button-text'
                onClick={() => deleteConfirmationDialog()}
            />

            <Button
                label='Cancel'
                icon='pi pi-times'
                className='p-button-text'
                onClick={hideModal}
            />

            <Button
                label='Save'
                icon='pi pi-check'
                className='p-button-text'
                onClick={() => checkData()}
            />
        </React.Fragment>
    )

    return (
        <Dialog
            visible={showHideModal}
            header='Event Details'
            modal
            className='p-fluid main-dialogue'
            footer={eventModalFooter}
            onHide={hideModal}
        >
            <Toast ref={toast} />
            <EventDetalStyle>
                <div className='p-fluid'>
                    <div className='p-field'>
                        <EventName name={eventName} nameHandler={(e) => setEventName(e)} />
                    </div>
                    <div>
                        <label htmlFor='selectedDate'>Date:</label>
                        <CalendarComponent
                            dateHandler={dateHandler}
                            selectedDate={new Date(date)}
                        />
                    </div>
                    <div className='p-field detail-desc'>
                        <EventDescription
                            desc={eventDescription}
                            descHandler={(e) => setDescription(e)}
                        />
                    </div>
                    <div
                        className='p-field event-detal-reminder'
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
                            <div className='p-field-checkbox'>
                                <EventAccountForYear
                                    eventAccountForYear={accountForYear}
                                    changeHandler={(e) => setAccountForYear(e)}
                                />
                            </div>
                            <div className='p-field'>
                                <EventReminderInDays
                                    eventReminderDays={reminderDays}
                                    changeHandler={(e) => setReminderDays(e)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </EventDetalStyle>

        </Dialog>
    )
}

const EventDetalStyle = styled.div`
  main-dialogue. {
    width: 400px;
  }

  .detail-desc {
    margin-top: 2rem;
  }

  .event-detal-reminder {
    align-items: center;
    display: flex;
  }
`

export default memo(EventDetails)
