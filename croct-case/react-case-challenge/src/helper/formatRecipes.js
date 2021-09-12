const formatRecipes = (recipes) => {
  if (Array.isArray(recipes)) {
    const result = recipes.reduce((acc, recipe) => {
      let shouldBeIncluded = true;

      acc.forEach((obj) => {
        if (obj.id === recipe.id) shouldBeIncluded = false;
      });

      if (shouldBeIncluded && !Array.isArray(recipe)) {
        acc.push(recipe);
      }
      return acc;
    }, []).map(({
      id, thumb, title, area,
    }) => ({
      idMeal: id, strMealThumb: thumb, strMeal: title, strArea: area,
    }));
    return result;
  }
  return false;
};

export default formatRecipes;
