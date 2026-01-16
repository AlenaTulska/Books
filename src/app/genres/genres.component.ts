import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, } from '@angular/forms';
import { GenreService } from '../services/genre-service';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
public genreService = inject(GenreService);
  newGenreName = '';

  add() {
    if (this.newGenreName) {
      this.genreService.addGenre(this.newGenreName);
      this.newGenreName = '';
    }
  }
}
