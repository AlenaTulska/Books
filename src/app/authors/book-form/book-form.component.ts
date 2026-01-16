import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
  export class BookFormComponent {
  public genreService = inject(GenreService);
  
  add = output<any>();
  cancel = output<void>();

  book = { title: '', year: new Date().getFullYear(), pages: 0, genre: '' };

  submit() {
    this.add.emit({ ...this.book });
    this.book = { title: '', year: new Date().getFullYear(), pages: 0, genre: '' };
  }
}

