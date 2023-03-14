export type Note = {
  id: string;
  title: string;
  content?: string;
  snippet?: string;
  color: string;
  modifiedAt: number;
  createdAt: number;
  archived?: boolean;
};
