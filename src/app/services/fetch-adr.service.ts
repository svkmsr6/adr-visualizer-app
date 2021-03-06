import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FetchAdrService {

  constructor(private http: Http) { }
  /**
   * API to validate whether from date is earlier than to date
   * @author svkmsr6
   * @param {string} from From date
   * @param {string} to To date
   * @returns {boolean} True or False
   */
  validate = (from, to) => {
    if ((from && from !== '') && (to && to !== '')) {
      const fromDate = from.split('-');
      const toDate = to.split('-');
      if ((+fromDate[0]) < (+toDate[0])) {
        return true;
      } else if ((+fromDate[0]) > (+toDate[0])) {
        return false;
             } else {
        if ((+fromDate[1]) < (+toDate[1])) {
          return true;
        } else if ((+fromDate[1]) > (+toDate[1])) {
          return false;
             } else {
          if ((+fromDate[2]) < (+toDate[2])) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }

  /**
   * API to validate whether from date and to date are not in the future
   * @author svkmsr6
   * @param {string} from From date
   * @param {string} to To date
   * @returns {boolean} True or False
   */
notFutureDate(from: string, to: string) {
    if (this.validate(from, to)) {
      const currentDate: any = new Date().getTime();
      let fromDate: any = from.split('-');
      let toDate: any = to.split('-');
      fromDate = new Date(fromDate[0], fromDate[1] - 1, fromDate[2]).getTime();
      toDate = new Date(toDate[0], toDate[1] - 1, toDate[2]).getTime();
      return ((fromDate < currentDate) && (toDate <= currentDate));
    } else {
      return false;
    }
  }

   /**
   * API to fetch ADR from date and to date are not in the future
   * @author svkmsr6
   * @param {string} from From date
   * @param {string} to To date
   * @returns {Observable} Observable for ADR data
   */
  getAdr(from: string, to: string): Observable<any> {
    // console.log('Details from '+from+' to '+to);
    if (this.notFutureDate(from, to)) {
      const apiURL = 'http://104.197.128.152/data/adrequests?from=' + from + '&to=' + to;
      return this.http.get(apiURL).
        map((res: Response) => res.json()).
        catch((err: any) => {
          // console.log('Error Catch', err);
          return Observable.throw(err);
        });
      } else {
      return Observable.throw({_body: 'Invalid Date(s) entered', status: -1});
    }
  }

}
