import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAllVoters = createSelector(
  (state: AppState) => state.voters,
  (state) => state.voters
);

export const selectNonVotedVoters = createSelector(
  (state: AppState) => state.voters,
  (state) => state.voters.filter((voter) => !voter.hasVoted)
);
