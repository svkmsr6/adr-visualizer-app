import { Component } from '@angular/core';
import { FetchAdrService } from '../app/services/fetch-adr.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ADR REQUEST DASHBOARD';
  from:any;
  to:any;
  adrData:any;

  constructor(private fetchAdrSrvice:FetchAdrService){}

  callAPI(){
    this.fetchAdrSrvice.getAdr(this.from,this.to)
      .subscribe(res => {
        this.adrData = res.data;        
      });
  }
}
