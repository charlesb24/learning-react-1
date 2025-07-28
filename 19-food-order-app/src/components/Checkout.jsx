import { useContext, useActionState } from 'react';

import useHttp from '../hooks/useHttp.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';
import Error from './Error.jsx';
import Modal from '../components/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/ProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext)

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const totalPrice = cartContext.items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleCloseCheckout() {
    progressContext.hideCheckout();
  }

  function handleCompleteCheckout() {
    progressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

   async function handleCheckout(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(JSON.stringify({
      order: {
        items: cartContext.items,
        customer: customerData,
      },
    }));
  }

  const [ formState, formAction, pending ] = useActionState(handleCheckout, null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Placing order...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progressContext.progress === 'checkout'} onClose={handleCompleteCheckout}>
        <h2>Order placed</h2>
        <p>Your order has been received and is being processed.</p>
        <p>We will get back to you with more details once your order is ready.</p>
        <p className="modal-actions">
          <Button onClick={handleCompleteCheckout}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Zip Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">
          { actions }
        </p>
      </form>
    </Modal>
  );
}