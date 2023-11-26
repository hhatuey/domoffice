import { Route, Routes, Link } from 'react-router-dom';

import styles from './profile.module.css';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Profile!</h1>

      <ul>
        <li>
          <Link to="/">packages/profile/src/lib/profile root</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <div>This is the packages/profile/src/lib/profile root route.</div>
          }
        />
      </Routes>
    </div>
  );
}

export default Profile;
