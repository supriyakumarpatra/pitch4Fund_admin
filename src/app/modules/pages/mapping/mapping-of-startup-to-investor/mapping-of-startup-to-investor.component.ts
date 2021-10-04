import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RestserviceService } from 'src/app/restservice.service';
import { MappingShareComponent } from '../../mapping-share/mapping-share.component';

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
  constructor(public dialog: MatDialog, private rest: RestserviceService) {}

  openDialog() {
    this.dialog.open(MappingShareComponent,{
      width:'500px'
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    console.log('ok');
    this.rest.getAllDataStartupInvestorMap(this.filter).subscribe(
      (res: any)=>{
        console.log(res)
      }
    );
  }

  

}
