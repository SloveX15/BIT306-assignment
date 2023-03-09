import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>{{ message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button  (click)="onClick()">Cancel</button>
      <button mat-button  (click)="onOK()">OK</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  message!:string;
  title!:string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    this.message = data.message;
    this.title = data.title;
  }

    onClick(){
      this.dialogRef.close();
    }

    onOK(){
      this.dialogRef.close('true');
    }
}