import { Route, Link } from 'react-router-dom';

import styles from './home.module.css';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Home!</h1>

      <ul>
        <li>
          <Link to="/">packages/home/src/lib/home root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={<div>This is the packages/home/src/lib/home root route.</div>}
      />
    </div>
  );
}

export default Home;
