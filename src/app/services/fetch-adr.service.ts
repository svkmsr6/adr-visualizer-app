import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable()
export class FetchAdrService {

  constructor(private http:Http) { }

  validate = (from,to) =>{
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

  getAdr(from:string,to:string){
    //console.log('Details from '+from+' to '+to);
    if(this.validate(from,to)){
      let apiURL = 'http://104.197.128.152/data/adrequests?from='+from+'&to='+to;
      return this.http.get(apiURL).
        map((res:Response) =>res.json());
      }   
    else{
      alert('To date must be later than the From date');
    }

      
  }

}
