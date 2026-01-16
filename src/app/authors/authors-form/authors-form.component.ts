import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Author } from '../../models';

@Component({
  selector: 'app-authors-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './authors-form.component.html',
  styleUrl: './authors-form.component.css'
})
export class AuthorsFormComponent {
  add = output<any>(); 
  cancel = output<void>();

  author: Author = this.getEmptyAuthor();
  getEmptyAuthor(): Author {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: '',
      id: '',
      books: [],
    };
  }
  maxDate = new Date().toISOString().split('T')[0];

  submit() {
    this.add.emit({ ...this.author });
    this.author = this.getEmptyAuthor();
  }
}

