import React, { memo, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

import styled from 'styled-components'
import config from '../../config.json'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from '../form-fields/calendar-component'
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
    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const labels = config.labels
    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2)
        setDate(newDate)
    }

    const checkData = () => {
        if (dataValidation(eventName, date)) return submitForm()
        infoNotification(toast, labels.invalidFormErrorHeader, labels.invalidFormErrorHeader)
    }

    const submitForm = async () => {
        const reminderDays = (reminderInDays === '') ? '0' : reminderInDays
        const data = {
            eventName,
            date,
            reminder,
            reminderDays: reminderDays,
            eventDescription,
            accountForYear,
        }
        const res = await dispatch(createEvent(data))
        if (res.meta.requestStatus === 'fulfilled') {
            positiveNotification(toast, labels.configUpdatedSuccessfullyMessage, '')
            anulAllFields()
            dispatch(getEvents())
        } else errorNotification(toast, labels.defaultErrorMessage)
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
                <h2>ADD NEW EVENT</h2>
                <Toast ref={toast} />
                <EventNameField name={eventName} nameHandler={(e) => setEventName(e)} />
                <CalendarComponent
                    dateHandler={dateHandler}
                    selectedDate={date}
                />

                <EventDescField desc={eventDescription} descHandler={(e) => setDescription(e)} />
                <EventReminder reminder={reminder} reminderHandler={() => setReminder(!reminder)} />

                {
                    reminder && (
                        <div>
                            <EventYearlyCb eventAccountForYear={accountForYear}
                                           changeHandler={(e) => setAccountForYear(e)} />
                            <EventNumberOfDays eventReminderDays={reminderInDays}
                                               changeHandler={(e) => setReminderInDays(e)} />
                        </div>
                    )}
                <EventSubmitButton onClickHandler={() => checkData()} />
            </form>
        </EventStyle>
    )
}

const EventStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

  --btn: #3da9fc;
  --btntext: #fffffe;
  --text: #094067;
  --paragraph: #5f6c7b;
  --bkg: #fffffe;

  font-family: 'Inter', sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh; // will position items in the middle
  background-color: var(--bkg);

  .event-add-form {
    display: grid;
    gap: 3rem;
    border: 4px solid var(--btn);
    border-radius: .75rem;
    text-align: center;
    padding: clamp(1rem, 10vw, 4rem);
    margin: clamp(1rem, 10vw, 4rem);
  }


`

export default memo(AddEvent)
