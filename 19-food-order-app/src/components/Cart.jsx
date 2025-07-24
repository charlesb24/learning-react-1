import Modal from './Modal.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/ProgressContext.jsx';

import { useContext } from 'react';
import Button from './Button.jsx';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext);

  const totalPrice = cartContext.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCart() {
    progressContext.hideCart();
  }

  return (
    <Modal className="cart" open={progressContext.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map(item => (
          <li key={item.id}>
            { item.name } | { item.quantity }
          </li>
        ))}
      </ul>
      <p className="cart-total">{ currencyFormatter.format(totalPrice) }</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  )
}