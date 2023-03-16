export type UserAuth = {
  id: string;
  email: string;
  phoneNumber?: string;
};

export type User = UserAuth & {
  firstName: string;
  lastName: string;
  joinedAt: number;
  avatar?: string;
};
