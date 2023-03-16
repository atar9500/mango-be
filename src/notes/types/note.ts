export type Note = {
  id: string;
  title: string;
  snippet?: string;
  color: string;
  modifiedAt: number;
  createdAt: number;
  archived?: boolean;
  content?: string;
};
