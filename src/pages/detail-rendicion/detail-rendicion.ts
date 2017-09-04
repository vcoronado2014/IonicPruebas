import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
//import { DatePicker } from '@ionic-native/date-picker';
import { LoadingController } from 'ionic-angular';
import { ConfigService } from '../../app/services/ConfigService';
import { RendicionService } from '../../app/services/RendicionService';

import { RendicionesPage } from '../../pages/rendiciones/rendiciones';
/**
 * Generated class for the DetailRendicionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-rendicion',
  templateUrl: 'detail-rendicion.html',
  providers: [ ConfigService, RendicionService]
})
export class DetailRendicionPage {

  public accion="";
  public NombreCompleto="";
  public rendicion;
  public rendicionDevolver;
  public esNuevo: boolean;
  public idRendicionRecuperado;
  public InstId;
  public dataTipoMovimiento;
  public muestraBotonCambiarClave=false;

  //del formulario
  public Detalle="";
  public TpmId;
  public FechaRegistro;
  public Monto;
  public NumeroComprobante="";

  constructor(
    private config: ConfigService,
    private rend: RendicionService,
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    //private datePicker: DatePicker,
    private navParams: NavParams
  ) {
    this.rendicion = navParams.get('rendicion');

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //aca las llamadas ajax
      this.listarTipoMovimientos();
      this.recuperarRendicion(this.rendicion.Id);

      loader.dismiss();
    });
  }

  recuperarRendicion(id){
    if (id > 0) {
      let url = this.config.getUrl('Rendicion');
      this.rend.getRendicionById(id, url).subscribe(
        data => {
          this.muestraBotonCambiarClave = true;
          this.rendicionDevolver = data.json().proposals;
          //seteamos titulo
          this.accion = 'Editando ';
          this.esNuevo = false;
          this.InstId = sessionStorage.getItem("INST_ID");
          this.idRendicionRecuperado = this.rendicionDevolver[0].Id;
          this.Detalle = this.rendicionDevolver[0].NombreCompleto;
          if (this.rendicionDevolver[0].OtroUno == 'Ingreso'){
            this.TpmId = 1;
          }
          else {
            this.TpmId = 2;
          }
          this.FechaRegistro = this.transfromaFecha(this.rendicionDevolver[0].NombreUsuario);
          this.Monto = parseInt(this.rendicionDevolver[0].OtroTres);
          this.NumeroComprobante = this.rendicionDevolver[0].OtroDos;



 /*         this.muestraBotonCambiarClave = true;
          this.soloLectura = true;
          this.usuarioDevolver = data.json();
          this.Persona = this.usuarioDevolver.Persona;
          this.AutentificacionUsuario = this.usuarioDevolver.AutentificacionUsuario;
          this.Comuna = this.usuarioDevolver.Comuna;
          this.Institucion = this.usuarioDevolver.Institucion;
          this.Region = this.usuarioDevolver.Region;
          this.RolUsuario = this.usuarioDevolver.Rol;
          this.idUsuarioRecuperado = this.AutentificacionUsuario.Id;
          this.NombreUsuario = this.AutentificacionUsuario.NombreUsuario;

          //variables del formulario
          this.esNuevo = false;
          this.NombreInstitucion = this.Institucion.Nombre;
          this.InstId = this.Institucion.Id;
          this.Nombres = this.Persona.Nombres;
          this.ApellidoPaterno = this.Persona.ApellidoPaterno;
          this.ApellidoMaterno = this.Persona.ApellidoMaterno;
          this.Rut = this.Persona.Rut;
          this.Direccion = this.Persona.DireccionCompleta;
          this.CorreoElectronico = this.AutentificacionUsuario.CorreoElectronico;
          this.Telefono = this.Persona.Telefonos;
          this.RegId = this.Region.Id;
          this.ComId = this.Comuna.Id;
          this.RolIdUsuario = this.RolUsuario.Id;

          //seteamos titulo
          this.accion = 'Editando ';
          this.NombreCompleto =this.Nombres + ' ' + this.ApellidoPaterno + ' ' + this.ApellidoMaterno;
          this.listarComunas(this.RegId);*/

        },
        err => console.error(err),
        () => console.log('get rendicion ' + this.rendicion.Id)
      );
    }
    else {
      this.esNuevo = true;
      this.idRendicionRecuperado = 0;
      this.TpmId = 1;
      this.InstId = sessionStorage.getItem("INST_ID");
      //seteamos titulo
      this.accion = 'Creando ';
      this.NombreCompleto = 'Rendición nueva.';
      this.FechaRegistro = new Date().toISOString();
      this.Monto = 0;
      //listamos las comunas de la metropolitana


    }
  }
  listarTipoMovimientos(){
    var tipo1 = { Id: 1, Nombre: 'Ingreso' };
    var tipo2 = { Id: 2, Nombre: 'Egreso' };
    this.dataTipoMovimiento = [];
    this.dataTipoMovimiento.push(tipo1);
    this.dataTipoMovimiento.push(tipo2);

  }
  transfromaFecha(fechaDevuleta){
    var arr = fechaDevuleta.split('/');
    var dia = parseInt(arr[1]);
    var mes = parseInt(arr[0]) - 1;
    var anno = parseInt(arr[2]);

    var fechaDevolver = new Date(anno, mes, dia).toISOString();
    return fechaDevolver;
  }

  presentPrompt() {
    let alert = this.alert.create({
      title: 'Seleccione Archivo',
      inputs: [
        {
          name: 'archivo',
          placeholder: 'Seleccione',
          type: 'file'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            /*
            if (this.isValid(data.nuevaClave, data.confirmeClave)){
              this.cambiarClave(data.nuevaClave);
              console.log('Correcto');
            }
            */
            console.log('Correcto');
          }
        }
      ]
    });
    alert.present();
  }

}
