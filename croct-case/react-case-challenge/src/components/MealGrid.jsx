import React from 'react';
import PropTypes from 'prop-types';
import RecipeSnippet from './RecipeSnippet';

export default function MealGrid({ mealResult }) {
  const mealsMap = (arrMeals) => arrMeals.map((recipe) => (<RecipeSnippet recipe={recipe} />));

  const renderMeals = () => {
    const { meals } = mealResult;
    if (Array.isArray(meals)) {
      return mealsMap(meals);
    }
    return 'Loading recipes...';
  };

  return (
    <section>
      { renderMeals() }
    </section>
  );
}

MealGrid.propTypes = {
  mealResult: PropTypes.objectOf(PropTypes.array).isRequired,
};
