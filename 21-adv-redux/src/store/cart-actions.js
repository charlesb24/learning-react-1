import { uiActions } from './ui';
import { cartActions } from './cart';

const FIREBASE_URL = 'https://your-rtdb.firebaseio.com/cart.json';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(FIREBASE_URL);

      if (!res.ok) {
        throw new Error('Failed to retrieve cart data.');
      }

      return await res.json();
    }

    try {
      const resData = await fetchData();

      dispatch(cartActions.replaceCart({
        items: resData?.items || [],
        totalQuantity: resData?.totalQuantity || 0,
        totalPrice: resData?.totalPrice || 0,
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Retrieving cart data failed!',
      }));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    }));

    const sendRequest = async () => {
      const res = await fetch(FIREBASE_URL, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalPrice: cart.totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send cart data.');
      }
    };

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!',
      }));
    }

  };
};