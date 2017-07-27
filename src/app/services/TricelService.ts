/**
 * Created by root on 26/07/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TricelService{
  constructor(private http: Http){

  }
  getTricel(){
    let instId = sessionStorage.getItem("INST_ID");
    let url = "http://vcoronado-001-site8.dtempurl.com/api/Votacion";
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }


}
