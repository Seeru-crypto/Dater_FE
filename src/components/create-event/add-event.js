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

import { useAppDispatch, useAppSelector } from '../../store'
import { createEvent, getEvents } from '../../slicers/eventSlice'
import LoadingBar from '../functional-components/loading-bar'

const AddEvent = () => {
    const [eventName, setEventName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [eventDescription, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)
    const [accountForYear, setAccountForYear] = useState(false)
    const [missingName, setMissingName] = useState(false)
    const [missingDate, setMissingDate] = useState(false)
    const loading = useAppSelector((state) => state.event.loading)

    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const labels = config.labels
    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2)
        setDate(newDate)
    }

    const checkData = () => {
        const validationResult = dataValidation(eventName, date, eventDescription)
        validationResult.property === 'name' ? setMissingName(true) : setMissingName(false)
        validationResult.property === 'date' ? setMissingDate(true) : setMissingDate(false)
        if (validationResult.result) return submitForm()
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
        <>
            <AddEventLoadingBar>

                <LoadingBar loading={loading} />

            </AddEventLoadingBar>

        <EventStyle>
            <form className='event-add-form'>
                <h2 className='add-event-header'>add new event</h2>
                <Toast ref={toast} />
                <EventNameField name={eventName} nameHandler={(e) => setEventName(e)} missing={missingName} />
                <CalendarComponent
                    missing={missingDate}
                    dateHandler={dateHandler}
                    selectedDate={date}
                />

                <EventDescField desc={eventDescription} descHandler={(e) => setDescription(e)} />
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
        </>
    )
}

const AddEventLoadingBar = styled.div`
  margin-top: 0.1rem;
`

const EventStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

  --btn: #3da9fc;
  --btntext: #fffffe;
  --text: #094067;
  --paragraph: #5f6c7b;
  --bkg: #fffffe;
  --err: #ef4565;

  font-family: 'Inter', sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: var(--bkg);

  .add-event-header {
    text-transform: uppercase;
  }
  .add-loading-bar{
    margin-top: 30px;
  }
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
