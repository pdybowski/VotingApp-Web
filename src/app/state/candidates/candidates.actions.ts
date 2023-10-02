import { createAction, props } from '@ngrx/store';
import { Candidate } from 'src/app/models';

// load candidates
export const loadCandidates = createAction('[Candidates] Load Candidates');

export const loadCandidatesSuccess = createAction(
  '[Candidates] Candidates Load Success',
  props<{ candidates: Candidate[] }>()
);

export const loadCandidatesFailure = createAction(
  '[Candidates] Candidates Load Failure',
  props<{ error: string }>()
);

// add new candidate

export const addCandidate = createAction(
  '[Candidates] Add Candidate',
  props<Omit<Candidate, 'id' | 'votes'>>()
);

export const addCandidateSuccess = createAction(
  '[Candidates] Add Candidate Success',
  props<Candidate>()
);

export const addCandidateFailure = createAction(
  '[Candidates] Add Candidate Failure',
  props<{ error: string }>()
);

// add a vote

export const addVote = createAction(
  '[Candidates] Add Vote',
  props<Pick<Candidate, 'id'>>()
);
