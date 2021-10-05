import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestserviceService } from 'src/app/restservice.service';
import { ImapStartup, InvestorId } from 'src/app/models/index';

@Component({
  selector: 'app-select-startup',
  templateUrl: './select-startup.component.html',
  styleUrls: ['./select-startup.component.css']
})
export class SelectStartupComponent implements OnInit {
  startUpList: any;
  selectedStartup: string[] = [] as string[];
  mapStartupData: ImapStartup = {} as ImapStartup;
  alisName: string = '';
  errorMsg: string = '';
  todayDate: Date = new Date();
  filter={userId:1,indrustyId:''}
  indrustyList: any;
  buttonTitle: string = 'Add';
  
  constructor(private rest: RestserviceService, 
    public dialogRef: MatDialogRef<SelectStartupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvestorId) { }

  ngOnInit(): void {
    this.activeStartup();
    this.allIndrusty();
    console.log('invetor',this.data);
    this.mapStartupData = this.data.mapStartup;
    if(this.mapStartupData.startupIds){
      this.selectedStartup = JSON.parse(this.mapStartupData.startupIds);
      console.log('startup',this.selectedStartup);
    }
    if(this.mapStartupData.id){
      this.buttonTitle = 'Update';
    }else{
      this.buttonTitle = 'Add';
    }
  }

  allIndrusty(){
    const cardParam = {
      userId: 1,
      offset:0,
      limit:20,
      type : "all"
    };
    this.rest.getIndustryList(cardParam).subscribe(
      (res: any)=>{
        if(res.success){
          this.indrustyList = res.response;
          
        }
      }
    );
  }

  activeStartup(){
    const params = {userId:1};
    this.rest.getAllActiveStartup(this.filter).subscribe(
      (res: any)=>{
        if(res.success){
          this.startUpList = res.response;
        }
        console.log('startup',this.startUpList);
      }
    );
  }

  onSelectedStartup(e){
    console.log(e);
    if(e.checked){
      this.selectedStartup.push(e.source.value);
    }else{
      const index = this.selectedStartup.indexOf(e.source.value)
      this.selectedStartup.splice(index,1);
    }
  }

  onAdd(){
    if(!this.mapStartupData.alisename){
      this.errorMsg = 'This fild is required.';
      return;
    }
    this.errorMsg = '';
    this.mapStartupData.startupIds = JSON.stringify(this.selectedStartup);
    this.data.mapStartup = this.mapStartupData;
    
    console.log(this.data);
    // return;
    if(!this.data.mapStartup.id){
      this.rest.addMapStartup(this.data).subscribe(
        (res: any)=>{
          console.log(res)
          if(res.success){
            this.dialogRef.close(res);
          }
        }
      );
    }else{
      this.rest.updateMapStartup(this.data).subscribe(
        (res: any)=>{
          console.log(res)
          if(res.success){
            this.dialogRef.close(res);
          }
        }
      );
    }
    
  }

  onSearch(e){
    console.log(e.target.value);
    this.filter.indrustyId = e.target.value;
    this.activeStartup();
  }

  // onChangeMachine(item:any){
  //   console.log("==================================",item)
  // }



}
