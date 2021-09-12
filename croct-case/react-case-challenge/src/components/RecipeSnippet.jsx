import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/RecipeSnippet.css';

export default function RecipeSnippet({ recipe }) {
  const {
    idMeal, strMealThumb, strMeal, strArea,
  } = recipe;
  return (
    <div className="recipe-snippet" key={idMeal}>
      <Link to={`/${idMeal}`}>
        <img src={strMealThumb} alt="Recipe after being prepared" />
        <div>
          <p>{strMeal}</p>
          <p>{ `${strArea} food` }</p>
        </div>
      </Link>
    </div>
  );
}

RecipeSnippet.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
