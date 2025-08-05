export interface Board {
  _id: string;
  title: string;
  description?: string;
  owner: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}
