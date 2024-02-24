import { Route, Link } from 'react-router-dom';

import styles from './ui.module.css';
import { ReactSubApp } from '@xarc/react';

/* eslint-disable-next-line */
export interface UiProps {}

export function Ui(props: UiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Ui!</h1>

      <ul>
        <li>
          <Link to="/">packages/ui/src/lib/ui root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={<div>This is the packages/ui/src/lib/ui root route.</div>}
      />
    </div>
  );
}

export default Ui;
export const subapp: ReactSubApp = {
  Component: Ui,
  wantFeatures: [],
};
