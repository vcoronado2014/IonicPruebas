/**
 * Created by vcoronado on 17-07-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UsuarioService{
  constructor(private http: Http){

  }
  getUsers(){
    let instId = sessionStorage.getItem("INST_ID");
    let rolId = sessionStorage.getItem("ROL_ID");
    let repos = this.http.get("http://api.asambleas.cl/api/ListarUsuarios?instId=" + instId + "&rolId=" + rolId);
    return repos;
  }

}
