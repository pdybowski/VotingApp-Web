import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  VOTERS_FEATURE_KEY,
  VotersActionStatus,
  VotersState,
} from './voters.store';

const selectVotersState =
  createFeatureSelector<VotersState>(VOTERS_FEATURE_KEY);

export const selectAllVoters = createSelector(
  selectVotersState,
  (state) => state.voters
);

export const selectNonVotedVoters = createSelector(selectVotersState, (state) =>
  state.voters.filter((voter) => !voter.hasVoted)
);

export const selectIsAllVotersLoading = createSelector(
  selectVotersState,
  (state) => state.status === VotersActionStatus.LOADING
);

export const selectIsVoterAdding = createSelector(
  selectVotersState,
  (state) => state.status === VotersActionStatus.ADDING
);

export const selectError = createSelector(
  selectVotersState,
  (state) => state.error
);
