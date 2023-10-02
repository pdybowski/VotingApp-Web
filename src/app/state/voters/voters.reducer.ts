import { createReducer, on } from '@ngrx/store';
import * as VoterActions from './voters.actions';
import { Voter } from 'src/app/models';

export type VoterState = {
  voters: Voter[];
  isLoading: boolean;
  isAddignNew: boolean;
  error: string | null;
};

const initialState: VoterState = {
  voters: [],
  isLoading: false,
  isAddignNew: false,
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
      error: error || 'Unable to load voters.',
    };
  }),
  on(VoterActions.addVoter, (state) => {
    return {
      ...state,
      isAddignNew: true,
    };
  }),
  on(VoterActions.addVoterSuccess, (state, voter) => {
    return {
      ...state,
      voters: [...state.voters, voter],
      isAddignNew: false,
      error: null,
    };
  }),
  on(VoterActions.addVoterFailure, (state, { error }) => {
    return {
      ...state,
      isAddignNew: false,
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
