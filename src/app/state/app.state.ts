import { CandidateState } from './candidates/candidates.reducer';
import { VoterState } from './voters/voters.reducer';

export type AppState = {
  candidates: CandidateState;
  voters: VoterState;
};
