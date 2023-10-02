import { Candidate } from 'src/app/models';

export const CANDIDATES_FEATURE_KEY = 'candidates';

export enum CandidatesActionStatus {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ADDING = 'adding',
  ADDED = 'added',
}

export type CandidatesState = {
  candidates: Candidate[];
  status: CandidatesActionStatus;
  error: string | null;
};

export const INIT_CANDIDATES_STATE: CandidatesState = {
  candidates: [],
  status: CandidatesActionStatus.INIT,
  error: null,
};
