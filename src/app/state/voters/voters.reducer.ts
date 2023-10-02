import { createReducer, on } from '@ngrx/store';
import * as VoterActions from './voters.actions';
import { Voter } from 'src/app/models';

export type VoterState = {
  voters: Voter[];
  isLoading: boolean;
  error: string | null;
};

const initialState: VoterState = {
  voters: [],
  isLoading: false,
  error: null,
};

export const votersReducer = createReducer(
  initialState,
  on(VoterActions.loadVoters, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(VoterActions.loadVotersSuccess, (state, { voters }) => {
    return {
      ...state,
      voters: voters,
      isLoading: false,
      error: null,
    };
  }),
  on(VoterActions.loadVotersFailure, (state, { error }) => {
    return {
      ...state,
      voters: [],
      isLoading: false,
      error: error || 'Unable to load voters',
    };
  }),
  on(VoterActions.addVoter, (state, newVoter) => {
    return {
      ...state,
      voters: [...state.voters, newVoter],
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
