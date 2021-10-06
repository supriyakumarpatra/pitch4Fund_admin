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

  filter = {
    userId:1,
    limit:20,
    offset:0
  }
  investorId:InvestorId = {} as InvestorId;
  startupInvestorList: any;
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
        }
        console.log(res)
      }
    );
  }

  getStartupReport(id,investorId){
    const params ={
      investorId:investorId,
      id:id
    };
    this.rest.getMapStartUpReport(params).subscribe(
      (res: any)=>{
        console.log(res.response);
      }
    );
  }

  

  

}
