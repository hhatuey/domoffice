import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const PROFILE_FEATURE_KEY = 'profileReducer';

/*
 * Update these interfaces according to your requirements.
 */
export interface ProfileEntity {
  id: number;
}

export interface ProfileState extends EntityState<ProfileEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const profileAdapter = createEntityAdapter<ProfileEntity>();

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
 *   dispatch(fetchProfile())
 * }, [dispatch]);
 * ```
 */
export const fetchProfile = createAsyncThunk<ProfileEntity[]>(
  'profile/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getProfiles()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialProfileState: ProfileState = profileAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const profileSlice = createSlice({
  name: PROFILE_FEATURE_KEY,
  initialState: initialProfileState,
  reducers: {
    add: profileAdapter.addOne,
    remove: profileAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state: ProfileState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchProfile.fulfilled,
        (state: ProfileState, action: PayloadAction<ProfileEntity[]>) => {
          profileAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchProfile.rejected, (state: ProfileState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const profileReducer = profileSlice.reducer;

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
 *   dispatch(profileActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const profileActions = profileSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllProfile);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = profileAdapter.getSelectors();

export const getProfileState = (rootState: {
  [PROFILE_FEATURE_KEY]: ProfileState;
}): ProfileState => rootState[PROFILE_FEATURE_KEY];

export const selectAllProfile = createSelector(getProfileState, selectAll);

export const selectProfileEntities = createSelector(
  getProfileState,
  selectEntities
);
