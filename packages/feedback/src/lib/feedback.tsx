import { Route, Link } from 'react-router-dom';

import styles from './feedback.module.css';

/* eslint-disable-next-line */
export interface FeedbackProps {}

export function Feedback(props: FeedbackProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Feedback!</h1>

      <ul>
        <li>
          <Link to="/">packages/feedback/src/lib/feedback root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={
          <div>This is the packages/feedback/src/lib/feedback root route.</div>
        }
      />
    </div>
  );
}

export default Feedback;
