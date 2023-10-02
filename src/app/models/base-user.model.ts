export interface BaseUser {
  readonly id?: string;
  firstName: string;
  lastName: string;

  readonly createdAt?: string;
  readonly updatedAt?: string;
}
