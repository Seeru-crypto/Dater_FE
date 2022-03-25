import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../../slicers/adminSlice';
import eventReducer from '../../slicers/eventSlice';
import LandingPage from './landing-page';

let store;

describe('landing page', () => {
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
        <LandingPage />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
});
