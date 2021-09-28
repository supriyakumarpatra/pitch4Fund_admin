import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Presentation } from 'src/app/models';

@Component({
  selector: 'app-upload-video-dialog',
  templateUrl: './upload-video-dialog.component.html',
  styleUrls: ['./upload-video-dialog.component.css']
})
export class UploadVideoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Presentation) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}
