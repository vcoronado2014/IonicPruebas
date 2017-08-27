/**
 * Created by vcoronado on 16-08-2017.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService{
  public ambiente = 'pro'; //las opciones son dev o pro
  constructor(){

  }
  getUrl(nombreApi){
    let urlBase = '';
    let urlBaseDevUno = 'http://localhost:50929/api/';
    let urlBaseDevDos = 'http://localhost:58013/api/';
    let urlBaseProUno = 'http://api.asambleas.cl/api/';
    let urlBaseProDos = 'http://vcoronado-001-site8.dtempurl.com/api/';
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
}
