import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const REACT_CORE_FEATURE_KEY = 'reactCore';

/*
 * Update these interfaces according to your requirements.
 */
export interface ReactCoreEntity {
  id: number;
}

export interface ReactCoreState extends EntityState<ReactCoreEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const reactCoreAdapter = createEntityAdapter<ReactCoreEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchReactCore())
 * }, [dispatch]);
 * ```
 */
export const fetchReactCore = createAsyncThunk<ReactCoreEntity[]>(
  'reactCore/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getReactCores()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialReactCoreState: ReactCoreState =
  reactCoreAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const reactCoreSlice = createSlice({
  name: REACT_CORE_FEATURE_KEY,
  initialState: initialReactCoreState,
  reducers: {
    add: reactCoreAdapter.addOne,
    remove: reactCoreAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReactCore.pending, (state: ReactCoreState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchReactCore.fulfilled,
        (state: ReactCoreState, action: PayloadAction<ReactCoreEntity[]>) => {
          reactCoreAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchReactCore.rejected, (state: ReactCoreState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const reactCoreReducer = reactCoreSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(reactCoreActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const reactCoreActions = reactCoreSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllReactCore);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = reactCoreAdapter.getSelectors();

export const getReactCoreState = (rootState: {
  [REACT_CORE_FEATURE_KEY]: ReactCoreState;
}): ReactCoreState => rootState[REACT_CORE_FEATURE_KEY];

export const selectAllReactCore = createSelector(getReactCoreState, selectAll);

export const selectReactCoreEntities = createSelector(
  getReactCoreState,
  selectEntities
);
