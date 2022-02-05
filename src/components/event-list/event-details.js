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

import { useAppDispatch } from '../../store'
import { deleteEvent, getEvents, saveUpdatedEvent } from '../../slicers/eventSlice'
import EventNameField from '../form-fields/event-name'
import EventDescField from '../form-fields/event-desc'
import EventYearlyCb from '../form-fields/event-yearly-cb'
import EventNumberOfDays from '../form-fields/event-number-of-days'
import EventReminder from '../form-fields/event-reminder-cb'


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
    const [missingName, setMissingName] = useState(false)
    const [missingDate, setMissingDate] = useState(false)

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
        const validationResult = dataValidation(eventName, date, eventDescription)
        validationResult.property === 'name' ? setMissingName(true) : setMissingName(false)
        validationResult.property === 'date' ? setMissingDate(true) : setMissingDate(false)
        if (validationResult.result) return updateEvent()
        infoNotification(toast, labels.invalidFormErrorHeader, labels.invalidFormErrorHeader)
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
            footer={eventModalFooter}
            onHide={hideModal}
        >
            <Toast ref={toast} />
            <EventDetalStyle>
                <form className='event-add-form'>
                    <EventNameField name={eventName} nameHandler={(e) => setEventName(e)} missing={missingName} />
                    <CalendarComponent
                        missing={missingDate}
                        dateHandler={dateHandler}
                        selectedDate={date}
                    />
                    <EventDescField desc={eventDescription} descHandler={(e) => setDescription(e)} />
                    <EventReminder reminder={reminder} reminderHandler={((e) => setReminder(e))} />

                    {reminder && (
                        <div>
                            <EventYearlyCb eventAccountForYear={accountForYear}
                                           changeHandler={(e) => setAccountForYear(e)} />
                            <EventNumberOfDays eventReminderDays={reminderDays}
                                               changeHandler={(e) => setReminderDays(e)} />
                        </div>
                    )}
                </form>
            </EventDetalStyle>

        </Dialog>
    )
}

const EventDetalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

  --btn: #3da9fc;
  --btntext: #fffffe;
  --text: #094067;
  --paragraph: #5f6c7b;
  --bkg: #fffffe;
  --err: #ef4565;

  font-family: 'Inter', sans-serif;

  .detail-desc {
    margin-top: 2rem;
  }

  .event-detal-reminder {
    align-items: center;
    display: flex;
  }

  display: grid;
  background-color: var(--bkg);

  .event-add-form {
    display: grid;
    gap: 3rem;
    text-align: center;
    padding: clamp(1rem, 10vw, 4rem);
  }
`

export default memo(EventDetails)
