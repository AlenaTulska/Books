export interface Book {
  id?: string;
  title: string;
  pages: number;
  year: number;
  genre: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  books: Book[];
}