import React, { memo, useEffect, useRef, useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import styled from 'styled-components';
import { errorNotification, infoNotification, positiveNotification } from '../../utils/notifications';
import config from '../../config.json';
import { eventDataValidation } from '../../utils/dataValidation';

import { useAppDispatch } from '../../store';
import { deleteEvent, getEvents, saveUpdatedEvent } from '../../slicers/eventSlice';
import { EventCalendar, EventDescription, EventName, EventNumberOfDays, EventReminder, EventYearlyCb } from '../../components/event/event-index';
import EventMetaData from '../../components/event/event-metaData';

export function EventDetails({ selectedEvent, hideModal, modalState }) {
  const dispatch = useAppDispatch();
  const toast = useRef(null);
  const labels = config.LABELS;
  const [event, setEvent] = useState({
    name: '',
    date: '',
    reminder: false,
    description: '',
    reminderInDays: '',
    accountForYear: false,
  });
  const [invalidFields, setInvalidField] = useState({ name: false, description: false, date: false });

  const showHideModal = !!modalState;

  useEffect(() => {
    setEvent({
      name: selectedEvent.name,
      date: new Date(selectedEvent.date),
      reminder: selectedEvent.reminder,
      description: selectedEvent.description,
      reminderInDays: selectedEvent.reminderDays,
      accountForYear: selectedEvent.accountForYear,
      dateCreated: selectedEvent.dateCreated,
      dateUpdated: selectedEvent.dateUpdated,
    });
  }, [selectedEvent]);

  const dateHandler = (data) => {
    setEvent({ ...event, date: data });
  };

  const checkData = () => {
    const validationResult = eventDataValidation(event.name, event.date, event.description);
    if (validationResult.result) return updateEvent();
    const temp = { ...invalidFields };
    Object.keys(invalidFields).forEach((field) => (temp[field] = validationResult.property === field));
    setInvalidField(temp);
    infoNotification(toast, labels.INVALID_FORM_ERR_HEADER, labels.INVALID_FORM_ERR_HEADER);
  };

  const deleteConfirmationDialog = () => {
    confirmDialog({
      message: 'Do you want to delete this event?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteSelectedEvent(),
    });
  };

  const deleteSelectedEvent = async () =>
    afterRequestActions({
      requestResponse: await dispatch(deleteEvent(selectedEvent.id)),
      dispatchedAction: 'delete',
    });

  const updateEvent = async () => {
    const data = {
      id: selectedEvent.id,
      name: event.name,
      date: event.date,
      reminder: event.reminder,
      reminderDays: event.reminderInDays,
      description: event.description,
      accountForYear: event.accountForYear,
    };
    afterRequestActions({ requestResponse: await dispatch(saveUpdatedEvent(data)), dispatchedAction: 'update' });
  };

  const afterRequestActions = ({ requestResponse: res, dispatchedAction }) => {
    if (res.meta.requestStatus === 'fulfilled') {
      const toastMessage = dispatchedAction === 'update' ? labels.EVENT_UPDATED_MSG : labels.EVENT_DELETED_MSG;
      positiveNotification(toast, toastMessage, '');
      dispatch(getEvents());
    } else errorNotification(toast, labels.DEFAULT_ERR_MSG);
  };

  const eventModalFooter = (
    <>
      <Button label="Delete" icon="pi pi-check" className="p-button-text" onClick={() => deleteConfirmationDialog()} />
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideModal} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => checkData()} />
    </>
  );

  return (
    <DialogColorStyles>
      <Dialog
        visible={showHideModal}
        className="main-detail"
        header="Event Details"
        draggable={false}
        appendTo="self"
        modal
        footer={eventModalFooter}
        onHide={hideModal}
      >
        <Toast ref={toast} />
        <EventDetailStyle>
          <form className="event-add-form">
            <EventName name={event.name} nameHandler={(e) => setEvent({ ...event, name: e })} missing={invalidFields.name} />
            <EventCalendar missing={invalidFields.date} dateHandler={dateHandler} selectedDate={event.date} />
            <EventDescription
              desc={event.description}
              descHandler={(e) => setEvent({ ...event, description: e })}
              missing={invalidFields.description}
            />
            <EventReminder
              reminder={event.reminder}
              reminderHandler={(e) => {
                setEvent({ ...event, reminder: !event.reminder });
              }}
            />

            {event.reminder && (
              <div>
                <EventYearlyCb eventAccountForYear={event.accountForYear} changeHandler={(e) => setEvent({ ...event, accountForYear: e })} />
                <EventNumberOfDays eventReminderDays={event.reminderInDays} changeHandler={(e) => setEvent({ ...event, reminderInDays: e })} />
              </div>
            )}
            <EventMetaData dateCreated={event.dateCreated} dateUpdated={event.dateUpdated} />
          </form>
        </EventDetailStyle>
      </Dialog>
    </DialogColorStyles>
  );
}

const EventDetailStyle = styled.div`
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
`;

const DialogColorStyles = styled.div`
  .p-dialog-content,
  .p-dialog-footer {
    background-color: var(--bkg);
    color: var(--text);
  }
  .p-dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      color: var(--nav-text-color);
    }

    background-color: var(--nav-bkg-color);
  }
  .p-dialog-header {
    background-color: var(--nav-bkg-color);
    color: var(--text);
  }

  .p-button.p-button-text:enabled:hover {
    background-color: var(--nav-text-color);
    color: var(--add-border);
  }
`;

export default memo(EventDetails);
