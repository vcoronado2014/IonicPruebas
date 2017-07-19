/**
 * Created by vcoronado on 17-07-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MovimientoService{
  constructor(private http: Http){

  }
  getMovimientos(){
    let instId = sessionStorage.getItem("INST_ID");
    let url = "http://api.asambleas.cl/api/rendicion";
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }

}
