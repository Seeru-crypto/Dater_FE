import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FullDisplayCalendar from '../../components/full-calendar/FullDisplayCalendar';
import config from '../../config.json';
import { useAppDispatch, useAppSelector } from '../../store';
import { getEvents } from '../../slicers/eventSlice';
import LoadingBar from '../../components/functional-components/loading-bar';
import ErrorBar from '../../components/functional-components/error-bar';

function Calendar() {
  const [formattedDates, setFormattedDates] = useState([]);
  const { error, loading, events } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error !== '') {
      const timer = setInterval(() => {
        dispatch(getEvents());
      }, config.HTTP_INTERVAL_VALUE);
      return () => clearTimeout(timer);
    }
    if (events && formattedDates !== []) {
      const eventDataBody = events;
      const currentYear = new Date().getFullYear();
      const newList = eventDataBody.map((event) => {
        const newDate = currentYear + event.date.substring(4, 10);
        return { title: event.name, date: newDate };
      });
      setFormattedDates(newList);
    }
  }, [error, dispatch, events]);

  useEffect(() => {
    if (events[0] === undefined) dispatch(getEvents());
  }, []);

  return (
    <CalendarStyle>
      <ErrorBar error={error} />
      {!loading && !error && (
        <div className="main-calendar">
          <p> This is a general view, where all events are displayed.</p>
          <FullDisplayCalendar eventData={formattedDates} />
        </div>
      )}
      <LoadingBar loading={loading} />
    </CalendarStyle>
  );
}

const CalendarStyle = styled.div`
  .main-calendar {
    padding: 2rem;
  }
`;
export default Calendar;
