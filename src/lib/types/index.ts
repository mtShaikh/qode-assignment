export interface Photo {
  url: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  user: User;
}

export interface Comment {
  message: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  photo: Photo;
}

export interface User {
  username: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
