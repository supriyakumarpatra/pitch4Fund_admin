import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-investor-user',
  templateUrl: './investor-user.component.html',
  styleUrls: ['./investor-user.component.css']
})
export class InvestorUserComponent implements OnInit {

  count: number = 0;
  offset = 0;
  userStatus = new FormControl('');
  filter = {
    offset: this.offset,
    limit: 5,
    status : this.userStatus.value
  };
  
  userList = [];
  nexbuttonDisable: boolean = false;
  investorStatus = ['reject','pending','approve']
  adminAppruvalList: string[] = [];
  companySertificateList: string[] = [];
  constructor(private rest: RestserviceService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getInvestorUser();
    this.userStatus.valueChanges.subscribe(
      (value: any) =>{
        console.log(value);
        this.filter.status = value;
        this.filter.offset =0;
        this.getInvestorUser();
      }
    )
  }

  getInvestorUser(): any{
    // this.filter = {
    //   offset: this.offset,
    //   limit: 5,
    //   status : this.userStatus.value
    // };
    console.log('filter',this.filter)
    this.rest.getAllInvestor(this.filter).subscribe(
      (res: any) => {
        if(res.success === true){
          console.log(res);
          this.userList = res.response;
          this.countAllData()
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  countAllData(): void{
    const cardParam = {userId: 1};
    this.rest.countAllInvestor(this.filter).subscribe(
        (res:any)=>{
            if(res.success){
                this.count = res.response?.totalData;
                console.log(this.count)
            }
        }
    );
  }

  NextCardDetails(): any {
    if((this.offset+5) > this.count || (this.offset+5) == this.count){
      return;
    }
    this.offset +=  5;
    if(this.userList.length === 5){
      // this.offset += 5;
      console.log(this.filter);
      this.filter.offset = this.offset;
      this.getInvestorUser();
    }
  }

  PreviousCardDetails(): any {
    this.offset -= 5;
    if(this.offset >= 0){
      this.filter.offset = this.offset;
      this.getInvestorUser();
    } else {
      this.offset = 0;
    }
  }

  onChangeStatus(status,id){
    const params = {
      'userId' : id,
      'status' : status
    }
    console.log(params);
    this.rest.changeUserStatus(params).subscribe(
      (res: any)=>{
        if(res.success === true){
          console.log(res);
          this.notifier.notify('success', 'User Status change successfully');
          this.getInvestorUser();
        }
      }
    );
  }

  onViewDocument(modal: any, userId: number){
    console.log(modal);
    const params ={
      userId: userId
    }
    this.rest.allCompanyDocument(params).subscribe(
      (res: any) =>{
        if(res.success === true){
          console.log(res.response)
          console.log( JSON.parse(res.response[0].adminappruval));
          
          //  this.adminAppruvalList?.length = 0;
          //  let x = JSON.parse(res.response[0].adminappruval);
          //  let y = JSON.parse(res.response[0].companyCertificate)
          //  x.substring(1, x.length-1);
          
          this.adminAppruvalList = JSON.parse(res.response[0].adminappruval);
          this.companySertificateList = JSON.parse(res.response[0].companyCertificate)
          //  if(x != null){
          //   this.adminAppruvalList = this.stringToArray(x);
          //  }
          //  if(y != null){
          //   this.companySertificateList = this.stringToArray(y);
          //  }
           
           console.log( this.companySertificateList);
           modal.click();
        }
        else{
          this.adminAppruvalList.length = 0;
          this.notifier.notify('error','Some thing is wrong please try again');
        }
      }
    )
    
  }

  onCloseModal(close: any){
    // this.adminAppruvalList.length = 0;
    close.click();
  }

  onSelectDoc(doc: string): void {
    console.log(doc);
    const docUrl = this.rest.document_URL + doc;
    // const WordUrl = "https://docs.google.com/gview?url=" + docUrl  +"&embedded=true"
    window.open(docUrl, "_blank");
  }

  stringToArray(arrayString: string){
    // var a = "['x.pdf','y.pdf','z.pdf']";
    let b = arrayString.split(",");
    let c = [];
    for(let i = 0; i < b.length; i++) {
    let temp = b[i].split("'");
    let x = temp[1];
    c.push(x);
    
    // c.push(x);
    }
    return c;
  // console.log(this.adminAppruvalList);

  }



}
