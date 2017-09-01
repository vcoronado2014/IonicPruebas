/**
 * Created by vcoronado on 13-07-2017.
 */
import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  username: string;
  loggedIn: boolean;

  constructor(
    private http: Http
  ){
    //inicializamos los valores
    this.username = '';
    this.loggedIn = false;
    //this.url = config.getUrl(this.modo, 'Login');

  }

  login(userInfo, url){
    //let url = this.url;
    //let url = 'http://api.asambleas.cl/api/login';

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
            sessionStorage.setItem('ROL_NOMBRE_INSTITUCION', retorno.RolInstitucion.Nombre);
            sessionStorage.setItem('ROL_ID_INSTITUCION', retorno.RolInstitucion.IdOriginal);

            this.username = userInfo.usuario;
            this.loggedIn = true;
          }
          return this.loggedIn;
        }
      );

  }
  logout(): void  {
    sessionStorage.clear();

    this.username = '';
    this.loggedIn = false;
  }
  isLoggedId(){
    return this.loggedIn;
  }

}
