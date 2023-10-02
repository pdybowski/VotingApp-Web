import { Candidate } from 'src/app/models';
import * as CandidateAction from './candidates.actions';
import { combineReducers, createReducer, on } from '@ngrx/store';

export type CandidateState = {
  candidates: Candidate[];
  isLoading: boolean;
  isAddingNew: boolean;
  error: string | null;
};

const initialState: CandidateState = {
  candidates: [],
  isLoading: false,
  isAddingNew: false,
  error: null,
};

export const candidateReducer = createReducer(
  initialState,
  // load candidates
  on(CandidateAction.loadCandidates, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CandidateAction.loadCandidatesSuccess, (state, { candidates }) => {
    return {
      ...state,
      candidates: candidates,
      isLoading: false,
      error: null,
    };
  }),
  on(CandidateAction.loadCandidatesFailure, (state, { error }) => {
    return {
      ...state,
      candidates: [],
      isLoading: false,
      error: error || 'Unable to load candidates.',
    };
  }),
  // add new candidate
  on(CandidateAction.addCandidate, (state) => {
    return {
      ...state,
      isAddingNew: true,
    };
  }),
  on(CandidateAction.addCandidateSuccess, (state, candidate) => {
    return {
      ...state,
      candidates: [...state.candidates, candidate],
      isAddingNew: false,
      error: null,
    };
  }),
  on(CandidateAction.addCandidateFailure, (state, { error }) => {
    return {
      ...state,
      isAddingNew: false,
      error: error || 'Unable to add new candidate.',
    };
  }),
  // add a vote
  on(CandidateAction.addVote, (state, { id }) => {
    return {
      ...state,
      candidates: state.candidates.map((candidate) => {
        if (candidate.id !== id) return candidate;
        return {
          ...candidate,
          votes: candidate.votes + 1,
        };
      }),
    };
  })
);
