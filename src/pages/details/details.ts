import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';
import { UsuarioService } from '../../app/services/UsuarioService';
import { RegionesService } from '../../app/services/RegionesService';
import { ComunasService } from '../../app/services/ComunasService';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService, UsuarioService, RegionesService, ComunasService]
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


  constructor(
    private github: GitHubService,
    private usu: UsuarioService,
    private reg: RegionesService,
    private com: ComunasService,
    private nav: NavController,
    public loading: LoadingController,
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

      loader.dismiss();

    });
  }

  recuperarUsuario(id){
    if (id > 0) {
      this.usu.getUserById(id).subscribe(
        data => {
          this.usuarioDevolver = data.json();
          //this.countUsuarios = this.userData.length;
          this.Persona = this.usuarioDevolver.Persona;
          this.AutentificacionUsuario = this.usuarioDevolver.AutentificacionUsuario;
          this.Comuna = this.usuarioDevolver.Comuna;
          this.Institucion = this.usuarioDevolver.Institucion;
          this.Region = this.usuarioDevolver.Region;
          this.RolUsuario = this.usuarioDevolver.Rol;
          this.title = this.Persona.Nombres;
          this.idUsuarioRecuperado = this.AutentificacionUsuario.Id;
          this.NombreUsuario = this.AutentificacionUsuario.NombreUsuario;
          //variables del formulario
          this.esNuevo = true;
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
          this.listarComunas(this.RegId);

        },
        err => console.error(err),
        () => console.log('get user ' + this.Persona.Id)
      );
    }
    else {
      this.esNuevo = false;
      this.idUsuarioRecuperado = 0;
      this.RegId = 15;
      this.ComId = 0,
      //listamos las comunas de la metropolitana
      this.listarComunas(this.RegId);

    }
  }
  listarRegiones(){
    this.reg.getRegiones().subscribe(
      data => {
        this.dataRegiones = data.json();
      },
      err => console.error(err),
      () => console.log('get regiones')
    );
  }
  listarComunas(regId){
    this.com.getComunas(regId).subscribe(
      data => {
        this.dataComunas = data.json();
      },
      err => console.error(err),
      () => console.log('get comunas ' + regId)
    );
  }

}
