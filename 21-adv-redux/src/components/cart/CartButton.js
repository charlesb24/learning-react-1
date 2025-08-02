import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const handleToggleCart = () => {
    dispatch(uiActions.toggleCartVisibility());
  };

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{ totalQuantity }</span>
    </button>
  );
};

export default CartButton;
