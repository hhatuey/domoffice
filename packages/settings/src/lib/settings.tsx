import { Route, Link } from 'react-router-dom';

import styles from './settings.module.css';

/* eslint-disable-next-line */
export interface SettingsProps {}

export function Settings(props: SettingsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Settings!</h1>

      <ul>
        <li>
          <Link to="/">packages/settings/src/lib/settings root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={
          <div>This is the packages/settings/src/lib/settings root route.</div>
        }
      />
    </div>
  );
}

export default Settings;
