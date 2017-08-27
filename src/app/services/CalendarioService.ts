/**
 * Created by vcoronado on 01-08-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CalendarioService{
  constructor(private http: Http){

  }
  getCalendar(url){
    let instId = sessionStorage.getItem("INST_ID");
    let tipo = '0';
    //let url = "http://api.asambleas.cl/api/Calendario";
    let dataGet = { InstId: instId, Tipo: tipo };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }

}
