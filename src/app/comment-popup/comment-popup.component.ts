import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrls: ['./comment-popup.component.sass']
})
export class CommentPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<CommentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


export interface DialogData {
  order: string;
  comment: string;
}
