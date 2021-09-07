import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public sidenavShow: String = '';
  constructor() { }

  ngOnInit(): void {
  }
  showsideBar() {
    this.sidenavShow = (this.sidenavShow == '')? 'shownavrm' : '';
  }
}
