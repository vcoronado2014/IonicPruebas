import { Component } from '@angular/core';
import {NavController, Config} from 'ionic-angular';
import { LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../app/services/UsuarioService';
import { AuthService } from '../../app/services/AuthService';
import { ConfigService } from '../../app/services/ConfigService';
import { GraficoService } from '../../app/services/GraficoService';
import { RendicionService } from '../../app/services/RendicionService';
import { LoginPage } from '../../pages/login/login';
import { DetailRendicionPage } from '../../pages/detail-rendicion/detail-rendicion';
import { ArrayFilterPipe } from "../../app/array-filter.pipe";


/**
 * Generated class for the RendicionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rendiciones',
  templateUrl: 'rendiciones.html',
  providers: [UsuarioService, AuthService, ArrayFilterPipe, ConfigService, RendicionService, GraficoService]
})
export class RendicionesPage {
  public nombreUsuario: string;
  public rendicionData;
  public rendicionDataOriginal;
  public countRendiciones: string;
  public graficoData;
  //charts
/*
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
*/

  chartOptions: any;
  icons: string = "list";
  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    private auth: AuthService,
    private config: ConfigService,
    private rend: RendicionService,
    private graf: GraficoService,
    private alert: AlertController,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private usu: UsuarioService
  ) {
    this.icons = "list";
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

      let urlGraf = this.config.getUrl('Grafico');
      this.graf.get(urlGraf, 'INGRESOS_EGRESOS').subscribe(
        dataG => {
          this.graficoData = dataG.json();
          let categories = ['Dinero'];
          let series = [];
          let dataIngresos = [];
          let dataEgresos = [];

          //aca deberiamos armar el grafico
          if (this.graficoData){
            dataIngresos.push(this.graficoData[0].value);
            dataEgresos.push(this.graficoData[1].value);
            let serie1 = { name: this.graficoData[0].label, data: dataIngresos, color: '#7cb5ec' };
            let serie2 = { name: this.graficoData[1].label, data: dataEgresos, color: 'salmon' };

            series.push(serie1);
            series.push(serie2);

          }
          else {
            series = [{
              name: 'Ingresos',
              data: [0]
            }, {
              name: 'Egresos',
              data: [0]
            }]
          }

          //chart
          this.chartOptions = {
            chart: {
              type: 'bar'
            },
            title: {
              text: 'Ingresos/Egresos'
            },
            xAxis: {
              categories: categories
            },
            yAxis: {
              title: {
                text: 'Valor'
              }
            },
            series: series
          };

        },
        err => console.error(err),
        () => console.log('get graph completed')
      );

      //chart
      /*
      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Ingresos/Egresos'
        },
        xAxis: {
          categories: ['Ingresos', 'Egresos']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }]
      };
      */
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
