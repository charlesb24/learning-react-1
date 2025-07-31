import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../store/auth';
import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleDeauthentication = () => {
    dispatch(authActions.deauthenticate());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && <nav>
        <ul>
          <li>
            <a href='/20-redux/public'>My Products</a>
          </li>
          <li>
            <a href='/20-redux/public'>My Sales</a>
          </li>
          <li>
            <button onClick={handleDeauthentication}>Logout</button>
          </li>
        </ul>
      </nav>}
    </header>
  );
};

export default Header;
