import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminEmailField } from './admin-index';

describe('admin email field', () => {
  it('should render', () => {
    const email = 'email@gmail.com';
    render(<AdminEmailField email={email} emailHandler={() => {}} isDisabled={false} />);
    screen.getByDisplayValue(email);
  });
});
