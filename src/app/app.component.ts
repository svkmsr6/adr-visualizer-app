import { Component } from '@angular/core';
import { FetchAdrService } from '../app/services/fetch-adr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AD REQUEST DASHBOARD';
  from:any;
  to:any;

  constructor(private fetchAdrSrvice:FetchAdrService){}

  callAPI(){
    this.fetchAdrSrvice.getAdr(this.from,this.to);
  }
}
