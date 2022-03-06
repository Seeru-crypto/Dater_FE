import React, {memo, useEffect, useRef, useState} from 'react'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'
import {confirmDialog} from 'primereact/confirmdialog'
import {Toast} from 'primereact/toast'
import {errorNotification, infoNotification, positiveNotification} from '../../utils/notifications'
import config from '../../config.json'
import {eventDataValidation} from '../../utils/dataValidation'
import styled from 'styled-components'

import {useAppDispatch} from '../../store'
import {deleteEvent, getEvents, saveUpdatedEvent} from '../../slicers/eventSlice'
import {
    EventCalendar,
    EventDescription,
    EventName,
    EventNumberOfDays,
    EventReminder,
    EventYearlyCb
} from "../../components/event/event-index";
import {dateFormatter} from "../../utils/helper-functions";
import EventMetaData from "../../components/event/event-metaData";

export const EventDetails = ({selectedEvent, hideModal, modalState,}) => {
    const dispatch = useAppDispatch()
    const toast = useRef(null)
    const labels = config.LABELS
    const [events, setEvents] = useState({
        name: "",
        date: "",
        reminder: false,
        description: "",
        reminderInDays: "",
        accountForYear: false
    })
    const [isoDate, setIsoDate] = useState(selectedEvent.date ? selectedEvent.date : null);
    const [invalidFields, setInvalidField] = useState({name: false, description: false, date: false});

    let showHideModal = !!modalState

    useEffect(() => {

        setEvents({
            name: selectedEvent.name,
            date: selectedEvent.date,
            reminder: selectedEvent.reminder,
            description: selectedEvent.description,
            reminderInDays: selectedEvent.reminderDays,
            accountForYear: selectedEvent.accountForYear,
            dateCreated: selectedEvent.dateCreated,
            dateUpdated: selectedEvent.dateUpdated
        })
    }, [selectedEvent])

    const dateHandler = (selectedDate) => {
        const dates = dateFormatter(selectedDate);
        console.log("dates", dates);
        setIsoDate(dates.date);
        setEvents({...events, date: dates.shortDate});
    }

    const checkData = () => {
        const validationResult = eventDataValidation(events.name, events.date, events.description)
        if (validationResult.result) return updateEvent()
        const temp = {...invalidFields}
        Object.keys(invalidFields).forEach((field) => temp[field] = validationResult.property === field);
        setInvalidField(temp);
        infoNotification(toast, labels.INVALID_FORM_ERR_HEADER, labels.INVALID_FORM_ERR_HEADER)
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

    const deleteSelectedEvent = async () => afterRequestActions({
        requestResponse: await dispatch(deleteEvent(selectedEvent.id)),
        dispatchedAction: 'delete',
    })

    const updateEvent = async () => {
        const data = {
            id: selectedEvent.id,
            name: events.name,
            date: isoDate,
            reminder: events.reminder,
            reminderDays: events.reminderInDays,
            description: events.description,
            accountForYear: events.accountForYear,
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
                    <EventName name={events.name} nameHandler={(e) => setEvents({...events, name: e})}
                               missing={invalidFields.name}/>
                    <EventCalendar
                        missing={invalidFields.date}
                        dateHandler={dateHandler}
                        selectedDate={new Date(events.date)}
                    />
                    <EventDescription desc={events.description}
                                      descHandler={(e) => setEvents({...events, description: e})}
                                      missing={invalidFields.description}/>
                    <EventReminder reminder={events.reminder} reminderHandler={((e) => {
                        console.log({e}, typeof e)
                        setEvents({...events, reminder: !events.reminder})
                    })}/>

                    {events.reminder && (
                        <div>
                            <EventYearlyCb eventAccountForYear={events.accountForYear}
                                           changeHandler={(e) => setEvents({...events, accountForYear: e})}/>
                            <EventNumberOfDays eventReminderDays={events.reminderInDays}
                                               changeHandler={(e) => setEvents({...events, reminderInDays: e})}/>
                        </div>
                    )}
                    <EventMetaData dateCreated={events.dateCreated} dateUpdated={events.dateUpdated} />
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
