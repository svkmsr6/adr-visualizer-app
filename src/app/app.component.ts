import { Component } from '@angular/core';
import { FetchAdrService } from '../app/services/fetch-adr.service';

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
  showError:boolean = false;
  dateMsg:string = `<h4>INPUT GUIDELINES</h4>
  1.To date must be later than the From date<br/>
  2.Both must be on or before the current date<br/>
  3.No empty dates allowed`;
  

  constructor(private fetchAdrSrvice:FetchAdrService){}
  
  /**
   * API to resolve data fetched from dashboard API
   * @author svkmsr6  
   * @returns none
   */
  callAPI(){
    let adrObservable:any = this.fetchAdrSrvice.getAdr(this.from,this.to);
    if(adrObservable){
      adrObservable.subscribe(
        res => {
          console.log(res);
          this.adrData = res.data;        
        },
        err => {
          console.log('Data Fetch error',err.status);
          if(err.status == 0)
            this.adrData = { msg: 'Network Connectivity Error', errorCode: err.status };
          else if(err.status == -1){
            this.adrData = { msg: this.dateMsg , errorCode: err.status };
          }
          else
            this.adrData = { msg: err._body , errorCode: err.status };
        }
      );
    }     
  }
}
