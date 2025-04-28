import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';

export const routes: Routes = [
  { path: '', component: PostsPageComponent },
];
