/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCroct } from '@croct/plug-react';

import './styles/CustomGreetingMessage.css';

export default function CustomGreetingMessage({ country, changeMealGrid }) {
  const croct = useCroct();
  const [haveFindRecipe, setHaveFindedRecipe] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState(`Sorry, we could'nt find any recipe from ${country} :( \n let's show these recipes:`);

  const addAreaToMeals = (data, area) => data.meals.map((meal) => {
    const dish = meal;
    if (!(meal.strArea)) {
      dish.strArea = area;
    }
    return dish;
  });

  const fetchRandomUserInterest = async (interests) => {
    const randomIndex = Math.round(Math.random() * (interests.length - 1));
    const typeOfFood = interests[randomIndex];
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${typeOfFood}`;
    const response = await fetch(url);
    const data = await response.json();
    data.meals = addAreaToMeals(data, typeOfFood);
    changeMealGrid(data);
    setGreetingMessage(`Based on your interests, we are showing you some ${typeOfFood} food!`);
  };

  const fetchFirstTimeHere = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    changeMealGrid(data);
    setGreetingMessage('It\'s your first time here :D? Here is a selection of our best recipes:');
  };

  const emergencyRecipes = async () => {
    const isReturning = await croct.evaluate('user is returning');
    const interests = await croct.evaluate('user\'s interests');
    if (isReturning || interests.length > 0) {
      fetchRandomUserInterest(interests);
    } else {
      fetchFirstTimeHere();
    }
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          changeMealGrid(data.meals);
        } else {
          setHaveFindedRecipe(false);
          emergencyRecipes();
        }
      })
      .catch(() => emergencyRecipes());
  }, []);

  return (
    <div id="greeting-message">
      { haveFindRecipe
        ? `Since you're from ${country}, let's show you some local recipes!`
        : greetingMessage}
    </div>
  );
}

CustomGreetingMessage.propTypes = {
  country: PropTypes.string.isRequired,
  changeMealGrid: PropTypes.func.isRequired,
};
