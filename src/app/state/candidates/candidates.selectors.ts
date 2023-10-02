import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CANDIDATES_FEATURE_KEY,
  CandidatesActionStatus,
  CandidatesState,
} from './candidates.store';

const selectCandidatesState = createFeatureSelector<CandidatesState>(
  CANDIDATES_FEATURE_KEY
);

export const selectAllCandidates = createSelector(
  selectCandidatesState,
  (state) => state.candidates
);

export const selectIsAllCandidatesLoading = createSelector(
  selectCandidatesState,
  (state) => state.status === CandidatesActionStatus.LOADING
);

export const selectIsCandidateAdding = createSelector(
  selectCandidatesState,
  (state) => state.status === CandidatesActionStatus.ADDING
);

export const selectError = createSelector(
  selectCandidatesState,
  (state) => state.error
);
