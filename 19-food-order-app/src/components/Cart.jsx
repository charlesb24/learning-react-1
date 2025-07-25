import Modal from './Modal.jsx';
import Button from './Button.jsx';
import CartItem from './CartItem.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/ProgressContext.jsx';

import { useContext } from 'react';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext);

  const totalPrice = cartContext.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCart() {
    progressContext.hideCart();
  }

  function handleStartCheckout() {
    progressContext.showCheckout();
  }

  return (
    <Modal className="cart" open={progressContext.progress === 'cart'} onClose={progressContext.progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrement={() => cartContext.addItem(item)}
            onDecrement={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{ currencyFormatter.format(totalPrice) }</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartContext.items.length > 0 && <Button onClick={handleStartCheckout}>Checkout</Button>}
      </p>
    </Modal>
  );
}