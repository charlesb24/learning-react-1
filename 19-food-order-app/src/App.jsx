import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import { ProgressProvider } from './store/ProgressContext.jsx';
import { CartProvider } from './store/CartContext.jsx';

function App() {
  return (
    <CartProvider>
      <ProgressProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </ProgressProvider>
    </CartProvider>
  );
}

export default App;
