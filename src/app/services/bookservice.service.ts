import { Injectable, signal } from '@angular/core';
import { INITIAL_AUTHORS } from '../../data/authors';
import { Author } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  authors = signal<Author[]>(this.getInitialData());
  private getInitialData(): any[] {
    const saved = localStorage.getItem('authors');
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_AUTHORS;
  }
  saveToLocal() {
    localStorage.setItem('authors', JSON.stringify(this.authors()));
  }
  addAuthor(authorData: { firstName: string, lastName: string, birthDate: string }) {
  const newAuthor = {
    ...authorData,
    id: Date.now().toString(),
    books: [] 
  };
  
  this.authors.update(current => [newAuthor, ...current]);
  this.saveToLocal();
}

  deleteAuthor(id: string) {
    this.authors.update(current => current.filter(author => author.id !== id));
    this.saveToLocal();
}
  addBook(authorId: string, bookData: { title: string, pages: number, year: number, genre: string }) {
  this.authors.update(authors => authors.map(author => {
    if (author.id === authorId) {
      const newBook = {
        ...bookData,
        id: Date.now().toString() 
      };
      return {
        ...author,
        books: [...(author.books || []), newBook]
      };
    }
    return author;
  }));
  this.saveToLocal();
}
deleteBook(authorId: string, bookId: string) {
  this.authors.update(authors => authors.map(author => {
    if (author.id === authorId) {
      return {
        ...author,
        books: author.books.filter(b => b.id !== bookId)
      };
    }
    return author;
  }));
  this.saveToLocal();
}
}

