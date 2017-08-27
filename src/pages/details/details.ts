import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConfigService } from '../../app/services/ConfigService';
import { GitHubService } from '../../app/services/github';
import { UsuarioService } from '../../app/services/UsuarioService';
import { RegionesService } from '../../app/services/RegionesService';
import { ComunasService } from '../../app/services/ComunasService';
import { RolService } from '../../app/services/RolService';
import { InstitucionService } from '../../app/services/InstitucionService';
import { UsuariosPage } from '../../pages/usuarios/usuarios';
//let url = this.config.getUrl('Login');

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService, UsuarioService, RegionesService, ComunasService, RolService, InstitucionService, ConfigService]
})
export class DetailsPage {
  public readme = "";
  public usuario;
  public usuarioDevolver;
  public Persona;
  public AutentificacionUsuario;
  public Comuna;
  public Region;
  public Institucion;
  public RolUsuario;
  public title = "";
  public idUsuarioRecuperado;
  //variables del Formulario
  public NombreUsuario="";
  public esNuevo: boolean;
  public accion="";
  public NombreCompleto="";
  public InstId;
  public NombreInstitucion="";
  public Nombres ="";
  public ApellidoPaterno ="";
  public ApellidoMaterno ="";
  public Rut = "";
  public Direccion ="";
  public RegId;
  public ComId;
  public CorreoElectronico="";
  public Telefono="";
  public RolIdUsuario;
  public dataRegiones;
  public dataComunas;
  public dataRoles;
  public dataInstituciones;
  public muestraBotonCambiarClave=false;
  public soloLectura=true;
  public desabilitaComboInstituciones=true;



