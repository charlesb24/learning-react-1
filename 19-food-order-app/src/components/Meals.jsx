import useHttp from '../hooks/useHttp.jsx';
import MealInfo from './MealInfo.jsx';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
  const { data: meals, loading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (loading) {
    return <p className="center">Loading...</p>
  }

  if (error) {
    return <Error title="Failed to load meals" message={error} />
  }

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