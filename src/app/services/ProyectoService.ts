/**
 * Created by vcoronado on 25-07-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProyectoService{
  constructor(private http: Http){

  }
  getProyectos(){
    let instId = sessionStorage.getItem("INST_ID");
    let url = "http://vcoronado-001-site8.dtempurl.com/api/Proyecto";
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }


}
