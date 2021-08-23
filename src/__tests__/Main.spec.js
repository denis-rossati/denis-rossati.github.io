import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import Main from '../pages/Main';

describe('Main.jsx', () => {
  it('renders Main component', () => {
    const { history } = renderWithRouter(<Main />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('takes to another page', () => {
    const { getByRole, history } = renderWithRouter(<Main />);
    const nextButton = getByRole('link', {
      name: 'next-page-button',
    });

    fireEvent.click(nextButton);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('has the greeting', () => {
    const { getByText } = renderWithRouter(<Main />);
    const greeting = getByText('Hi, I\'m Denis');
    expect(greeting).toBeDefined();
    expect(greeting).toBeVisible();
    expect(greeting).toHaveTextContent('Hi, I\'m Denis');
  });
});