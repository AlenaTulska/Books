import { Injectable, signal } from '@angular/core';
import { INITIAL_AUTHORS } from '../assets/data/authors';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  authors = signal<any[]>(this.getInitialData());
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
  addAuthor(newAuthor: any) {
    this.authors.update(current => [...current, newAuthor]);
    this.saveToLocal();
  }
  deleteAuthor(id: string) {
    this.authors.update(current => current.filter(author => author.id !== id));
    this.saveToLocal();
}
}
