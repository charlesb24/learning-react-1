import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';
import classes from './Root.module.css';

function Root() {
  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default Root;