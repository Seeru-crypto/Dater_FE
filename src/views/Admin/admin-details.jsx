import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { checkEvents } from '../../slicers/eventSlice';
import { getLogs } from '../../slicers/adminSlice';
import config from '../../config.json';
import { useAppDispatch } from '../../store';

function AdminDetails({ logs, pollerValue, smsTo, currentPhoneNumber }) {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(null);
  const [lastMailTime, setLastMailTime] = useState('');

  const eventCheckHandler = () => {
    if (timer) clearTimeout(timer);
    const timeOut = setTimeout(() => checkEventAction(), config.HTTP_INTERVAL_VALUE);
    setTimer(timeOut);
  };

  const checkEventAction = async () => {
    const res = await dispatch(checkEvents());
    if (res.meta.requestStatus === 'fulfilled') dispatch(getLogs());
  };

  useEffect(() => {
    if (logs.length > 1) {
      const lastElementDateTime = new Date(logs[logs.length - 1].dateCreated);
      const formattedDate = new Date(lastElementDateTime).toLocaleString('en-GB');
      setLastMailTime(formattedDate);
    }
  }, [logs]);

  const getSentMessageCounter = (keyword) => {
    return logs.filter((log) => log.messageType === keyword).length;
  };

  return (
    <AdminDetailsStyle>
      <div className="details-header">
        <h3>Details</h3>
      </div>
      <div className="details-body">
        <p>Current polling rate: {pollerValue} min</p>
        <p>Emails sent to date: {getSentMessageCounter('mail')}</p>
        <p>sms notifications sent to date: {getSentMessageCounter('sms')}</p>
        <p>Last event sent: {lastMailTime}</p>
        <p>Currently set email: {smsTo}</p>
        <p>Currently set phone number: {currentPhoneNumber}</p>
      </div>

      <div className="details-footer">
        <button type="submit" onClick={() => eventCheckHandler()}>
          <i className="pi pi-envelope p-px-2" />
          <span>Check dates!</span>
        </button>
      </div>
    </AdminDetailsStyle>
  );
}

const AdminDetailsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 1rem 2rem;
  background-color: var(--side-nav-bkg);
  color: var(--nav-text-color);
  font-size: small;
  margin-left: 2rem;
  padding: 1rem;

  .details-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 14px;
  }

  .details-footer {
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: center;

    button {
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: black 1px solid;
      background-color: transparent;
      color: white;
      display: flex;
      align-items: center;
      transition: all 0.5s ease;
    }

    button:hover {
      transition: all 0.5s;
      color: var(--text);
      cursor: pointer;
      background-color: var(--add-border);
    }
  }

  @media (max-width: 960px) {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
`;
export default AdminDetails;
