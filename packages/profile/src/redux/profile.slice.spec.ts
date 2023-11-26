import { fetchProfile, profileAdapter, profileReducer } from './profile.slice';

describe('profile reducer', () => {
  it('should handle initial state', () => {
    const expected = profileAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(profileReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchProfile', () => {
    let state = profileReducer(undefined, fetchProfile.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = profileReducer(state, fetchProfile.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = profileReducer(
      state,
      fetchProfile.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
