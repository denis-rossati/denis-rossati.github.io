/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import Main from '../pages/Main';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

describe('NextButton in Main Page', () => {
  it('takes you to the about page', () => {
    const { getByRole, history } = renderWithRouter(<Main />);
    const button = getByRole('link', {});
    fireEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('takes you to the projects page', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    const button = getByRole('link', {});
    fireEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/projects');
  });

  it('takes you to the contact page', () => {
    const { getByRole, history } = renderWithRouter(<Projects />);
    const button = getByRole('link', {});
    fireEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/contact');
  });

  it('takes you to the main page', () => {
    const { getByRole, history } = renderWithRouter(<Contact />);
    const button = getByRole('link', {});
    fireEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
