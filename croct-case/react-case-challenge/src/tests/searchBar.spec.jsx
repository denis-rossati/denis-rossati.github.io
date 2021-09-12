/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* the disable above is about eslint not recognizing test patterns */
import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import SearchBar from '../components/SearchBar';

describe('Check existence of searchBar components', () => {
  it('Should have a text input', () => {
    const { getByRole } = renderWithRouter(<SearchBar />);
    const textInput = getByRole('textbox', {
      Name: 'search-box',
    });
    expect(textInput).toBeDefined();
  });
  it('Should have a magnifier icon', () => {
    const { getByAltText } = renderWithRouter(<SearchBar />);
    const magnifierImage = getByAltText('Magnifier frame');
    expect(magnifierImage).toBeDefined();
  });
});
