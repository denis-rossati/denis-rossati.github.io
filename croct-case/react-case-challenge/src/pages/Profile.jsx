/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useCroct } from '@croct/plug-react';
import RecipeSnippet from '../components/RecipeSnippet';
import formatRecipes from '../helper/formatRecipes';

import './styles/Profile.css';

export default function Profile() {
  const croct = useCroct();
  // if I get employed, my first question is to know why does react and croct together could'nt
  // accept components mounted inside a function :(
  const [email, setEmail] = useState('Loading...');
  const [areaInterests, setAreaInterests] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(async () => {
    const loadEmail = async () => {
      await croct.evaluate('user\'s email')
        .then((loadedEmail) => setEmail(loadedEmail));
    };

    const foodInterests = async () => {
      await croct.evaluate('user\'s interests')
        .then((loadedInterests) => setAreaInterests(loadedInterests));
    };

    const loadRecipes = async () => {
      await croct.evaluate('user\' recipes')
        .then((loadedRecipes) => formatRecipes(loadedRecipes))
        .then((newRecipes) => (newRecipes
          ? setRecipes(newRecipes)
          : setRecipes([])));
    };

    await loadEmail();
    await foodInterests();
    await loadRecipes();
  }, []);

  const renderInterests = () => {
    const interests = areaInterests
      .reduce((acc, area) => {
        if (acc.indexOf(area) === -1) {
          acc.push(area);
        }
        return acc;
      }, [])
      .map((foodArea) => <li key={foodArea}>{foodArea}</li>);
    if (interests.length > 0) {
      return interests;
    }
    return <p>Actually, it looks like you haven&apos;t liked anything :p</p>;
  };

  const renderRecipes = () => {
    const interests = recipes.map((meal, index) => (
      <RecipeSnippet
        key={index}
        recipe={meal}
      />
    ));
    if (interests.length > 0) {
      return interests;
    }
    return (
      <section>
        <p>Nothing here too :(</p>
        <p>
          What about give a shot to our
          {' '}
          <a href="/main-page">recipes</a>
          ? ;)
        </p>
      </section>
    );
  };

  return (
    <main id="profile">
      <header id="interests">
        <p>
          Dear
          {' '}
          {email}
          ,
        </p>
        <p>
          according to the foods you liked, these are the type of food that you like:
        </p>
        <ul>
          { renderInterests() }
        </ul>
      </header>

      <p>And the foods you already liked are:</p>
      <div>
        { renderRecipes() }
      </div>
    </main>
  );
}
