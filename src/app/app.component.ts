import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UsuariosPage } from '../pages/usuarios/usuarios';
//import { DetailsPage } from '../pages/details/details';
import { LoginPage } from '../pages/login/login';
import { RendicionesPage } from '../pages/rendiciones/rendiciones';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>
  public nombreUsuario: string;
  public rolUsuario: string;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    var paginaUno = {title: 'Inicio', component: HomePage, visible: true };
    var paginaDos = {title: 'Usuarios', component: UsuariosPage, visible: this.visibleRol };
    var paginaRendiciones= {title: 'Rendiciones', component: RendicionesPage, visible: this.visibleRol };
    this.nombreUsuario = sessionStorage.getItem('PERSONA_NOMBRE');
    this.rolUsuario = sessionStorage.getItem('ROL_NOMBRE');
    this.pages = [
      paginaUno, paginaDos, paginaRendiciones
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  //ESTO MUESTRA O NO MUESTRA LOS ACCESOS DEL MENU
  visibleRol(page){
    //antes hay que evaluar si tiene rol de institución
    var rolInstitucionId = sessionStorage.getItem("ROL_ID_INSTITUCION");
    var rolIdNormal = sessionStorage.getItem("ROL_ID");
    var rolId = 0;
    if (parseInt(rolInstitucionId) > 0)
      rolId = parseInt(rolInstitucionId);
    else
      rolId = parseInt(rolIdNormal);

    //si tiene rol de institucion es ese el elemento que hay que evaluar
    //de lo contrario se evalua el rolId


    if (rolId > 0)
    {
      //var rolId = sessionStorage.getItem("ROL_ID");
      switch (page.title){
        case 'Inicio':
        case 'Rendiciones':
          return true;
        case 'Usuarios':
          if (rolId == 1){
            return true;
          }
          else {
            return false;
          }
        default:
          return false;
      }

    }
    else{
      return false;
    }
  }
}

