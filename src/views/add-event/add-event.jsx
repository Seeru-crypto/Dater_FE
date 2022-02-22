import React, {memo, useRef, useState} from 'react'
import {Toast} from 'primereact/toast'

import styled from 'styled-components'
import config from '../../config.json'
import {errorNotification, infoNotification, positiveNotification} from '../../utils/notifications'
import {
    EventCalendar,
    EventDescription,
    EventName,
    EventNumberOfDays,
    EventReminder,
    EventSubmitButton,
    EventYearlyCb
} from "../../components/event/event-index";
import dataValidation from '../../utils/dataValidation'
import {motion} from "framer-motion";

import {useAppDispatch} from '../../store'
import {createEvent, getEvents} from '../../slicers/eventSlice'
import {addEventModalTransition} from "../../static/animations/motion";

const AddEvent = () => {
    const [event, setEvent] = useState({
        name: "",
        date: "",
        reminder: false,
        description: "",
        reminderInDays: 0,
        accountForYear: false
    })
    const [invalidFields, setInvalidField] = useState({name: false, description: false, date: false});

    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const labels = config.LABELS
    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2);
        setEvent({...event, date: newDate});
    }

    const checkData = () => {
        const validationResult = dataValidation(event.name, event.date, event.description)
        const temp = {...invalidFields}
        Object.keys(invalidFields).forEach((field) => {
            const isFieldInvalid = validationResult.property === field
            temp[field] = isFieldInvalid;
        })
        setInvalidField(temp);
        if (validationResult.result) return submitForm();
        infoNotification(toast, labels.INVALID_FORM_ERR_HEADER, '')
    }

    const submitForm = async () => {
        // ToDo fix this if statement
        const reminderDays = (event.reminderInDays === '') ? '0' : event.reminderInDays
        const data = {
            name: event.name.trim(),
            date: event.date,
            reminder: event.reminder,
            reminderDays: reminderDays,
            description: event.description,
            accountForYear: event.accountForYear,
        }
        const res = await dispatch(createEvent(data))
        if (res.meta.requestStatus === 'fulfilled') {
            positiveNotification(toast, labels.EVENT_CREATED_MSG, '')
            resetFields()
            dispatch(getEvents())
        } else errorNotification(toast, labels.DEFAULT_ERR_MSG)
    }

    const resetFields = () => setEvent({
        name: "",
        date: "",
        reminder: false,
        description: "",
        reminderInDays: 0,
        accountForYear: false
    })

    return (
        <EventStyle
            initial={addEventModalTransition.initial}
            animate={addEventModalTransition.animate}
            transition={addEventModalTransition.transition}
        >
            <form
                className='event-add-form'>
                <h2 className='add-event-header'>add new event</h2>
                <Toast ref={toast}/>
                <EventName name={event.name} nameHandler={(e) => setEvent({...event, name: e})}
                           missing={invalidFields.name}/>
                <EventCalendar
                    missing={invalidFields.date}
                    dateHandler={dateHandler}
                    selectedDate={event.date}
                />

                <EventDescription desc={event.description} descHandler={(e) => setEvent({...event, description: e})}
                                  missing={invalidFields.description}
                />
                <EventReminder reminder={event.reminder}
                               reminderHandler={() => setEvent({...event, reminder: !event.reminder})}/>

                {event.reminder && (
                    <div
                    >
                        <EventYearlyCb eventAccountForYear={event.accountForYear}
                                       changeHandler={(e) => setEvent({...event, accountForYear: e})}/>
                        <EventNumberOfDays eventReminderDays={event.reminderInDays}
                                           changeHandler={(e) => setEvent({...event, reminderInDays: e})}/>
                    </div>
                )}
                <EventSubmitButton onClickHandler={(e) => {
                    e.preventDefault()
                    checkData()
                }}/>
            </form>
        </EventStyle>
    )
}

const EventStyle = styled(motion.div)`
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
