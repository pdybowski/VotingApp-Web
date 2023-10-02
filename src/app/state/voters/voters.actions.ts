import { createAction, props } from '@ngrx/store';
import { Voter } from 'src/app/models';

// load voters
export const loadVoters = createAction('[Voters] Load Voters');

export const loadVotersSuccess = createAction(
  '[Voters] Load Voters Success',
  props<{ voters: Voter[] }>()
);

export const loadVotersFailure = createAction(
  '[Voters] Load Voters Failure',
  props<{ error: string }>()
);

// add new voter

export const addVoter = createAction(
  '[Voters] Add Voter',
  props<Omit<Voter, 'id' | 'hasVoted'>>()
);

export const addVoterSuccess = createAction(
  '[Voters] Add Voters Success',
  props<Voter>()
);

export const addVoterFailure = createAction(
  '[Voters] Add Voters Failure',
  props<{ error: string }>()
);

// add a vote

export const addVote = createAction(
  '[Voters] Add Vote',
  props<Pick<Voter, 'id'>>()
);
