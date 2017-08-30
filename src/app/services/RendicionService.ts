/**
 * Created by vcoronado on 30-08-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RendicionService{
  constructor(private http: Http){

  }
  getRendicion(url){
    let instId = sessionStorage.getItem("INST_ID");
    let dataGet = { InstId: instId };

    let repos = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return repos;
  }
  getRendicionById(id, url){
    let instId = sessionStorage.getItem("INST_ID");
    let dataGet = { BuscarId: id, InstId: instId };

    let rendicion = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return rendicion;
  }
  guardar(data, url){
    //let url = "http://api.asambleas.cl/api/ObtenerUsuario";
    let dataPut = data;

    let rendicion = this.http.put(url, dataPut, {
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return rendicion;
  }

  eliminar(data, url){
    let dataPut = data;

    let rendicion = this.http.delete(url, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    return rendicion;
  }


}
