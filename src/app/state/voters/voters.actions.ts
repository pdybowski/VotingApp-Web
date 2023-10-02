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

export const addVoter = createAction('[Voters] Add Voter', props<Voter>());

// add a vote

export const addVote = createAction(
  '[Voters] Add Vote',
  props<Pick<Voter, 'id'>>()
);
