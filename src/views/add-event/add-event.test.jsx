import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../../slicers/adminSlice';
import eventReducer from '../../slicers/eventSlice';
import AddEvent from './add-event';
import EventService from '../../services/eventService';

let store;

describe('add event', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        adminReducer,
        eventReducer,
      },
    });
  });

  it('should render', () => {
    render(
      <Provider store={store}>
        <AddEvent />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  it('should call post service when all fields are filled', () => {
    EventService.saveEvent = jest.fn(() => Promise.resolve());
    render(
      <Provider store={store}>
        <AddEvent />
      </Provider>
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: /event name/i,
      }),
      { target: { value: 'event name' } }
    );
    fireEvent.click(screen.getByText(/do you want reminders\?/i));
    screen.getByText('event name');

    fireEvent.click(
      screen.getByRole('button', {
        name: /save/i,
      })
    );
    expect(EventService.saveEvent).toHaveBeenCalled();
  });
});
