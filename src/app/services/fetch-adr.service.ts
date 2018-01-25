import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

@Injectable()
export class FetchAdrService {

  constructor(private http:Http) { }

  validate = (from,to) =>{
      return true;
  }

  getAdr(from:string,to:string){
    //console.log('Details from '+from+' to '+to);
    if(this.validate(from,to)){
      let apiURL = 'http://104.197.128.152/data/adrequests?from='+from+'&to='+to;
      return this.http.get(apiURL).
        map((res:Response) =>res.json());
      }   
    else{

    }

      
  }

}
