import React, { memo, useRef, useState } from 'react'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

import styled from 'styled-components'
import config from '../../config.json'
import { errorNotification, infoNotification, positiveNotification } from '../../custom-hooks/notifications'
import CalendarComponent from './calendar-component'
import dataValidation from '../../custom-hooks/dataValidation'
import {
    EventAccountForYear,
    EventDescription,
    EventName,
    EventReminder,
    EventReminderInDays,
} from '../form-components/fields'
import { useAppDispatch } from '../../store'
import { createEvent, getEvents } from '../../slicers/eventSlice'

const AddEvent = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const [description, setDescription] = useState('')
    const [reminderInDays, setReminderInDays] = useState(0)
    const [accountForYear, setAccountForYear] = useState(false)
    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const labels = config.labels
    const invalidFormErrorHeader = labels.invalidFormErrorHeader
    const dateHandler = (data) => {
        const newDate = data
        newDate.setHours(data.getHours() + 2)
        setDate(newDate)
    }

    const checkData = () => {
        if (dataValidation(name, date)) return submitForm()
        infoNotification(toast, invalidFormErrorHeader, invalidFormErrorHeader)
    }

    const submitForm = () => {
        const data = {
            eventName: name,
            date: date,
            reminder: reminder,
            reminderDays: reminderInDays,
            description: description,
            accountForYear,
        }
        dispatch(createEvent(data)).then(() => {
            dispatch(getEvents())
            positiveNotification(toast, labels.eventCreatedMessage, '')
            anulAllFields()
        }).catch(() => errorNotification(toast, labels.defaultErrorMessage))
    }

    const anulAllFields = () => {
        setDate('')
        setDescription('')
        setName('')
        setReminder(false)
        setReminderInDays(0)
        setAccountForYear(false)
    }

    return (
        <Card style={{ marginBottom: '2rem' }}>
            <Toast ref={toast} />
            <div className='p-d-flex p-flex-wrap-reverse'>
                <div className='p-field p-col'>
                    <div className='p-field p-col'>
                        <EventName
                            name={name}
                            nameHandler={(e) => setName(e)}
                        />
                    </div>
                </div>

                <div className='p-field p-col'>
                    <div className='p-field p-col'>
                        <CalendarComponent
                            dateHandler={dateHandler}
                            selectedDate={date}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{ marginTop: '.5rem' }}
                className='p-fluid p-formgrid p-grid'
            >
                <div className='p-field p-col'>
                    <EventDescription
                        desc={description}
                        descHandler={(e) => setDescription(e)}
                    />
                </div>

                <div className='p-field p-col'>
                    <h5 style={{ padding: '.5rem' }}>Additional settings:</h5>
                    <div className='p-field-checkbox'>
                        <EventReminder
                            reminder={reminder}
                            reminderHandler={(e) => setReminder(e)}
                        />
                    </div>
                    {reminder && (
                        <div>
                            <EventAccountForYear
                                eventAccountForYear={accountForYear}
                                changeHandler={(e) => setAccountForYear(e)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {reminder && (
                <div
                    style={{ width: '50%' }}
                    className='p-fluid p-formgrid p-grid'
                >
                    <EventReminderInDays
                        eventReminderDays={reminderInDays}
                        changeHandler={(e) => setReminderInDays(e)}
                    />
                </div>
            )}
            <div
                className='p-fluid p-formgrid p-grid'
                style={{
                    marginTop: '2rem',
                    justifyContent: 'center',
                }}
            >
                <Button
                    label='Add Event'
                    style={{
                        display: 'flex',
                        padding: '1rem',
                        width: '15rem',
                        marginBottom: '1rem',
                    }}
                    className='p-button-rounded p-button-secondary'
                    onClick={checkData}
                />
                <ChatContentStyles>
                    test
                </ChatContentStyles>
            </div>
        </Card>
    )
}

const ChatContentStyles = styled.div`
  align-self: center;
  flex: 1;
  color: red;
  overflow-y: auto;
  width: 100%;
`

export default memo(AddEvent)
