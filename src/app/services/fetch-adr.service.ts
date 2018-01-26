import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FetchAdrService {

  constructor(private http:Http) { }

  dateMsg:string = '1.To date must be later than the From date\n2.Both must be on or before the current date\n3.No empty dates allowed';

  validate = (from,to) =>{
    if((from && from !='')&&(to && to !='')){
      let fromDate = from.split('-');
      let toDate = to.split('-');
      if((+fromDate[0])<(+toDate[0]))
        return true;
      else if((+fromDate[0])>(+toDate[0]))
        return false;
      else{
        if((+fromDate[1])<(+toDate[1]))
          return true;
        else if((+fromDate[1])>(+toDate[1]))
          return false;
        else{
          if((+fromDate[2])<(+toDate[2]))
            return true;
          else 
            return false;        
        }    
      }
    }
  }

notFutureDate(from:string,to:string){
    if(this.validate(from,to)){
      let currentDate:any = new Date().getTime();
      let fromDate:any = from.split('-');
      let toDate:any = to.split('-');
      fromDate = new Date(fromDate[0],fromDate[1]-1,fromDate[2]).getTime();
      toDate = new Date(toDate[0],toDate[1]-1,toDate[2]).getTime();
      return ((fromDate<currentDate)&&(toDate<=currentDate));
    }
    else 
      return false;
  }

  getAdr(from:string,to:string):Observable<any>{
    //console.log('Details from '+from+' to '+to);
    if(this.notFutureDate(from,to)){
      let apiURL = 'http://104.197.128.152/data/adrequests?from='+from+'&to='+to;
      return this.http.get(apiURL).
        map((res:Response) =>res.json()).
        catch((err:any) =>{
          console.log('Error Catch', err);
          return Observable.throw(err);
        });
      }   
    else{
      alert(this.dateMsg);
    }     
  }

}
