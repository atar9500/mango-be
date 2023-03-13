export type Note = {
  id: string;
  author: string;
  title: string;
  content?: string;
  color: string;
  modifiedAt: number;
  createdAt: number;
  archived?: boolean;
};
