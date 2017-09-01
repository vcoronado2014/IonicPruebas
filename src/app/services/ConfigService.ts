/**
 * Created by vcoronado on 16-08-2017.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService{
  public ambiente = 'pro'; //las opciones son dev o pro
  //variables de las acciones
  //puede editar agregar un nuevo registro

  constructor(){

  }
  getUrl(nombreApi){
    let urlBase = '';
    let urlBaseDevUno = 'http://localhost:58013/api/';
    let urlBaseDevDos = 'http://localhost:58013/api/';
    let urlBaseProUno = 'http://api.asambleas.cl/api/';
    let urlBaseProDos = 'http://api.asambleas.cl/api/';
    switch (nombreApi){
      case 'Votacion':
      case 'Tricel':
      case 'ArchivoProyecto':
      case 'VotarProyecto':
      case 'ResponsableTricel':
      case 'UsuarioLista':
      case 'Contacto':
      case 'Logs':
      case 'VotarTricel':
      case 'Asistente':
      case 'Articulo':
      case 'Vinculo':
      case 'FileExcel':
      case 'CargaMasiva':
      case 'Slide':
      case 'ConfiguracionNodo':
      case 'Inicio':
      case 'Reporte':
      case 'Proyecto':
        if (this.ambiente == 'dev'){
          urlBase = urlBaseDevDos + nombreApi;
        }
        else{
          urlBase = urlBaseProDos + nombreApi;
        }
        break;
      default:
        if (this.ambiente == 'dev'){
          urlBase = urlBaseDevUno + nombreApi;
        }
        else{
          urlBase = urlBaseProUno + nombreApi;
        }
        break;
    }
    return urlBase;
  }

  //este metodo define las acciones que un usuario puede hacer
  //en las páginas


  puedeCrearUsuario(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return false;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  puedeCrearRendicion(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return true;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  verBotonModificarUsuario(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return false;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  verBotonEliminarUsuario(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return false;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  verBotonActivarUsuario(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return false;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  verBotonModificarRendicion(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return true;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }

  verBotonEliminarrRendicion(item)
  {
    let rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    let rolIdNormal = sessionStorage.getItem("ROL_ID");
    let rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);
    switch (rolId){
      //super
      case 1:
        return true;
      //administrador, presidente
      case 2:
      case 3:
        return true;
      //tesorero, secretario, vicepresidente
      case 4:
      case 5:
      case 6:
        return true;
      //director, director cpas, delegado
      case 7:
      case 8:
      case 10:
        return false;
      //apoderado
      case 9:
        return false;
      default:
        return false;
    }

  }
}
