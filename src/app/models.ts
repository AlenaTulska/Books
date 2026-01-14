export interface Book {
  id: string;
  title: string;
  pages: number;
  genre: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  books: Book[];
}

export type Genre = string;