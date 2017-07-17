/**
 * Created by vcoronado on 17-07-2017.
 */
//http://api.asambleas.cl/api/FileDocumento
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DocumentoService{
  constructor(private http: Http){

  }
  getDocumentos(){
    let instId = sessionStorage.getItem("INST_ID");
    let usuId = sessionStorage.getItem("USU_ID");
    let url = "http://api.asambleas.cl/api/FileDocumento";
    let dataGet = { InstId: instId, UsuId: usuId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }

}

