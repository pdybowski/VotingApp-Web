import { createReducer, on } from '@ngrx/store';
import * as VoterActions from './voters.actions';
import { INIT_VOTERS_STATE, VotersActionStatus } from './voters.store';

export const votersReducer = createReducer(
  INIT_VOTERS_STATE,
  on(VoterActions.loadVoters, (state) => {
    return {
      ...state,
      status: VotersActionStatus.LOADING,
    };
  }),
  on(VoterActions.loadVotersSuccess, (state, { voters }) => {
    return {
      ...state,
      voters: voters,
      status: VotersActionStatus.LOADED,
      error: null,
    };
  }),
  on(VoterActions.loadVotersFailure, (state, { error }) => {
    return {
      ...state,
      voters: [],
      status: VotersActionStatus.LOADED,
      error: error || 'Unable to load voters.',
    };
  }),
  on(VoterActions.addVoter, (state) => {
    return {
      ...state,
      status: VotersActionStatus.ADDING,
    };
  }),
  on(VoterActions.addVoterSuccess, (state, voter) => {
    return {
      ...state,
      voters: [...state.voters, voter],
      status: VotersActionStatus.ADDED,
      error: null,
    };
  }),
  on(VoterActions.addVoterFailure, (state, { error }) => {
    return {
      ...state,
      status: VotersActionStatus.ADDED,
      error: error || 'Unable to add new voter.',
    };
  }),
  on(VoterActions.addVote, (state, { id }) => {
    return {
      ...state,
      voters: state.voters.map((voter) => {
        if (voter.id !== id) return voter;
        return {
          ...voter,
          hasVoted: true,
        };
      }),
    };
  })
);
