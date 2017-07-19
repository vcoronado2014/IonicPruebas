/**
 * Created by vcoronado on 17-07-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class InstitucionService{
  constructor(private http: Http){

  }
  getInstituciones(){
    let usuId = sessionStorage.getItem("USU_ID");
    let url = "http://api.asambleas.cl/api/Institucion";
    let dataGet = { IdUsuario: usuId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }

}
