/**
 * Created by vcoronado on 13-07-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  username: string;
  loggedIn: boolean;
  url: 'http://api.asambleas.cl/api/login';


  constructor(private http: Http){
    //inicializamos los valores
    this.username = '';
    this.loggedIn = false;

  }

  login(userInfo){
    //let url = this.url;
    let url = 'http://api.asambleas.cl/api/login';
    let iJson = JSON.stringify(userInfo);

    return this.http.post(url, iJson, {
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .map(res => res.text())
      .map(res => {
          if (res == "error" || res == "nofound"){
            this.loggedIn = false;
          } else {
            //localStorage.setItem('user_id', res.AutentificacionUsuario.Id);
            //this.username = res.AutentificacionUsuario.NombreUsuario;
            //vamos a dividir el retorno
            let retorno = JSON.parse(res);

            sessionStorage.setItem('USU_ID', retorno.AutentificacionUsuario.Id);
            sessionStorage.setItem('ROL_ID', retorno.Rol.Id);
            sessionStorage.setItem('ROL_NOMBRE', retorno.Rol.Nombre);
            sessionStorage.setItem('INST_ID', retorno.Institucion.Id);
            sessionStorage.setItem('INSTITUCION_NOMBRE', retorno.Institucion.Nombre);
            sessionStorage.setItem('PERSONA_NOMBRE', retorno.Persona.Nombres + ' ' + retorno.Persona.ApellidoPaterno + ' ' + retorno.Persona.ApellidoMaterno);
            sessionStorage.setItem('REG_ID', retorno.Region.Id);
            sessionStorage.setItem('REG_NOMBRE', retorno.Region.Nombre);
            sessionStorage.setItem('COM_ID', retorno.Comuna.Id);
            sessionStorage.setItem('COM_NOMBRE', retorno.Comuna.Nombre);

            this.username = userInfo.usuario;
            this.loggedIn = true;
          }
          return this.loggedIn;
        }
      );

  }
  logout(): void  {
    sessionStorage.clear();
    /*
    localStorage.removeItem('USU_ID');
    localStorage.removeItem('ROL_ID');
    localStorage.removeItem('ROL_NOMBRE');
    localStorage.removeItem('INST_ID');
    localStorage.removeItem('INSTITUCION_NOMBRE');
    localStorage.removeItem('PERSONA_NOMBRE');
    localStorage.removeItem('REG_ID');
    localStorage.removeItem('REG_NOMBRE');
    localStorage.removeItem('COM_ID');
    localStorage.removeItem('COM_NOMBRE');
    */
    this.username = '';
    this.loggedIn = false;
  }
  isLoggedId(){
    return this.loggedIn;
  }


  /*
  getRepos(username){
    let repos = this.http.get("https://api.github.com/users/" + username + "/repos");
    return repos;
  }
  getDetails(repo){
    let headers = new Headers();
    headers.append('Accept', 'application/vnd.github.VERSION.html');
    return this.http.get(repo.url + '/readme', { headers: headers });
  }
  */
}
