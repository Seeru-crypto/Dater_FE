import React from 'react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../../slicers/adminSlice';
import eventReducer from '../../slicers/eventSlice';

let store;

describe('admin page', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        adminReducer,
        eventReducer,
      },
    });
  });

  it('should render page with test data', () => {
    //ToDo finish test
  });

  it('input field should be disabled by default', () => {
    //ToDo finish test
  });

  it('after changing checkbox submit button should appear', () => {
    //toDo finish test
  });

  it('should send post request after filling fields with given data', () => {
    //toDo finish test
  });
});
