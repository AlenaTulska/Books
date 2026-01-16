import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'authors', component: AuthorsComponent },
  { path: 'genres', component: GenresComponent },
  { path: '**', redirectTo: '' } 
];