import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/main-page">
          <MainPage />
        </Route>
        <Route exact path="/:id">
          <RecipeDetails />
        </Route>
        <Route exact path="/">
          <LoginPage />
        </Route>
      </Switch>
      <footer id="back-to-main">
        <Link to="/main-page">
          Voltar à página principal
        </Link>
      </footer>
    </>
  );
}

export default App;
