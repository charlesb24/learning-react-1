import { currencyFormatter } from '../util/formatting.js';
import Button from './Button.jsx';
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';

export default function MealInfo({id, name, description, price, image }) {
  const cartContext = useContext(CartContext);

  function handleAddMealToCart() {
    cartContext.addItem({
      id,
      name,
      description,
      price,
      image,
    })
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{ name }</h3>
          <p className="meal-item-price">{ currencyFormatter.format(price) }</p>
          <p className="meal-item-description">{ description }</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}