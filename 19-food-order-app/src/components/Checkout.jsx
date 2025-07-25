import { useContext } from 'react';

import Input from './Input.jsx';
import Button from './Button.jsx';
import Modal from '../components/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/ProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext)

  const totalPrice = cartContext.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCheckout() {
    progressContext.hideCheckout();
  }

  return (
    <Modal open={progressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form>
        <h2>Checkout</h2>
        <p>Total: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Zip Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
          <Button type="button" onClick={() => null}>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}