import { Component } from '@angular/core';
import {NavController, Config} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../app/services/UsuarioService';
import { AuthService } from '../../app/services/AuthService';
import { ConfigService } from '../../app/services/ConfigService';
import { LoginPage } from '../../pages/login/login';
import { ArrayFilterPipe } from "../../app/array-filter.pipe";
import { DetailsPage } from '../../pages/details/details';

/**
 * Generated class for the UsuariosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
  providers: [UsuarioService, AuthService, ArrayFilterPipe, ConfigService]
})
export class UsuariosPage {
  public username;
  public nombreUsuario: string;
  public userData;
  public userDataOriginal;
  public countUsuarios: string;

  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    private auth: AuthService,
    private config: ConfigService,
    private usu: UsuarioService
  ) {
    this.nombreUsuario = sessionStorage.getItem('PERSONA_NOMBRE');
    //aca se puede trabajar con el loading controller
    //iniciamos loading
    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //aca el contenido de las llamadas de negocio
      //get users dependiendo del rol
      let url = this.config.getUrl('ListarUsuarios');
      this.usu.getUsers(url).subscribe(
        data => {
          this.userData = data.json().proposals;
          this.userDataOriginal = this.userData;
          this.countUsuarios = this.userData.length;
        },
        err => console.error(err),
        () => console.log('get users completed')
      );

      loader.dismiss();
    });


  }
  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  filterData(){
    //let nombre = getElementById('txtNombreBuscar').value;
    var nombre = document.getElementById('txtNombreBuscar').getElementsByTagName('input')[0].value;
    if (nombre == '') {
      this.userData = this.userDataOriginal;
      return this.userData;
    }
    else {
      this.userData = this.userData.filter((usuario) => {
        //this.countUsuarios = this.userData.length;
        //return usuario.NombreCompleto.includes(nombre) || usuario.NombreUsuario.includes(nombre);
        return usuario.NombreCompleto.includes(nombre) || usuario.NombreUsuario.includes(nombre) || usuario.Rol.includes(nombre) || usuario.OtroUno.includes(nombre);
      });
    }
  }
  clearData(){
    document.getElementById('txtNombreBuscar').getElementsByTagName('input')[0].value = '';
    this.userData = this.userDataOriginal;
    return this.userData;
  }

  goToDetails(usuario){
  this.navCtrl.push(DetailsPage, {usuario: usuario });
}
  goToDetailsNuevo(id){
    var user = {Id:id};
    this.navCtrl.push(DetailsPage, {usuario: user });
  }

}
