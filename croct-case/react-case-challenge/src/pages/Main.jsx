import React, { useState, Suspense } from 'react';
import { Personalization } from '@croct/plug-react';
import MealGrid from '../components/MealGrid';
import SearchBar from '../components/SearchBar';
import CustomGreetingMessage from '../components/CustomGreetingMessage';

import findCountry from '../helper/findCountryName';

import './styles/Main.css';

export default function MainPage() {
  const [meals, setMeals] = useState({});

  const setMealByResult = async (value) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    const request = await fetch(url, { headers: { Accept: 'application/json' } });
    const response = await request.json();
    setMeals(response);
  };

  return (
    <div>
      <SearchBar searchFunction={setMealByResult} />
      <Suspense fallback="loading..">
        <Personalization expression="location's country">
          {(location) => (location
            ? <CustomGreetingMessage changeMealGrid={setMeals} country={findCountry(location)} />
            : <p>Welcome back ;)</p>)}
        </Personalization>
      </Suspense>
      <MealGrid mealResult={meals} />
    </div>
  );
}
