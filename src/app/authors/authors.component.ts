import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../bookservice.service';

@Component({
  selector: 'app-authors',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  public bookService = inject(BookService); // public, щоб мати доступ з шаблону
  searchTerm = signal('');
  selectedAuthorId = signal<string | null>(null);
  sortKey = signal<'lastName' | 'firstName' | 'birthDate'>('lastName');
  sortDirection = signal<'asc' | 'desc'>('asc');
  filteredAuthors = computed(() => {
    const query = this.searchTerm().toLowerCase();
    const key = this.sortKey();
    const direction = this.sortDirection() === 'asc' ? 1 : -1;
    
     let result = this.bookService.authors().filter(a => 
      a.lastName.toLowerCase().includes(query) || 
      a.firstName.toLowerCase().includes(query)
    );
    return result.sort((a, b) => {
      const valA = String(a[key]).toLowerCase();
      const valB = String(b[key]).toLowerCase();
      return valA > valB ? direction : -direction;
    });
  });

  toggleSort(key: 'lastName' | 'firstName' | 'birthDate') {
    if (this.sortKey() === key) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
  }
 
  toggleBooks(authorId: string) {
    this.selectedAuthorId.update(current => current === authorId ? null : authorId);
  }
  onDelete(id: string) {
  if (confirm('Вы уверены, что хотите удалить этого автора?')) {
    this.bookService.deleteAuthor(id);
    if (this.selectedAuthorId() === id) {
      this.selectedAuthorId.set(null);
    }
  }
}
}
