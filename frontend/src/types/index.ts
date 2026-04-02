export type User = {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
};

export type Folder = {
  id: number;
  user: User;
  name: string;
  parent?: Folder | null;
  created_at: string;
  updated_at: string;
};

export type Bookmark = {
  id: number;
  user: User;
  title: string;
  url: string;
  note?: string;
  folder: Folder | null;
  created_at?: string;
  updated_at?: string;
  capture_session?: number | null;
};
