import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectAllCandidates = createSelector(
  (state: AppState) => state.candidates,
  (state) => state.candidates
)