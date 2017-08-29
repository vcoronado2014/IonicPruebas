/**
 * Created by vcoronado on 29-08-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RolInstitucionService{
  constructor(private http: Http){

  }
  getRoles(url){
    let instId = sessionStorage.getItem("INST_ID");
    //let url = "http://api.asambleas.cl/api/ObtenerRoles";
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }


}
