import { Injectable } from '@angular/core';

@Injectable()
export class FetchAdrService {

  constructor() { }

  getAdr(from:any,to:any){
    console.log('Details from '+from+' to '+to);
  }

}
