import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SelectStartupComponent } from 'src/app/modules/shared';
import { RestserviceService } from 'src/app/restservice.service';
import { MappingShareComponent } from '../../mapping-share/mapping-share.component';
import {ImapStartup, InvestorId } from  'src/app/models/index';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-mapping-of-startup-to-investor',
  templateUrl: './mapping-of-startup-to-investor.component.html',
  styleUrls: ['./mapping-of-startup-to-investor.component.css']
})
export class MappingOfStartupToInvestorComponent implements OnInit {

  
  investorId:InvestorId = {} as InvestorId;
  startupInvestorList: any;
  searchTerm: string = '';
  count: number = 0;
  offset = 0;
  limit = 20;
  filter = {
    userId:1,
    limit:this.limit,
    offset:this.offset,
    search:this.searchTerm
  }
  startupReport: any
  constructor(public dialog: MatDialog, private rest: RestserviceService, private notifier: NotifierService,) {}

  

  ngOnInit(): void {
    this.getAllStartupInvestorData();
    
  }

  openShareDialog() {
    this.dialog.open(MappingShareComponent,{
      width:'500px'
    });
  }

  openStartupDialog(investorId,startupMap:ImapStartup = {} as ImapStartup ) {
    console.log('in',investorId);
    this.investorId.investorId = investorId;
    this.investorId.mapStartup = startupMap;
    // this.investorId.id = id;
    // this.investorId.startupIds = startupIds;
    const dialogRef = this.dialog.open(SelectStartupComponent,{
      width:'700px',
      data:this.investorId
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(!result){
        return;
      }
      if(result.success){
        this.notifier.notify('success', result.message);
        this.getAllStartupInvestorData();
      }else{
        this.notifier.notify('error', 'Something is wrong Please try again')
      }
      // this.onSubmitVideo()
  });


  }

  getAllStartupInvestorData(){
    console.log('ok');
    this.rest.getAllDataStartupInvestorMap(this.filter).subscribe(
      (res: any)=>{
        if(res.success){
          this.startupInvestorList = res.response;
          this.counAllData();
        }
        console.log(res)
      }
    );
  }

  getStartupReport(id,investorId,openModal){
     this.startupReport = {};
    const params ={
      investorId:investorId,
      id:id
    };
    this.rest.getMapStartUpReport(params).subscribe(
      (res: any)=>{
        this.startupReport = res.response;
        console.log(res.response);
        console.log(openModal)
        openModal.click();
      }
    );
  }

  counAllData(){
    this.rest.countAllData(this.filter).subscribe(
      (res: any)=>{
        if(res.success){
          
          this.count = res.response.count
          console.log(this.count);
        }
      }
    )
  }

onSearch(){
  this.filter.search = this.searchTerm;
  this.getAllStartupInvestorData();
  // console.log(this.searchTerm);
}

NextCardDetails(): any {
  if((this.offset+this.limit) > this.count || (this.offset+this.limit) == this.count){
    return;
  }
  this.offset +=  this.limit;
  if(this.startupInvestorList.length === this.limit){
    // this.offset += 5;
    console.log(this.filter);
    this.filter.offset = this.offset;
    this.getAllStartupInvestorData();
  }
}

PreviousCardDetails(): any {
  this.offset -= this.limit;
  if(this.offset >= 0){
    this.filter.offset = this.offset;
    this.getAllStartupInvestorData();
  } else {
    this.offset = 0;
  }
}

 dateFormat(date){
  const setDate = new Date(date);
  let month = '' + (setDate.getMonth() + 1),
  day = '' + setDate.getDate(),
  year = setDate.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
  
} 

onClose(closeModal){
  this.startupReport = {};
  closeModal.click();
}

feedback(feedback){
  if(feedback == '1'){
    return 'Favourite';
  }else if(feedback == '2'){
    return 'Watch Later';
  }else if(feedback == '3'){
    return 'Not interested';
  }else{
    return '';
  }
}

  

}
