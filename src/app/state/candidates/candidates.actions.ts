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
  props<Candidate>()
);

// add a vote

export const addVote = createAction(
  '[Candidates] Add Vote',
  props<Pick<Candidate, 'id'>>()
);
