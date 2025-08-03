import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/cart/Cart';
import Notification from './components/ui/Notification';
import Layout from './components/layout/Layout';
import Products from './components/shop/Products';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <>
      { notification &&
        <Notification
          status={notification?.status}
          title={notification?.title}
          message={notification?.message}
        /> }
      <Layout>
        { showCart && <Cart/> }
        <Products />
      </Layout>
    </>
  );
}

export default App;
