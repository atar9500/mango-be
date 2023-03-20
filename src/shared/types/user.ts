export type UserAuth = {
  email: string;
  phoneNumber?: string;
};

export type UserAuthWithId = UserAuth & {id: string};

export type User = UserAuth & {
  firstName: string;
  lastName: string;
  joinedAt: number;
  avatar?: string;
};
