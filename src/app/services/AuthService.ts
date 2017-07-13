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

            localStorage.setItem('USU_ID', retorno.AutentificacionUsuario.Id);
            localStorage.setItem('ROL_ID', retorno.Rol.Id);
            localStorage.setItem('ROL_NOMBRE', retorno.Rol.Nombre);
            localStorage.setItem('INST_ID', retorno.Institucion.Id);
            localStorage.setItem('INSTITUCION_NOMBRE', retorno.Institucion.Nombre);
            localStorage.setItem('PERSONA_NOMBRE', retorno.Persona.Nombres + ' ' + retorno.Persona.ApellidoPaterno + ' ' + retorno.Persona.ApellidoMaterno);
            localStorage.setItem('REG_ID', retorno.Region.Id);
            localStorage.setItem('REG_NOMBRE', retorno.Region.Nombre);
            localStorage.setItem('COM_ID', retorno.Comuna.Id);
            localStorage.setItem('COM_NOMBRE', retorno.Comuna.Nombre);

            this.username = userInfo.usuario;
            this.loggedIn = true;
          }
          return this.loggedIn;
        }
      );

  }
  logout(): void  {
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
