import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {NotifierService} from 'angular-notifier';
import { UploadVideoDialogComponent } from 'src/app/modules/shared';
import {RestserviceService} from 'src/app/restservice.service';
import {Presentation} from 'src/app/models'

@Component({
    selector: 'app-startup-user',
    templateUrl: './startup-user.component.html',
    styleUrls: ['./startup-user.component.css']
})
export class StartupUserComponent implements OnInit {
    // presentationUrl: string ='';
    presentationUrl: string | ArrayBuffer | null = '';
    adminSelectedVideoUrl: string | ArrayBuffer | null = '';

    offset = 0;
    limit = 20;
    userStatus = new FormControl('');
    filter = {
        offset: this.offset,
        limit: this.limit,
        status: this.userStatus.value
    };

    userList = [];
    relatedDocument: any;
    pitchDeck: string;
    isPresentationVideo: number;
    upVideo: boolean = false;
    pitchdecvideo: string = '';
    newVideo: string = '';
    startupId: number;
    count: number = 0;
    docPath = '';
    presentationData: Presentation = {} as Presentation;
    constructor(
        private rest: RestserviceService,
        private notifier: NotifierService,
        private dom: DomSanitizer,
        private dialog: MatDialog) {
            this.docPath = this.rest.document_URL;
    }

    ngOnInit(): void {
        this.getStartupUser();
        this.userStatus.valueChanges.subscribe(
            (value: any) => {
                console.log(value);
                this.filter.status = value;
                 this.offset = 0;
                this.getStartupUser();
            }
        );
    }

    countAllData(): void{
        const cardParam = {userId: 1};
        this.rest.countAllStartup(this.filter).subscribe(
            (res:any)=>{
                if(res.success){
                    this.count = res.response?.totalData;
                    console.log(this.count)
                }
            }
        );
      }

    getStartupUser(): any {
        this.filter = {
            offset: this.offset,
            limit: this.limit,
            status: this.userStatus.value
        };
        this.rest.getAllStartup(this.filter).subscribe(
            (res: any) => {
                if (res.success === true) {
                    console.log(res);
                    this.userList = res.response;
                    this.countAllData();
                }
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    NextCardDetails(): any {
        if((this.offset+this.limit) > this.count || (this.offset+this.limit) == this.count){
            return;
          }
          this.offset +=  this.limit;
        if (this.userList.length === this.limit) {
            // this.offset += 5;
            console.log(this.filter);
            this.getStartupUser();
        }
    }

    PreviousCardDetails(): any {
        this.offset -= this.limit;
        if (this.offset >= 0) {
            this.getStartupUser();
        } else {
            this.offset = 0;
        }
    }

    onChangeStatus(status, id) {
        const params = {
            'userId': id,
            'status': status
        };
        console.log(params);
        this.rest.changeStartupStatus(params).subscribe(
            (res: any) => {
                if (res.success === true) {
                    console.log(res);
                    this.notifier.notify('success', 'User Status change successfully');
                    this.getStartupUser();
                }
            }
        );
    }

    openPresentationDialog(){
        const dialogRef = this.dialog.open(UploadVideoDialogComponent,{
            width:'400px',
            data:this.presentationData
        });
    }

    onPresentationVideo( startupId: number): void {
        console.log(+startupId);
        const params = {'startupId': +startupId};
        this.rest.getStartupPresentationVideo(params).subscribe(
            (res: any) => {
                if (res.success === true) {
                    console.log(res.response)
                    this.pitchDeck = res.response[0].pitchdecdoc;
                    this.isPresentationVideo = res.response[0].isPresentationVideo;
                    this.pitchdecvideo = res.response[0].pitchdecvideo;
                    this.startupId = startupId;
                    if (this.pitchdecvideo) {
                        this.presentationUrl = this.rest.document_URL + res.response[0].pitchdecvideo;
                    }
                    this.presentationData.docUrl = res.response[0].pitchdecdoc;
                    this.presentationData.video = res.response[0].pitchdecvideo;
                    this.presentationData.isPresentationVideo = res.response[0].isPresentationVideo;
                    this.presentationData.startupId = startupId;
                    console.log(this.presentationUrl);
                    this.openPresentationDialog();
                }
            }
        );

    }

    transform(url) {
        return this.dom.bypassSecurityTrustResourceUrl(url);
    }

    onOpenDocumentMOdal(id, docModal): void {
        const params = {'userId': id};
        this.rest.allStartupDocument(params).subscribe(
            (res: any) => {
                console.log(res.response);
                this.relatedDocument = res.response[0];
                docModal.click();
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
                // console.log(res);
                this.newVideo = res.fileName;
                this.upVideo = true;
                console.log(this.pitchdecvideo);
            }
        );
    }

    onSubmitVideo(close,uploadVideoForm) {
        const params = {
            'userId': this.startupId,
            'videourl': this.pitchdecvideo,
            'docurl': this.pitchDeck,
            'isVideo': '1'
        };
        if(this.newVideo){
            params.videourl = this.newVideo;
        }
        console.log(params);
        this.rest.uploadVideo(params).subscribe(
            (res: any) => {
                this.notifier.notify('success', 'Video uploaded successfully');
                this.upVideo = false;
                this.newVideo = '';
                this.adminSelectedVideoUrl = '';
                close.click();
                uploadVideoForm.reset();

            }
        );


    }

    onClose(close,uploadVideoForm){
        this.upVideo = false;
        this.newVideo = '';
        this.adminSelectedVideoUrl = '';
        close.click();
        uploadVideoForm.reset();
    }
}
