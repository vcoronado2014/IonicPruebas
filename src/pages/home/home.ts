import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';
import { AuthService } from '../../app/services/AuthService';
import { UsuarioService } from '../../app/services/UsuarioService';
import { MovimientoService } from '../../app/services/MovimientoService';
import { DocumentoService } from '../../app/services/DocumentoService';
import { InstitucionService } from '../../app/services/InstitucionService';
import { DetailsPage } from '../../pages/details/details';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService, AuthService, UsuarioService, MovimientoService, DocumentoService, InstitucionService]
})
export class HomePage {
  public foundRepos;
  public username;
  public nombreUsuario: string;
  public userData;
  public movimientoData;
  public countUsuarios: string;
  public countIngresos = 0;
  public countEgresos = 0;
  public documentoData;
  public countDocumentos: string;
  public institucionData;
  public countInstituciones: string;

  constructor(
    private github: GitHubService,
    private auth: AuthService,
    private usu: UsuarioService,
    private mov: MovimientoService,
    private doc: DocumentoService,
    private inst: InstitucionService,
    public navCtrl: NavController
  ){
      this.nombreUsuario = sessionStorage.getItem('PERSONA_NOMBRE');
      //get users dependiendo del rol
      this.usu.getUsers().subscribe(
        data => {
          this.userData = data.json().proposals;
          this.countUsuarios = this.userData.length;
        },
        err => console.error(err),
        () => console.log('get users completed')
      );
      //obtencion de los movimientos
      this.mov.getMovimientos().subscribe(
        dataMov => {
          this.movimientoData = dataMov.json().proposals;
          //aca procesamos despues los movimientos para obtener los ingresos y egresos
          if (this.movimientoData != null && this.movimientoData.length > 0){
            for (var s in this.movimientoData){
              if (this.movimientoData[s].OtroUno == "Ingreso"){
                let valor = parseInt(this.movimientoData[s].OtroTres);
                this.countIngresos = this.countIngresos + valor;
              } else {
                let valor = parseInt(this.movimientoData[s].OtroTres);
                this.countEgresos = this.countEgresos + valor;
              }
            }
          }
        },
        err => console.error(err),
        () => console.log('get movimientos completed')
      );
      //obtencion de los documentos
      this.doc.getDocumentos().subscribe(
        dataDoc => {
          this.documentoData = dataDoc.json().proposals;
          this.countDocumentos = this.documentoData.length;
        },
        err => console.error(err),
        () => console.log('get documentos completed')
      );
      //obtencion de las instituciones
      this.inst.getInstituciones().subscribe(
        dataInst => {
          this.institucionData = dataInst.json().proposals;
          this.countInstituciones = this.institucionData.length;
        },
        err => console.error(err),
        () => console.log('get instituciones completed')
      );

  }
  getRepos() {
    this.github.getRepos(this.username).subscribe(
      data => {
        this.foundRepos = data.json();
      },
      err => console.error(err),
      () => console.log('getRepos completed')
    );
  }

  goToDetails(repo){
    this.navCtrl.push(DetailsPage, {repo: repo });
  }

  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  //llamadas a la api de usuarios
  getUsers(){
    this.usu.getUsers().subscribe(
      data => {
        this.userData = data.json().proposals;
      },
      err => console.error(err),
      () => console.log('get users completed')
    );
  }

  FormatMiles(input)  {
    let retorno;
    let num = input.toString().replace(/\./g,'');
    if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      retorno = num;
    }

    else{
      retorno = input.toString().replace(/[^\d\.]*/g,'');
    }
    return retorno;
  }

}
