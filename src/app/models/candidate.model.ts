import { BaseUser } from './base-user.model';

export interface Candidate extends BaseUser {
  votes: number;
}
