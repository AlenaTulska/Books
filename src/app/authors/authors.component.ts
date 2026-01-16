import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/bookservice.service';
import { StateServiceService } from '../services/state-service.service';
import { FormsModule } from '@angular/forms';
import { AuthorsFormComponent } from './authors-form/authors-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { Author } from '../models';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-authors',
  standalone: true, 
  imports: [CommonModule, FormsModule, AuthorsFormComponent, BookFormComponent],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('250ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
  export class AuthorsComponent {
  public bookService = inject(BookService);
  public stateService = inject(StateServiceService);

  selectedAuthorId = signal<string | null>(null);
  authorIdForNewBook = signal<string | null>(null);
  isAuthorFormVisible = signal(false);

  toggleBooks(authorId: string) {
    this.selectedAuthorId.update(current => current === authorId ? null : authorId);
  }

  onDelete(id: string) {
    if (confirm('Ви впевнені, що хочете видалити цього автора?')) {
      this.bookService.deleteAuthor(id);
      if (this.selectedAuthorId() === id) {
        this.selectedAuthorId.set(null);
      }
    }
  }
  onAuthorAdd(authorData: any) {
    this.bookService.addAuthor(authorData);
    this.isAuthorFormVisible.set(false);
  }
  onBookAdd(authorId: string, bookData: any) {
    this.bookService.addBook(authorId, bookData);
    this.authorIdForNewBook.set(null);
  }
  onDeleteBook(authorId: string, bookId: string) {
  if (confirm('Ви впевнені, що хочете видалити цю книгу?')) {
    this.bookService.deleteBook(authorId, bookId);
  }
}
}