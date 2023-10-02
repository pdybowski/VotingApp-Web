import { Voter } from 'src/app/models';

export const VOTERS_FEATURE_KEY = 'voters';

export enum VotersActionStatus {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ADDING = 'adding',
  ADDED = 'added',
}

export type VotersState = {
  voters: Voter[];
  status: VotersActionStatus;
  error: string | null;
};

export const INIT_VOTERS_STATE: VotersState = {
  voters: [],
  status: VotersActionStatus.INIT,
  error: null,
};
