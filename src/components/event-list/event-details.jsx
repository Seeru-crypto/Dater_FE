import React, { memo, useEffect, useRef, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from '../form-fields/event-calendar'
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

// ToDo replace primeReact modal with custom HTML element

export const EventDetails = ({
                                 selectedEvent,
                                 hideModal,
                                 modalState,
                             }) => {
    const toast = useRef(null)
    const [eventDescription, setDescription] = useState(
        selectedEvent.description,
    )
    const labels = config.LABELS
    const [eventName, setEventName] = useState(selectedEvent.name)
    const [date, setDate] = useState(selectedEvent.date)
    const [reminder, setReminder] = useState(selectedEvent.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEvent.reminderDays)
    const [accountForYear, setAccountForYear] = useState(
        selectedEvent.accountForYear,
    )
    const [isoDate, setIsoDate] = useState(
        selectedEvent.date ? selectedEvent.date : null,
    )
    const [invalidName, setInvalidName] = useState(false)
    const [invalidDate, setInvalidDate] = useState(false)
    const [invalidDesc, setInvalidDesc] = useState(false)

    const eventId = selectedEvent.id
    const dispatch = useAppDispatch()
    let showHideModal = !!modalState

    useEffect(() => {
        setDescription(selectedEvent.description)
        setAccountForYear(selectedEvent.accountForYear)
        setEventName(selectedEvent.name)
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
        const formattedDate = `${year}-${month}-${day}`
        setDate(formattedDate)
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
        validationResult.property === 'name' ? setInvalidName(true) : setInvalidName(false)
        validationResult.property === 'date' ? setInvalidDate(true) : setInvalidDate(false)
        validationResult.property === 'desc' ? setInvalidDesc(true) : setInvalidDesc(false)
        if (validationResult.result) return updateEvent()
        infoNotification(toast, labels.INVALID_FORM_ERR_HEADER, labels.INVALID_FORM_ERR_HEADER)
    }

    const deleteSelectedEvent = async () => afterRequestActions({
        requestResponse: await dispatch(deleteEvent(eventId)),
        dispatchedAction: 'delete',
    })

    const updateEvent = async () => {
        const data = {
            id: eventId,
            name: eventName,
            date: isoDate,
            reminder,
            reminderDays,
            description: eventDescription,
            accountForYear,
        }
        afterRequestActions({ requestResponse: await dispatch(saveUpdatedEvent(data)), dispatchedAction: 'update' })
    };

    const afterRequestActions = ({ requestResponse: res, dispatchedAction }) => {
        if (res.meta.requestStatus === 'fulfilled') {
            const toastMessage = dispatchedAction === 'update' ? labels.EVENT_UPDATED_MSG : labels.EVENT_DELETED_MSG
            positiveNotification(toast, toastMessage, '')
            dispatch(getEvents())
        } else errorNotification(toast, labels.DEFAULT_ERR_MSG)
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
            className='main-detail'
            header='Event Details'
            modal
            footer={eventModalFooter}
            onHide={hideModal}
        >
            <Toast ref={toast} />
            <EventDetalStyle>
                <form className='event-add-form'>
                    <EventNameField name={eventName} nameHandler={(e) => setEventName(e)} missing={invalidName} />
                    <CalendarComponent
                        missing={invalidDate}
                        dateHandler={dateHandler}
                        selectedDate={new Date(date)}
                    />
                    <EventDescField desc={eventDescription} descHandler={(e) => setDescription(e)}
                                    missing={invalidDesc} />
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
  display: grid;
  .detail-desc {
    margin-top: 2rem;
  }

  .event-detal-reminder {
    align-items: center;
    display: flex;
  }
  
  .event-add-form {
    display: grid;
    gap: 3rem;
    text-align: center;
    padding: clamp(1rem, 10vw, 4rem);
  }
`

export default memo(EventDetails)
