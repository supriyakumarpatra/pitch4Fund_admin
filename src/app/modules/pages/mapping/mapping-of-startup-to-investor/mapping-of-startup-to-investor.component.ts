import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MappingShareComponent } from 'src/app/modules/shared/mapping-share/mapping-share.component';

@Component({
  selector: 'app-mapping-of-startup-to-investor',
  templateUrl: './mapping-of-startup-to-investor.component.html',
  styleUrls: ['./mapping-of-startup-to-investor.component.css']
})
export class MappingOfStartupToInvestorComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(MappingShareComponent);
  }

  ngOnInit(): void {
  }

  

}
