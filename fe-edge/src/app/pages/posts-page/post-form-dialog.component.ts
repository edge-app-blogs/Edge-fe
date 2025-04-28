import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule 
  ]
})
export class PostFormDialogComponent {
  post: Post;

  constructor(
    private dialogRef: MatDialogRef<PostFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post | null
  ) {
    this.post = data ? { ...data } : { 
      title: '',
      content: '',
      created_at: '',
      creator: '',
      category: ''
    };
  }

  onSubmit(): void {
    this.dialogRef.close(this.post); 
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
