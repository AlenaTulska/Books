import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private readonly STORAGE_KEY = 'genres';
  private readonly INITIAL_GENRES = ['Поезія', 'Роман', 'Повість', 'Драма', 'Фантастика', 'Роман у віршах'];

  genres = signal<string[]>(this.loadGenres());

  private loadGenres(): string[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.INITIAL_GENRES;
  }

  addGenre(name: string) {
    const trimmedName = name.trim();
    if (trimmedName && !this.genres().some(g => g.toLowerCase() === trimmedName.toLowerCase())) {
      this.genres.update(current => [...current, trimmedName]);
      this.save();
    }
  }

  deleteGenre(name: string) {
    this.genres.update(current => current.filter(g => g !== name));
    this.save();
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.genres()));
  }
}