import * as CandidateAction from './candidates.actions';
import { createReducer, on } from '@ngrx/store';
import {
  INIT_CANDIDATES_STATE,
  CandidatesActionStatus,
} from './candidates.store';

export const candidateReducer = createReducer(
  INIT_CANDIDATES_STATE,
  // load candidates
  on(CandidateAction.loadCandidates, (state) => {
    return {
      ...state,
      status: CandidatesActionStatus.LOADING,
    };
  }),
  on(CandidateAction.loadCandidatesSuccess, (state, { candidates }) => {
    return {
      ...state,
      candidates: candidates,
      status: CandidatesActionStatus.LOADED,
      error: null,
    };
  }),
  on(CandidateAction.loadCandidatesFailure, (state, { error }) => {
    return {
      ...state,
      candidates: [],
      status: CandidatesActionStatus.LOADED,
      error: error || 'Unable to load candidates.',
    };
  }),
  // add new candidate
  on(CandidateAction.addCandidate, (state) => {
    return {
      ...state,
      status: CandidatesActionStatus.ADDING,
    };
  }),
  on(CandidateAction.addCandidateSuccess, (state, candidate) => {
    return {
      ...state,
      candidates: [...state.candidates, candidate],
      status: CandidatesActionStatus.ADDED,
      error: null,
    };
  }),
  on(CandidateAction.addCandidateFailure, (state, { error }) => {
    return {
      ...state,
      status: CandidatesActionStatus.ADDED,
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
