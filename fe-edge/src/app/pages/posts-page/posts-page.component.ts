import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostFormDialogComponent } from './post-form-dialog.component';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    PostFormDialogComponent
  ],
  providers: [PostService]
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];
  displayedColumns: string[] = ['title', 'creator', 'category', 'actions'];

  constructor(
    private dialog: MatDialog,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => this.posts = posts,
      error: (error) => this.handleError('loading posts', error)
    });
  }

  openAddPostDialog(): void {
    this.openPostDialog().afterClosed().subscribe((newPost) => {
      if (newPost) {
        newPost.created_at = new Date().toISOString();
        this.postService.createPost(newPost).subscribe({
          next: (post) => this.posts.push(post),
          error: (error) => this.handleError('creating post', error)
        });
      }
    });
  }

  editPost(post: Post): void {
    this.openPostDialog(post).afterClosed().subscribe((updatedPost) => {
      if (updatedPost) {
        this.updatePost(updatedPost);
      }
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: () => this.posts = this.posts.filter(post => post.id !== id),
      error: (error) => this.handleError('deleting post', error)
    });
  }

  private updatePost(post: Post): void {
    this.postService.updatePost(post).subscribe({
      next: () => this.loadPosts(),
      error: (error) => this.handleError('updating post', error)
    });
  }

  private openPostDialog(post?: Post) {
    return this.dialog.open(PostFormDialogComponent, {
      width: '600px',
      data: post
    });
  }

  private handleError(action: string, error: HttpErrorResponse): void {
    console.error(`Error ${action}:`, error);
  }
}
