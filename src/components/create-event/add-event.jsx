import React, {memo, useEffect, useRef, useState} from 'react'
import { Toast } from 'primereact/toast'

import styled from 'styled-components'
import config from '../../config.json'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from '../form-fields/event-calendar'
import dataValidation from '../../custom-hooks/dataValidation'
import EventNameField from '../form-fields/event-name'
import EventDescField from '../form-fields/event-desc'
import EventSubmitButton from '../form-fields/event-submit-button'
import EventReminder from '../form-fields/event-reminder-cb'
import EventYearlyCb from '../form-fields/event-yearly-cb'
import EventNumberOfDays from '../form-fields/event-number-of-days'

import { useAppDispatch } from '../../store'
import { createEvent, getEvents } from '../../slicers/eventSlice'

const AddEvent = () => {
    const [eventName, setEventName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [eventDescription, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)
    const [accountForYear, setAccountForYear] = useState(false)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidDesc, setInvalidDesc] = useState(false)
    const [invalidDate, setInvalidDate] = useState(false)

    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const labels = config.LABELS
    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2);
        setDate(newDate)
    }

    const checkData = () => {
        const validationResult = dataValidation(eventName, date, eventDescription)
        validationResult.property === 'name' ? setInvalidName(true) : setInvalidName(false)
        validationResult.property === 'date' ? setInvalidDate(true) : setInvalidDate(false)
        validationResult.property === 'desc' ? setInvalidDesc(true) : setInvalidDesc(false)
        if (validationResult.result) return submitForm();
        infoNotification(toast, labels.INVALID_FORM_ERR_HEADER, '')
    }

    const submitForm = async () => {
        const reminderDays = (reminderInDays === '') ? '0' : reminderInDays
        const data = {
            name : eventName.trim(),
            date,
            reminder,
            reminderDays: reminderDays,
            description: eventDescription,
            accountForYear,
        }
        const res = await dispatch(createEvent(data))
        if (res.meta.requestStatus === 'fulfilled') {
            positiveNotification(toast, labels.EVENT_CREATED_MSG, '')
            anulAllFields()
            dispatch(getEvents())
        } else errorNotification(toast, labels.DEFAULT_ERR_MSG)
    }

    const anulAllFields = () => {
        setDate('')
        setDescription('')
        setEventName('')
        setReminder(false)
        setReminderInDays(0)
        setAccountForYear(false)
    }

    return (
        <EventStyle>
            <form className='event-add-form'>
                <h2 className='add-event-header'>add new event</h2>
                <Toast ref={toast} />
                <EventNameField name={eventName} nameHandler={(e) => setEventName(e)} missing={invalidName} />
                <CalendarComponent
                    missing={invalidDate}
                    dateHandler={dateHandler}
                    selectedDate={date}
                />

                <EventDescField desc={eventDescription} descHandler={(e) => setDescription(e)} missing={invalidDesc}
                />
                <EventReminder reminder={reminder} reminderHandler={() => setReminder(!reminder)} />

                {reminder && (
                    <div>
                        <EventYearlyCb eventAccountForYear={accountForYear}
                                       changeHandler={(e) => setAccountForYear(e)} />
                        <EventNumberOfDays eventReminderDays={reminderInDays}
                                           changeHandler={(e) => setReminderInDays(e)} />
                    </div>
                )}
                <EventSubmitButton onClickHandler={(e) => {
                    e.preventDefault()
                    checkData()
                }} />
            </form>
        </EventStyle>
    )
}

const EventStyle = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  transition: all 0.4s ease;
  background-color: var(--bkg);
  padding-bottom: 15rem;

  .event-loading {
    margin-top: 0.1rem;
  }

  .add-event-header {
    text-transform: uppercase;
  }

  .add-loading-bar {
    margin-top: 30px;
  }

  .event-add-form {
    display: grid;
    gap: 3rem;
    border: 4px solid var(--add-border);
    border-radius: .75rem;
    text-align: center;
    padding: clamp(1rem, 10vw, 4rem);
    margin: clamp(1rem, 10vw, 4rem);
  }
`

export default memo(AddEvent)
