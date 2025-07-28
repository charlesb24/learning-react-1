import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/20-redux/public'>My Products</a>
          </li>
          <li>
            <a href='/20-redux/public'>My Sales</a>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
