/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* the disable above is about eslint not recognizing test patterns */
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { toBeDisabled, toBeEnabled } from '@testing-library/jest-dom/extend-expect';
import renderWithRouter from './helper/renderWithRouter';
import LoginPage from '../pages/LoginPage';

describe('Login page components existence', () => {
  it('Should have the right path', () => {
    const { history } = renderWithRouter(<LoginPage />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Should have two text inputs', () => {
    const { getByPlaceholderText } = renderWithRouter(<LoginPage />);
    const emailInput = getByPlaceholderText('e-mail');
    const passwordInput = getByPlaceholderText('password');
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('Should have a submit button', () => {
    const { getByRole } = renderWithRouter(<LoginPage />);
    const submitButton = getByRole('button', {
      type: 'submit',
    });
    expect(submitButton).toBeDefined();
  });
});

describe('Inputs in login page', () => {
  it('Should not allow email out of the following pattern: email@email.com', () => {
    const {
      getByPlaceholderText,
      getByRole,
    } = renderWithRouter(<LoginPage />);
    const emailInput = getByPlaceholderText('e-mail');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByRole('button', {
      type: 'submit',
    });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'emailNotValid.com' } });
    expect(submitButton).toBeDisabled();
  });

  it('Should not allow password with length lesser than 6', () => {
    const {
      getByPlaceholderText,
      getByRole,
    } = renderWithRouter(<LoginPage />);
    const emailInput = getByPlaceholderText('e-mail');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByRole('button', {
      type: 'submit',
    });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.change(emailInput, { target: { value: 'email@valid.com' } });
    expect(submitButton).toBeDisabled();
  });

  // I will correct it later
/*   it('Should allow the user\'s login', () => {
    const {
      getByPlaceholderText,
      getByRole,
    } = renderWithRouter(<LoginPage />);
    const emailInput = getByPlaceholderText('e-mail');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByRole('button', {
      type: 'submit',
    });
    expect(submitButton).toBeDisabled();
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'email@valid.com' } });
    fireEvent.change(emailInput, { target: { value: 'email@valid.com' } });
    expect(submitButton).toBeEnabled();
  }); */
});
