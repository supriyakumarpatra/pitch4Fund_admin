import { Component } from '@angular/core';
import { LoadingService } from './loading.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'startup-angular';
  laoding$ = this.loader.loading$;
  constructor(private loader: LoadingService){}
}
