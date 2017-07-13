import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/services/AuthService';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: string;
  password: string;
  isLogged: boolean;

  constructor(
    private nav: NavController,
    private auth: AuthService
  ) {
  }
  Signup(){
    //console.log('login');
    let f = { usuario: this.usuario, password: this.password };
    this.auth.login(f)
      .subscribe(
        rs => this.isLogged = rs,
        er => console.log(er),
        () => {
          if (this.isLogged){
            this.nav.setRoot(HomePage)
              .then(data => console.log(data),
              error => console.log(error)
              );
          } else {
            //incorrecto
            console.log('Acceso denegado');
          }

        }
      )

  }
}
