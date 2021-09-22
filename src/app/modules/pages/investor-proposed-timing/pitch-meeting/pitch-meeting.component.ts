import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-pitch-meeting',
  templateUrl: './pitch-meeting.component.html',
  styleUrls: ['./pitch-meeting.component.css']
})
export class PitchMeetingComponent implements OnInit {
  proposedTimeList: any;
  offset = 0;
  limit = 20;
  count: number = 0;
  constructor(private rest: RestserviceService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getAllProposedTime();
  }

  getAllProposedTime():void{

    const params = {userId:1,offset:this.offset,limit:this.limit}
    this.rest.getAllProposedTime(params).subscribe(
      (res: any)=>{
        console.log(res);
        if(res.success){
          this.proposedTimeList = res.response;
          this.countAllData()
          console.log(this.proposedTimeList);
        }else{
          this.notifier.notify('error',res.message);
        }
      }
    );
  }

  onChangeStatus(status:string,id:number) : void{
    const params = {
      id:id,
      status:status
    };
    this.rest.handleProposedTimeByAdmin(params).subscribe(
      (res: any)=>{
        if(res.success){
          this.getAllProposedTime();
          this.notifier.notify('success',res.message);
        }else{
          this.notifier.notify('error',res.message);
        }
      }
    );
  }

  onPrevious(){
    if(!this.offset){
      return;
    }
    this.offset -= this.limit;
    this.getAllProposedTime();
  }

  onNext(){
    if((this.offset+this.limit)>this.count || (this.offset+this.limit) == this.count){
      return;
    }
    this.offset += this.limit;
    this.getAllProposedTime();
  }
  countAllData(): void{
    const cardParam = {userId: 1};
    this.rest.countAllProposedTime(cardParam).subscribe(
        (res:any)=>{
            if(res.success){
                this.count = res.response?.totalData;
                console.log(this.count)
            }
        }
    );
  }

}
