import { useSelector } from 'react-redux';

import Cart from './components/cart/Cart';
import Layout from './components/layout/Layout';
import Products from './components/shop/Products';

function App() {
  const showCart = useSelector(state => state.ui.showCart);

  return (
    <Layout>
      { showCart && <Cart/> }
      <Products />
    </Layout>
  );
}

export default App;
