import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

function Navigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              end
              className={ ({ isActive }) =>
                isActive ? classes.active : undefined
            }>
              Home
            </NavLink
            ></li>
          <li>
            <NavLink
              to="/products"
              end
              className={ ({ isActive }) =>
                isActive ? classes.active : undefined
            }>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;