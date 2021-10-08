

import { Component, OnInit } from '@angular/core';
import {RestserviceService} from '../../../../restservice.service';
import {Subscription} from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { DeleteDialogComponent } from 'src/app/modules/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})






export class AddLanguageComponent implements OnInit {
    cardDescription = '';
    cardDescriptionError = '';
    responseObj: any;
    cardList = [];
    updateCardId = 0;
    isUpdate = false;
    cardSearch = '';
    cardListDump = [];
    offset = 0;
    count: number = 0;
    limit = 20;
    searchTerm = '';

  constructor(private rest: RestserviceService, private notifier: NotifierService,  public dialog: MatDialog) { }

  ngOnInit(): void {
      this.getCard();
      
  }

  getCard(): any {
  	const cardParam = {
            
    userId: 1,
    offset: this.offset,
     limit: this.limit,
     searchTerm: this.searchTerm
    //type : "all"
        };
    this.rest.getLanguageList(cardParam).subscribe((res) => {
        this.responseObj = res;
        if (this.responseObj.success === true) {
            for (let i = 0 ; i < this.responseObj.response.length; i++) {
                if (this.responseObj.response[i].isEnable === '1') {
                    this.responseObj.response[i].isEnable = true;
                } else {
                    this.responseObj.response[i].isEnable = false;
                }
            }
            this.cardList  = this.responseObj.response;
            this.cardListDump = this.responseObj.response;
            this.countAllData()
        }
    });
  }

  openDeleteDialog(id:number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
        width: '300px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result)
        if(result){
            console.log('delete it');
            this.IndustryDelete(id);
        }
      console.log(`Dialog result: ${result}`);
    });
  }

  countAllData(): void{
    const cardParam = {userId: 1, searchTerm: this.searchTerm};
    this.rest.countLanguageData(cardParam).subscribe(
        (res:any)=>{
            if(res.success){
                this.count = res.response?.totalData;
                console.log(this.count)
            }
        }
    );
  }
       NextCardDetails(){
        if((this.offset+this.limit) > this.count || (this.offset+this.limit) == this.count){
            return;
        }
            this.offset +=  this.limit;
            if (this.cardListDump.length == this.limit){
            const data = {
                userId: 1,
                limit: this.limit,
                offset : this.offset,
                searchTerm: this.searchTerm
            };
            console.log('ffffffffff', data);
            this.rest.getLanguageList(data).subscribe((res) => {

                this.responseObj = res;
                if (this.responseObj.success === true) {
                    for (let i = 0 ; i < this.responseObj.response.length; i++) {
                        if (this.responseObj.response[i].isEnable === '1') {
                            this.responseObj.response[i].isEnable = true;
                        } else {
                            this.responseObj.response[i].isEnable = false;
                        }
                    }

                    console.log('offset', this.offset);
                    this.cardList  = this.responseObj.response;
                    this.cardListDump = this.responseObj.response;
                    console.log(this.cardListDump);
                    // if (this.cardListDump.length == 5){
                    //     this.offset += 5;

                    // }


                }
            });

            }else{
                console.log('>>>>>>>>>>', this.cardListDump.length);
            }

  }

  PreviousCardDetails(){
      if (this.offset != 0){
        this.offset -= this.limit;


        const data = {
        userId : 1,
        limit : this.limit,
        offset : this.offset,
        searchTerm : this.searchTerm
    };
        console.log('ffffffffff', data);
        this.rest.getLanguageList(data).subscribe((res) => {

        this.responseObj = res;
        if (this.responseObj.success === true) {
            for (let i = 0 ; i < this.responseObj.response.length; i++) {
                if (this.responseObj.response[i].isEnable === '1') {
                    this.responseObj.response[i].isEnable = true;
                } else {
                    this.responseObj.response[i].isEnable = false;
                }
            }

            // if (this.offset == 0){
            //   this.offset = 5;
            // }
            console.log('offset', this.offset);
            this.cardList  = this.responseObj.response;
            this.cardListDump = this.responseObj.response;
            console.log(this.cardListDump);

        }
    });

    }
  }


  addIndustry(): any{
    if (this.cardDescription !== '') {
        this.cardDescriptionError = '';
        const cardParam = {
            name : this.cardDescription,
            userId : 1
        };
        this.rest.addLanguage(cardParam).subscribe((res) => {
           this.responseObj = res;
           if (this.responseObj.success === true){
               this.notifier.notify('success' , 'Language add successfully');
               this.cardDescription = '';
               this.getCard();
           }
        });
    }else{
        this.cardDescriptionError = 'Language name requied';
    }
  }
    editData(data): any {
      this.cardDescriptionError = '';  
      this.isUpdate = true;
      this.updateCardId = data.id;
      this.cardDescription = data.name;
    }
    updateIndustry(): any {
        const paramData = {
            id : this.updateCardId,
            name : this.cardDescription,
            userId : 1
        };
        this.rest.updateLanguageData(paramData).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
                this.notifier.notify('success' , 'Language update successfully');
                this.cardDescription = '';
                this.isUpdate = false;
                this.getCard();
            }
        });
    }
    IndustryDelete(cardId): any {
        const disableParam = {
            id: cardId,
            userId: 1,
         
        };
     
        this.rest.deleteLanguageData(disableParam).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
            	 this.notifier.notify('error' , 'Language delete successfully');
                 this.getCard();
           
                
            }
        });
    }
    
    onSearch(){
        const cardParam = {
            
            userId: 1,
            offset: this.offset,
             limit: this.limit,
             searchTerm: this.searchTerm
            //type : "all"
                };
            this.rest.getLanguageList(cardParam).subscribe((res) => {
                this.responseObj = res;
                if (this.responseObj.success === true) {
                    for (let i = 0 ; i < this.responseObj.response.length; i++) {
                        if (this.responseObj.response[i].isEnable === '1') {
                            this.responseObj.response[i].isEnable = true;
                        } else {
                            this.responseObj.response[i].isEnable = false;
                        }
                    }
                    this.cardList  = this.responseObj.response;
                    this.cardListDump = this.responseObj.response;
                    this.countAllData()
                }
            });
    }

}
