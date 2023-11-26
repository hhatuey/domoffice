import {
  fetchReactCore,
  reactCoreAdapter,
  reactCoreReducer,
} from './react-core.slice';

describe('reactCore reducer', () => {
  it('should handle initial state', () => {
    const expected = reactCoreAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(reactCoreReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchReactCore', () => {
    let state = reactCoreReducer(undefined, fetchReactCore.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = reactCoreReducer(state, fetchReactCore.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = reactCoreReducer(
      state,
      fetchReactCore.rejected(new Error('Uh oh'), '')
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
