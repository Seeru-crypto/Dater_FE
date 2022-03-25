import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../../slicers/adminSlice';
import eventReducer from '../../slicers/eventSlice';
import AddEvent from './add-event';

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
    //toDo finish test
  });

  it('should give error when submitting too long name', () => {
    //toDo finish test
  });
});
