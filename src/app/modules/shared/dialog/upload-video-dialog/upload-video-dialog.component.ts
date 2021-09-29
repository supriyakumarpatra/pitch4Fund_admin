import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Presentation } from 'src/app/models';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-upload-video-dialog',
  templateUrl: './upload-video-dialog.component.html',
  styleUrls: ['./upload-video-dialog.component.css']
})
export class UploadVideoDialogComponent implements OnInit {

  videoUrl = '';
  adminSelectedVideoUrl: string | ArrayBuffer | null = '';
  constructor(
    public dialogRef: MatDialogRef<UploadVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Presentation,
    private rest: RestserviceService,) {}

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.video){
      this.videoUrl = this.rest.document_URL+this.data.video;
    }
    
  }

  onSelectVideo(e: any) {

    console.log(e.target.files);
    let file = e.target.files;
    var reader = new FileReader();
    //   this.imagePath = files;
    reader.readAsDataURL(file[0]);
    const formData = new FormData();
    formData.append('file', file[0]);
    reader.onload = (e) => {
        this.adminSelectedVideoUrl = (<FileReader> e.target).result;

        this.uploadVideo(formData);
        
        // this.presentationUrl = reader.result; 
        console.log(this.adminSelectedVideoUrl);
    };

  }

  uploadVideo(params: any) {
    this.rest.uploadFile(params).subscribe(
        (res: any) => {
            if(res.success){
              this.data.newVideo = res.fileName;
            }
        }
    );
  }

  onSelectDoc(doc: string): void {
    if(!doc){
        return;
    }
    console.log(doc);
    const docUrl = this.rest.document_URL + doc;
    // const link = document.createElement("a");
    // link.href = docUrl;
    // // link.href = URL.createObjectURL(docUrl);
    // link.download = 'filename.png';
    // link.click();
    // const WordUrl = "https://docs.google.com/gview?url=" + docUrl  +"&embedded=true"
    window.open(docUrl, '_blank');
  }

  onSubmit(){
    this.dialogRef.close(this.data);
  }

}
