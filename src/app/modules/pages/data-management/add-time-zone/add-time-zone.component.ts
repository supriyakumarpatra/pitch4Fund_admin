

import { Component, OnInit } from '@angular/core';
import {RestserviceService} from '../../../../restservice.service';
import {Subscription} from 'rxjs';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-add-time-zone',
  templateUrl: './add-time-zone.component.html',
  styleUrls: ['./add-time-zone.component.css']
})






export class AddTimeZoneComponent implements OnInit {
    timezoneOffsetError = '';
    timezoneOffset = '';
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
  constructor(private rest: RestserviceService, private notifier: NotifierService) { }

  ngOnInit(): void {
      this.getCard();
  }

  getCard(): any {
  	const cardParam = {
            
    userId: 1,
    offset: 0,
    limit: this.limit,
    //type : "all"
        };
    this.rest.getTimeZoneList(cardParam).subscribe((res) => {
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
            this.countAllData();
        }
    });
  }

  countAllData(): void{
    const cardParam = {userId: 1};
    this.rest.countTimeZoneData(cardParam).subscribe(
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
        offset : this.offset
    };
    console.log('ffffffffff', data);
    this.rest.getTimeZoneList(data).subscribe((res) => {

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
        offset : this.offset
    };
        console.log('ffffffffff', data);
        this.rest.getTimeZoneList(data).subscribe((res) => {

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
    if (this.cardDescription !== '' && this.timezoneOffset !== '') {
        this.cardDescriptionError = '';
        this.timezoneOffsetError = '';
        const cardParam = {
            name : this.cardDescription,
            offset: this.timezoneOffset,
            userId : 1
        };
        this.rest.addTimeZone(cardParam).subscribe((res) => {
           this.responseObj = res;
           if (this.responseObj.success === true){
               this.notifier.notify('success' , 'TimeZone add successfully');
               this.cardDescription = '';
               this.getCard();
           }
        });
    }else{
        if(this.timezoneOffset == ''){
            this.timezoneOffsetError = 'offset name requied';
        }
        if(this.cardDescription == ''){
            this.cardDescriptionError = 'TimeZone name requied';
        }
        
    }
  }
    editData(data): any {
      this.cardDescriptionError = '';  
      this.isUpdate = true;
      this.updateCardId = data.id;
      this.cardDescription = data.name;
      this.timezoneOffset = data.offset;
    }
    updateIndustry(): any {
        const paramData = {
            id : this.updateCardId,
            name : this.cardDescription,
            offset: this.timezoneOffset,
            userId : 1
        };
        this.rest.updateTimeZoneData(paramData).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
                this.notifier.notify('success' , 'TimeZone update successfully');
                this.cardDescription = '';
                this.timezoneOffset = '';
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
     
        this.rest.deleteTimeZoneData(disableParam).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
            	 this.notifier.notify('success' , 'TimeZone delete successfully');
                 this.getCard();
           
                
            }
        });
    }
    // searchCard(): any {
    //   if (this.cardSearch.length !== 0) {
    //       if (this.cardList.length !== 0) {
    //           const finalArray = [];
    //           for (let i = 0 ; i < this.cardList.length ; i++) {
    //               if (this.cardList[i].details.indexOf(this.cardSearch) !== -1) {
    //                   finalArray.push(this.cardList[i]);
    //               }
    //           }
    //           this.cardList = finalArray;
    //       }
    //   } else {
    //       this.cardList = this.cardListDump;
    //   }
    // }

    // uploadCSV(): void {
    //     const csvupl = document.getElementById('csvupl') as HTMLInputElement;
    //     const loader = document.getElementById('loader');
    //     csvupl.click();
    //     csvupl.onchange = () => {
    //         loader.style.display = 'inline-block';
    //         const files = csvupl.files;
    //         if (files.length > 0) {
    //             const fd = new FormData();
    //             const userId = '1';
    //             fd.append('userId', userId );
    //             fd.append('file', files[0]);
    //             this.rest.uploadCardCSV(fd).subscribe((res: any) => {
    //                 loader.style.display='none';
    //                 if (res.success) {
    //                     this.getCard();
    //                     this.notifier.notify('success' , 'File upload successfully');
    //                 }
    //             });
    //         }
    //     }
    // }

}

