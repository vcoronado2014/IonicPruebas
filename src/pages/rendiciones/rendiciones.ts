import { Component } from '@angular/core';
import {NavController, Config} from 'ionic-angular';
import { LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../app/services/UsuarioService';
import { AuthService } from '../../app/services/AuthService';
import { ConfigService } from '../../app/services/ConfigService';
import { RendicionService } from '../../app/services/RendicionService';
import { LoginPage } from '../../pages/login/login';
import { DetailRendicionPage } from '../../pages/detail-rendicion/detail-rendicion';
import { ArrayFilterPipe } from "../../app/array-filter.pipe";
import { ChartsModule } from 'ng2-charts';
//import '../node_modules/chart.js/dist/Chart.bundle.min.js';
//import * as Chart from 'chart.js';

/**
 * Generated class for the RendicionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rendiciones',
  templateUrl: 'rendiciones.html',
  providers: [UsuarioService, AuthService, ArrayFilterPipe, ConfigService, RendicionService, ChartsModule]
})
export class RendicionesPage {
  public nombreUsuario: string;
  public rendicionData;
  public rendicionDataOriginal;
  public countRendiciones: string;
  //charts

  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  chartType: string = 'bar';
  chartLegend: boolean = true;

  chartData: any[] = [
    { data: [75, 80, 45, 100], label: 'Student A' },
    { data: [80, 55, 75, 95], label: 'Student B' }
  ];

  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    private auth: AuthService,
    private config: ConfigService,
    private rend: RendicionService,
    private alert: AlertController,
    public toastCtrl: ToastController,
    public chart: ChartsModule,
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
      let url = this.config.getUrl('Rendicion');
      this.rend.getRendicion(url).subscribe(
        data => {
          this.rendicionData = data.json().proposals;
          this.rendicionDataOriginal = this.rendicionData;
          this.countRendiciones = this.rendicionData.length;
        },
        err => console.error(err),
        () => console.log('get rendicion completed')
      );
      loader.dismiss();
    });

  }

  filterData(){
    var nombre = document.getElementById('txtNombreBuscar').getElementsByTagName('input')[0].value;
    if (nombre == '') {
      this.rendicionData = this.rendicionDataOriginal;
      return this.rendicionData;
    }
    else {
      this.rendicionData = this.rendicionData.filter((rendicion) => {
        return rendicion.NombreCompleto.includes(nombre) || rendicion.OtroDos.includes(nombre) || rendicion.OtroUno.includes(nombre);
      });
    }
  }
  clearData(){
    document.getElementById('txtNombreBuscar').getElementsByTagName('input')[0].value = '';
    this.rendicionData = this.rendicionDataOriginal;
    return this.rendicionData;
  }

  goToDetails(rendicion){
    this.navCtrl.push(DetailRendicionPage, {rendicion: rendicion });
  }
  goToDetailsNuevo(id){

    var user = {Id:id};
    this.navCtrl.push(DetailRendicionPage, {rendicion: user });

  }
  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
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

  muestraBotonEliminar(usuario){
      return true;
  }

  eliminar(rendicion){
    //let mensaje = this.presentConfirm(rendicion);

  }
}