  constructor(
    private github: GitHubService,
    private config: ConfigService,
    private usu: UsuarioService,
    private reg: RegionesService,
    private com: ComunasService,
    private rol: RolService,
    private inst: InstitucionService,
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    private navParams: NavParams
    ) {
      this.usuario = navParams.get('usuario');

      let loader = this.loading.create({
        content: 'Cargando...',
      });
    loader.present().then(() => {
      //recuperamos los datos del usuario
      this.recuperarUsuario(this.usuario.Id);
      this.listarRegiones();
      this.listarRoles();
      this.listarInstituciones();
      this.evaluaRol();
      loader.dismiss();

    });
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
  presentPrompt() {
    let alert = this.alert.create({
      title: 'Cambiar Clave',
      inputs: [
        {
          name: 'nuevaClave',
          placeholder: 'Nueva Clave',
          type: 'password'
        },
        {
          name: 'confirmeClave',
          placeholder: 'Repita Clave',
          type: 'password'
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
          text: 'Cambiar',
          handler: data => {
            if (this.isValid(data.nuevaClave, data.confirmeClave)){
              this.cambiarClave(data.nuevaClave);
              console.log('Correcto');
            }

          }
        }
      ]
    });
    alert.present();
  }

  recuperarUsuario(id){
    if (id > 0) {
      let url = this.config.getUrl('ObtenerUsuario');
      this.usu.getUserById(id, url).subscribe(
        data => {
          this.muestraBotonCambiarClave = true;
          this.soloLectura = true;
          this.usuarioDevolver = data.json();
          //this.countUsuarios = this.userData.length;
          this.Persona = this.usuarioDevolver.Persona;
          this.AutentificacionUsuario = this.usuarioDevolver.AutentificacionUsuario;
          this.Comuna = this.usuarioDevolver.Comuna;
          this.Institucion = this.usuarioDevolver.Institucion;
          this.Region = this.usuarioDevolver.Region;
          this.RolUsuario = this.usuarioDevolver.Rol;
          //this.title = this.Persona.Nombres;
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
          this.listarComunas(this.RegId);

        },
        err => console.error(err),
        () => console.log('get user ' + this.Persona.Id)
      );
    }
    else {
      this.soloLectura = false;
      this.esNuevo = true;
      this.idUsuarioRecuperado = 0;
      this.RegId = 15;
      this.ComId = 0;
      this.RolIdUsuario = 0;
      //seteamos titulo
      this.accion = 'Creando ';
      this.NombreCompleto = 'usuario nuevo.';
      //listamos las comunas de la metropolitana
      this.listarComunas(this.RegId);

    }
  }
  listarRegiones(){
    let url = this.config.getUrl('ObtenerRegiones');
    this.reg.getRegiones(url).subscribe(
      data => {
        this.dataRegiones = data.json();
      },
      err => console.error(err),
      () => console.log('get regiones')
    );
  }

  guardar(){
    //verificar si es nuevo o antiguo
    var password = '';
    if (this.esNuevo){
      password = this.Rut;
    }
    var dataGuardar = {
        Id: this.idUsuarioRecuperado,
        IdUsuario: this.idUsuarioRecuperado,
        Correo: this.CorreoElectronico,
        Nombres: this.Nombres,
        PrimerApellido: this.ApellidoPaterno,
        SegundoApellido: this.ApellidoMaterno,
        Rut: this.Rut,
        Telefono: this.Telefono,
        IdRegion: this.RegId,
        IdComuna: this.ComId,
        Direccion: this.Direccion,
        IdRol: this.RolIdUsuario,
        NombreUsuario: this.NombreUsuario,
        Password: password,
        InstId: this.InstId
    };
    //alert(dataGuardar);
    //ahora guardamos
    if (this.isValidForm()) {
      let url = this.config.getUrl('ObtenerUsuario');
      this.usu.guardar(dataGuardar, url).subscribe(
        data => {
          if (data.status == 200) {
            //todo ok
            if (this.esNuevo) {
              let mi = this.presentToast('Guardado con éxito, su clave es su rut', 'top', 5000);
            }
            else {
              let mi = this.presentToast('Guardado con éxito.', 'top', 5000);
            }
            this.nav.setRoot(UsuariosPage);
          }
          else {
            let mi = this.presentToast('Error al guardar.', 'bottom', 4000);
          }
        },
        err => console.error(err),
        () => console.log('modify user ' + dataGuardar.IdUsuario)
      );
    }
  }
  cambiarClave(nuevaPassword){
    //verificar si es nuevo o antiguo
    var password = nuevaPassword;
    var dataGuardar = {
      Id: this.idUsuarioRecuperado,
      IdUsuario: this.idUsuarioRecuperado,
      Correo: this.CorreoElectronico,
      Nombres: this.Nombres,
      PrimerApellido: this.ApellidoPaterno,
      SegundoApellido: this.ApellidoMaterno,
      Rut: this.Rut,
      Telefono: this.Telefono,
      IdRegion: this.RegId,
      IdComuna: this.ComId,
      Direccion: this.Direccion,
      IdRol: this.RolIdUsuario,
      NombreUsuario: this.NombreUsuario,
      Password: password,
      InstId: this.InstId
    };
    if (this.isValidForm()) {
      let url = this.config.getUrl('ObtenerUsuario');
      this.usu.guardar(dataGuardar, url).subscribe(
        data => {
          //this.dataInstituciones = data.json().proposals;
          //verificar la respuesta del guardado
          if (data.status == 200) {
            //todo ok
            let mi = this.presentToast('Clave cambiada con éxito', 'bottom', 4000);
            this.nav.setRoot(UsuariosPage);
          }
          else {
            let mi = this.presentToast('Error al cambiar clave.', 'bottom', 4000);
          }
        },
        err => console.error(err),
        () => console.log('modify user ' + dataGuardar.IdUsuario)
      );
    }
  }
  listarInstituciones(){
    let url = this.config.getUrl('Institucion');
    this.inst.getInstituciones(url).subscribe(
      data => {
        this.dataInstituciones = data.json().proposals;
      },
      err => console.error(err),
      () => console.log('get regiones')
    );
  }
  listarComunas(regId){
    let url = this.config.getUrl('ObtenerComunas');
    this.com.getComunas(regId, url).subscribe(
      data => {
        this.dataComunas = data.json();
      },
      err => console.error(err),
      () => console.log('get comunas ' + regId)
    );
  }
  listarRoles(){
    let url = this.config.getUrl('ObtenerRoles');
    this.rol.getRoles(url).subscribe(
      data => {
        this.dataRoles = data.json();
      },
      err => console.error(err),
      () => console.log('get roles')
    );
  }
  cargarComunasCombo(event){
    //ver aca el evento.
    if (event) {
      this.listarComunas(event);
      this.ComId = 0;
    }
    else {
      this.dataComunas = [{Id:0, Nombre: 'Seleccione Región'}];
      this.ComId = 0;
    }
  }
  evaluaRol(){
    var idRol = sessionStorage.getItem("ROL_ID");
    if(idRol == '1'){
      this.desabilitaComboInstituciones = false;
    }
    else {
      this.desabilitaComboInstituciones = true;
    }
  }
  isValid(nuevaPassword, repitaPassword){
    if (nuevaPassword.length > 5){
      if (nuevaPassword != repitaPassword){
        let mi = this.presentToast('Las contraseñas deben ser iguales', 'bottom', 4000);
        return false;
      }
    }
    else {
      //alerta por largo de password
      //let mi = this.presentToast('Nombre de usuario requerido', 'bottom', 4000);
      let mi = this.presentToast('Mínimo 5 caracteres', 'bottom', 4000);
      return false;
    }
    return true;
  }
  isValidForm(){
    if (
      this.InstId == 0 || this.InstId == null
    ){
      let mi = this.presentToast('Seleccione Institución', 'top', 5000);
      return false;
    }
    if (
      this.RegId == 0 || this.RegId == null
    ){
      let mi = this.presentToast('Seleccione Región', 'top', 5000);
      return false;
    }
    if (
      this.NombreUsuario == '' || this.NombreUsuario == null
    ){
      let mi = this.presentToast('Nombre usuario requerido', 'top', 5000);
      return false;
    }
    if (
      this.Nombres == '' || this.Nombres == null
    ){
      let mi = this.presentToast('Nombres requerido', 'top', 5000);
      return false;
    }
    if (
      this.ApellidoPaterno == '' || this.ApellidoPaterno == null
    ){
      let mi = this.presentToast('Primer apellido requerido', 'top', 5000);
      return false;
    }
    if (
      this.CorreoElectronico == '' || this.CorreoElectronico == null
    ){
      let mi = this.presentToast('Correo requerido', 'top', 5000);
      return false;
    }
    if (
      this.RolIdUsuario == 0 || this.RolIdUsuario == null
    ){
      let mi = this.presentToast('Seleccione Rol', 'top', 5000);
      return false;
    }

    return true;
  }
}
