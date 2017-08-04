import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';
import { UsuarioService } from '../../app/services/UsuarioService';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService, UsuarioService]
})
export class DetailsPage {
  public readme = "";
  public usuario;
  public usuarioDevolver;
  public Persona;
  public AutentificacionUsuario;
  public Comuna;
  public Institucion;
  public title = "";
  //variables del Formulario
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


  constructor(
    private github: GitHubService,
    private usu: UsuarioService,
    private nav: NavController,
    public loading: LoadingController,
    private navParams: NavParams
    ) {
      this.usuario = navParams.get('usuario');

      let loader = this.loading.create({
        content: 'Cargando...',
      });
    loader.present().then(() => {
      this.usu.getUserById(this.usuario.Id).subscribe(
        data => {
          this.usuarioDevolver = data.json();
          //this.countUsuarios = this.userData.length;
          this.Persona = this.usuarioDevolver.Persona;
          this.AutentificacionUsuario = this.usuarioDevolver.AutentificacionUsuario;
          this.Comuna = this.usuarioDevolver.Comuna;
          this.Institucion = this.usuarioDevolver.Institucion;
          this.title = this.Persona.Nombres;
          //variables del formulario
          if (id > 0)
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

        },
        err => console.error(err),
        () => console.log('get user ' + this.Persona.Id)
      );

      loader.dismiss();

    });
  }


}
