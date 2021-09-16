import { Component, OnInit } from '@angular/core';
import {RestserviceService} from '../../../../restservice.service';
import {Subscription} from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {
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

    constructor(private rest: RestserviceService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(): any {
  	const cardParam = {
            
    userId: 1,
    offset: 0,
    limit: 5,
    //type : "all"
        };
    this.rest.getEngagementList(cardParam).subscribe((res) => {
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
    this.rest.countEngagmentData(cardParam).subscribe(
        (res:any)=>{
            if(res.success){
                this.count = res.response?.totalData;
                console.log(this.count)
            }
        }
    );
  }
    NextCardDetails(){
        if((this.offset+5) > this.count || (this.offset+5) == this.count){
            return;
        }
        this.offset +=  5;
    if (this.cardListDump.length == 5){
    const data = {
        userId: 1,
        limit: 5,
        offset : this.offset
    };
    console.log('ffffffffff', data);
    this.rest.getEngagementList(data).subscribe((res) => {

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
        this.offset -= 5;


        const data = {
        userId : 1,
        limit : 5,
        offset : this.offset
    };
        console.log('ffffffffff', data);
        this.rest.getEngagementList(data).subscribe((res) => {

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
        this.rest.addEngagement(cardParam).subscribe((res) => {
           this.responseObj = res;
           if (this.responseObj.success === true){
               this.notifier.notify('success' , 'Engagment add successfully');
               this.cardDescription = '';
               this.getCard();
           }
        });
    }else{
        this.cardDescriptionError = 'Engagment name requied';
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
        this.rest.updateEngagmentData(paramData).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
                this.notifier.notify('success' , 'Engagment update successfully');
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
     
        this.rest.deleteEngagmentData(disableParam).subscribe((res) => {
            this.responseObj = res;
            if (this.responseObj.success === true) {
            	 this.notifier.notify('success' , 'Engagment delete successfully');
                 this.getCard();
            }
        });
    }

}
