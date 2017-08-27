/**
 * Created by vcoronado on 08-08-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RegionesService{
  constructor(private http: Http){

  }
  getRegiones(url){
    let instId = sessionStorage.getItem("INST_ID");
    //let url = "http://api.asambleas.cl/api/ObtenerRegiones";
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }


}
