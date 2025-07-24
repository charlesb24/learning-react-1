import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartProvider } from './store/CartContext.jsx';

function App() {
  return (
    <CartProvider>
      <Header />
      <Meals />
    </CartProvider>
  );
}

export default App;
