/**
 * Created by vcoronado on 01-09-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GraficoService{
  constructor(private http: Http){

  }
  get(url, nombreGrafico){
    let instId = sessionStorage.getItem("INST_ID");
    let dataGet = { InstId: instId, NombreGrafico: nombreGrafico };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }

}
