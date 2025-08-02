import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/cart/Cart';
import Notification from './components/ui/Notification';
import Layout from './components/layout/Layout';
import Products from './components/shop/Products';
import { uiActions } from './store/ui';

let isInitialLoad = true;
const FIREBASE_URL = '';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const notification = useSelector(state => state.ui.notification);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }));

      const res = await fetch(FIREBASE_URL, {
        method: 'PUT',
        body: JSON.stringify(cartItems),
      });

      if (!res.ok) {
        throw new Error('Failed to send cart data.');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      }));

      const resData = await res.json();
    }

    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }

    sendCartData().catch(err => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!',
      }));
    });

  }, [cartItems, dispatch]);

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
