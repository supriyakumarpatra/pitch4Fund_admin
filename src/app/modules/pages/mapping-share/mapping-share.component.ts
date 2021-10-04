import { Component, OnInit } from '@angular/core';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-mapping-share',
  templateUrl: './mapping-share.component.html',
  styleUrls: ['./mapping-share.component.css']
})
export class MappingShareComponent implements OnInit {

  todayDate: Date = new Date();
  
  constructor() { }

  ngOnInit(): void {
    
  }

  

}
