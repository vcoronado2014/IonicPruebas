import { Component } from '@angular/core';
import {NavController, Config} from 'ionic-angular';
import { LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';
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
    private alert: AlertController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
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

  presentConfirmActivar(usuario) {
    let alert = this.alert.create({
      title: 'Activar',
      message: '¿Esta seguro de Activar este Usuario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelada la activacion');
          }
        },
        {
          text: 'Si',
          handler: () => {
            //realizar la operación de eliminación
            //solo se debe enviar al Usuario con parametro eliminado = 1
            var dataEliminar = {
              IdUsuario: usuario.Id
            };
            let url = this.config.getUrl('ObtenerUsuario') + '?id='+ dataEliminar.IdUsuario + '&activar=1';
            this.usu.eliminar(dataEliminar, url).subscribe(
              data => {
                if (data.status == 200) {
                  //todo ok
                  let mi = this.presentToast('Usuario activado con éxito.', 'top', 5000);
                  this.navCtrl.setRoot(UsuariosPage);



                }
                else {
                  let mi = this.presentToast('Error al guardar.', 'bottom', 4000);
                }
              },
              err => console.error(err),
              () => console.log('delete user ' + dataEliminar.IdUsuario)
            );

            console.log('Eliminado.');
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(usuario) {
    let alert = this.alert.create({
      title: 'Eliminar',
      message: '¿Esta seguro de eliminar este Usuario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelada la eliminación');
          }
        },
        {
          text: 'Si',
          handler: () => {
            //realizar la operación de eliminación
            //solo se debe enviar al Usuario con parametro eliminado = 1
            var dataEliminar = {
              IdUsuario: usuario.Id
            };
            let url = this.config.getUrl('ObtenerUsuario') + '?id='+ dataEliminar.IdUsuario + '&activar=0';
            this.usu.eliminar(dataEliminar, url).subscribe(
              data => {
                if (data.status == 200) {
                  //todo ok
                  let mi = this.presentToast('Usuario eliminado con éxito.', 'top', 5000);
                  this.navCtrl.setRoot(UsuariosPage);



                }
                else {
                  let mi = this.presentToast('Error al guardar.', 'bottom', 4000);
                }
              },
              err => console.error(err),
              () => console.log('delete user ' + dataEliminar.IdUsuario)
            );

            console.log('Eliminado.');
          }
        }
      ]
    });
    alert.present();
  }

  eliminarUsuario(usuario){
    let mensaje = this.presentConfirm(usuario);

  }
  activarUsuario(usuario){
    let mensaje = this.presentConfirmActivar(usuario);
  }
  muestraBotonEliminar(usuario){
    if (usuario.OtroDos == "0") {
      return true;
    }
    else {
      return false;
    }
  }
  muestraBotonActivar(usuario){
    if (usuario.OtroDos == "1") {
      return true;
    }
    else {
      return false;
    }
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
  presentToast = function(mensaje, posicion, duracion) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
