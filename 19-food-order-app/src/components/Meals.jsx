import { useEffect, useState } from 'react';
import MealInfo from "./MealInfo.jsx";

export default function Meals() {
  const [ meals, setMeals ] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch('http://localhost:3000/meals');

      if (!res.ok) {
        return;
      }

      const mealData = await res.json();

      setMeals(mealData);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map(meal => (
        <MealInfo
          key={meal.id}
          id={meal.id}
          name = {meal.name}
          description = {meal.description}
          price = {meal.price}
          image={meal.image} />
      ))}
    </ul>
  );
}