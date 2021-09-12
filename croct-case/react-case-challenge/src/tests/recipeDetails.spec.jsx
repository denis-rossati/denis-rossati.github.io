/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import mockApiResponse from './helper/apiResponseMock';

describe('testing loading state', () => {
  it('Shold start with loading text', () => {
    const { getByText, history } = renderWithRouter(<RecipeDetails />);
    history.push('/52977');
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeDefined();
  });
});

describe('Testing page after backend have been throwed a response', () => {
  it('Should treat and load all the information in the response', () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockApiResponse),
    }));
    act(() => renderWithRouter(<RecipeDetails />));
    const titleMealText = screen.getByText('Teriyaki Chicken Casserole');
    const mealImage = screen.getByAltText('Teriyaki Chicken Casserole frame');
    expect(titleMealText).toBeDefined();
    expect(titleMealText).toBeDefined();
  });
});
