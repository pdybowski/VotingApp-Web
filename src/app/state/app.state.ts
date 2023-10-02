import { CandidatesState } from './candidates/candidates.store';
import { VotersState } from './voters/voters.store';

export type AppState = {
  candidates: CandidatesState;
  voters: VotersState;
};
