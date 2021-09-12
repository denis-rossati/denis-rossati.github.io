import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import formatObject from '../helper/formatObject';

export default function RecipeDetails() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [mealContent, setMealContent] = useState({});

  const renderContent = () => (isLoading && mealContent.idMeal
    ? (<p>Loading...</p>) : <Recipe mealDetails={mealContent} />);

  useEffect(() => {
    const fetchingMeal = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(url, { headers: { Accept: 'application/json' } });
      const { meals: [meals] } = await request.json();
      setIsLoading(false);
      const formatedObject = formatObject(meals);
      setMealContent(formatedObject);
    };
    fetchingMeal();
  }, []);

  return (
    <div>
      {
        renderContent()
      }
    </div>
  );
}
