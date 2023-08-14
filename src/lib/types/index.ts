export interface Photo {
  url: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  user: User;
}

export interface Comment {
  message: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  photo: Photo;
}

export interface User {
  username: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
