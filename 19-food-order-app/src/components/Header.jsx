import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './Button.jsx';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/ProgressContext.jsx';

export default function Header() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext);

  const totalCartItems = cartContext.items.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  function handleShowCart() {
    progressContext.showCart();
  }

  return (
    <header id="main-header">

      <div id="title">
        <img src={logo} alt="Restaurant logo" />
        <h1>ReactFood</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>Cart [{totalCartItems}]</Button>
      </nav>

    </header>
  );
}