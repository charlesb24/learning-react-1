import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartProvider } from './store/CartContext.jsx';
import { ProgressProvider } from './store/ProgressContext.jsx';
import Cart from './components/Cart.jsx';

function App() {
  return (
    <CartProvider>
      <ProgressProvider>
        <Header />
        <Meals />
        <Cart />
      </ProgressProvider>
    </CartProvider>
  );
}

export default App;
