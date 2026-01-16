import { computed, inject, Injectable, signal } from '@angular/core';
import { BookService } from './bookservice.service';
import { Author } from '../models';

export type SortableKeys = 'lastName' | 'firstName' | 'birthDate' | 'booksCount';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  private bookService = inject(BookService);
  
  searchTerm = signal<string>('');
  sortKey = signal<SortableKeys>('lastName');
  sortDirection = signal<'asc' | 'desc'>('asc');

  sortedAuthors = computed(() => {
    const authors = this.bookService.authors();
    const key = this.sortKey();
    const direction = this.sortDirection() === 'asc' ? 1 : -1;
    
    return [...authors].sort((a: Author, b: Author) => {
      if (key === 'booksCount') {
        const countA = a.books?.length || 0;
        const countB = b.books?.length || 0;
        return (countA - countB) * direction;
      }      
      
      const valA = String(a[key as keyof Author] || '').toLowerCase();
      const valB = String(b[key as keyof Author] || '').toLowerCase();
      
      return valA.localeCompare(valB) * direction;
    });
  });

    filteredAuthors = computed(() => {
    const authors = this.sortedAuthors(); 
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) return authors;

    return authors.map(author => ({
      ...author,    
      books: author.books.filter(book => 
        book.title.toLowerCase().includes(term)
      )
    })).filter(author => author.books.length > 0);
  });

  toggleSort(key: SortableKeys) {
    if (this.sortKey() === key) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
  }
}