import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';
import classes from '@/components/main-header/main-header.module.css';
import MainHeaderBackground from '@/components/main-header/main-header-background';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>

        <Link className={classes.logo} href="/26-next-js/main-project/public">
          <Image
            src={logo}
            alt="A plate with food on it"
            priority
          />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>

      </header>
    </>
  );
}