import {UserAuth} from '~/shared/types/user';

export type UserDetails = {
  firstName: string;
  lastName: string;
  joinedAt: number;
  avatar?: string;
};

export type User = UserAuth & UserDetails;
