import { BaseUser } from './base-user.model';

export interface Voter extends BaseUser {
  hasVoted: boolean;
}
