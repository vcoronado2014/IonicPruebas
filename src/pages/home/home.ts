import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';
import { AuthService } from '../../app/services/AuthService';
import { UsuarioService } from '../../app/services/UsuarioService';
import { MovimientoService } from '../../app/services/MovimientoService';
import { DocumentoService } from '../../app/services/DocumentoService';
import { InstitucionService } from '../../app/services/InstitucionService';
import { ProyectoService } from '../../app/services/ProyectoService';
import { TricelService } from '../../app/services/TricelService';
import { CalendarioService } from '../../app/services/CalendarioService';
import { DetailsPage } from '../../pages/details/details';
import { LoginPage } from '../../pages/login/login';
import { ConfigService } from '../../app/services/ConfigService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService, AuthService, UsuarioService, MovimientoService, DocumentoService, InstitucionService, ProyectoService, TricelService, CalendarioService, ConfigService]
})
export class HomePage {
  public foundRepos;
  public username;
  public nombreUsuario: string;
  public userData;
  public movimientoData;
  public proyectoData = [];
  public proyectoDataProcesar;
  public tricelData = [];
  public tricelDataProcesar;
  public countUsuarios: string;
  public countIngresos = 0;
  public countEgresos = 0;
  public documentoData;
  public countDocumentos: string;
  public institucionData;
  public countInstituciones: string;
  public calendarioData = [];
  public calendarioDataProcesar;

  eventSource;
  viewTitle;
  isToday:boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    noEventsLabel: 'No hay',
    allDayLabel: 'Todo el día'
  };

  constructor(
    private github: GitHubService,
    private auth: AuthService,
    private config: ConfigService,
    private usu: UsuarioService,
    private mov: MovimientoService,
    private doc: DocumentoService,
    private inst: InstitucionService,
    private proy: ProyectoService,
    private tri: TricelService,
    private cal: CalendarioService,
    public navCtrl: NavController,
    public loading: LoadingController
  ){
      this.nombreUsuario = sessionStorage.getItem('PERSONA_NOMBRE');
      this.calendar.noEventsLabel = 'No hay';

      //iniciamos loading
      let loader = this.loading.create({
        content: 'Cargando...',
      });
      loader.present().then(() => {
        //get users dependiendo del rol
        let url = this.config.getUrl('ListarUsuarios');
        this.usu.getUsers(url).subscribe(
          data => {
            this.userData = data.json().proposals;
            this.countUsuarios = this.userData.length;
          },
          err => console.error(err),
          () => console.log('get users completed')
        );
        //obtencion de los movimientos
        let url1 = this.config.getUrl('Rendicion');
        this.mov.getMovimientos(url1).subscribe(
          dataMov => {
            this.movimientoData = dataMov.json().proposals;
            //aca procesamos despues los movimientos para obtener los ingresos y egresos
            if (this.movimientoData != null && this.movimientoData.length > 0) {
              for (var s in this.movimientoData) {
                if (this.movimientoData[s].OtroUno == "Ingreso") {
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
        let url2 = this.config.getUrl('FileDocumento');
        this.doc.getDocumentos(url2).subscribe(
          dataDoc => {
            this.documentoData = dataDoc.json().proposals;
            this.countDocumentos = this.documentoData.length;
          },
          err => console.error(err),
          () => console.log('get documentos completed')
        );
        //obtencion de las instituciones
        let url3 = this.config.getUrl('Insttucion');
        this.inst.getInstituciones(url3).subscribe(
          dataInst => {
            this.institucionData = dataInst.json().proposals;
            this.countInstituciones = this.institucionData.length;
          },
          err => console.error(err),
          () => console.log('get instituciones completed')
        );
        //obtencion de los proyectos
        let url4 = this.config.getUrl('Proyecto');
        this.proy.getProyectos(url4).subscribe(
          dataProy => {
            this.proyectoDataProcesar = dataProy.json().proposals;
            //aca procesamos despues los movimientos para obtener los ingresos y egresos
            let fechaActual = new Date();
            let fechaActualInt = this.FechaEnteraDate(fechaActual);
            if (this.proyectoDataProcesar != null && this.proyectoDataProcesar.length > 0) {
              for (var s in this.proyectoDataProcesar) {
                let fechaEnteraTermino = this.FechaEnteraStr(this.proyectoDataProcesar[s].OtroDos);
                //aca hay que procesar solo aquellos que tienen fecha de termino despues de la actual
                //y que
                if (fechaEnteraTermino >= fechaActualInt && this.proyectoDataProcesar[s].OtroSiete == "1")
                {
                  this.proyectoDataProcesar[s].Rol = "P";
                  //este elemento hay que agregarlo
                  this.proyectoData.push(this.proyectoDataProcesar[s]);
                }

              }
            }
          },
          err => console.error(err),
          () => console.log('get proyectos completed')
        );
        //obtencion de los tricel
        let url5 = this.config.getUrl('Votacion');
        this.tri.getTricel(url5).subscribe(
          dataTri => {
            this.tricelDataProcesar = dataTri.json().proposals;
            //aca procesamos despues los movimientos para obtener los ingresos y egresos
            let fechaActual = new Date();
            let fechaActualInt = this.FechaEnteraDate(fechaActual);
            if (this.tricelDataProcesar != null && this.tricelDataProcesar.length > 0) {
              for (var s in this.tricelDataProcesar) {
                let fechaEnteraTermino = this.FechaEnteraStr(this.tricelDataProcesar[s].OtroDos);
                //aca hay que procesar solo aquellos que tienen fecha de termino despues de la actual
                //y que
                if (fechaEnteraTermino >= fechaActualInt && this.tricelDataProcesar[s].OtroSiete == "1")
                {
                  this.tricelDataProcesar[s].Rol = "T";
                  this.tricelDataProcesar[s].OtroSeis = this.tricelDataProcesar[s].NombreCompleto;
                  //este elemento hay que agregarlo
                  this.proyectoData.push(this.tricelDataProcesar[s]);
                }

              }
            }
          },
          err => console.error(err),
          () => console.log('get tricel completed')
        );

        //obtencion de los eventos
        let url6 = this.config.getUrl('Calendario');
        this.cal.getCalendar(url6).subscribe(
          dataCal => {
            this.calendarioDataProcesar = dataCal.json();
            this.eventSource = this.createEventsCalendario();
          },
          err => console.error(err),
          () => console.log('get eventos completed')
        );
        //cargar los eventos del calendario
        //this.eventSource = this.createRandomEvents();


        loader.dismiss();
      });

  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }
  onViewTitleChanged(title) {
    this.viewTitle = this.EntregaMes(title);
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  createEventsCalendario(){
    if (this.calendarioDataProcesar != null && this.calendarioDataProcesar.length > 0) {
      for (var s in this.calendarioDataProcesar) {
        var startDay = this.EntregaFecha(
          this.calendarioDataProcesar[s].annoIni,
          this.calendarioDataProcesar[s].mesIni,
          this.calendarioDataProcesar[s].diaIni,
          this.calendarioDataProcesar[s].horaIni,
          this.calendarioDataProcesar[s].minutosIni
        );
        var endDay = this.EntregaFecha(
          this.calendarioDataProcesar[s].annoTer,
          this.calendarioDataProcesar[s].mesTer,
          this.calendarioDataProcesar[s].diaTer,
          this.calendarioDataProcesar[s].horaTer,
          this.calendarioDataProcesar[s].minutosTer
        );
        var eventType = 1;//0 es todo el día
        var allDay = false;
        var title = this.calendarioDataProcesar[s].content;

        this.calendarioData.push({
          title: title,
          startTime: startDay,
          endTime: endDay,
          allDay: false
        });

      }
    }
    return this.calendarioData;
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };


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
    var url = this.config.getUrl('ListarUsuarios');
    this.usu.getUsers(url).subscribe(
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

  FechaEnteraStr = function(fechaStr)  {
    var parteUno = fechaStr.split('-');
    var parteDos = parteUno[2].split(' ');

    return parseInt(parteDos[0] + parteUno[1] + parteUno[0]);

  }
  EntregaFecha = function (anno, mes, dia, hora, minuto){
    var diaInt = parseInt(dia);
    var mesInt = parseInt(mes) + 1;
    var annoInt = parseInt(anno);
    var minutoInt = parseInt(minuto);
    var horaInt = parseInt(hora);

    return new Date(annoInt, mesInt, diaInt, horaInt, minutoInt, 0, 0);
  }
  FechaEnteraDate = function (fechaDate){
    var dia = "";
    var mes = "";
    var anno = "";

    var diaInt = fechaDate.getDay();
    var mesInt = fechaDate.getMonth();
    var annoInt = fechaDate.getFullYear();

    if (diaInt < 10)
      dia = "0" + diaInt.toString();
    else
      dia = diaInt.toString();
    if (mesInt < 10)
      mes = "0" + mesInt.toString();
    else
      mes = mesInt.toString();

    anno = annoInt.toString();

    return parseInt(anno + mes + dia);
  }
  EntregaMes = function (mes){
    var retorno = "";
    if (mes.includes("January")){
      retorno = mes.replace("January ", "Enero ");
    }
    if (mes.includes("February")){
      retorno = mes.replace("February ", "Febrero ");
    }
    if (mes.includes("March")){
      retorno = mes.replace("March ", "Marzo ");
    }
    if (mes.includes("April")){
      retorno = mes.replace("April ", "Abril ");
    }
    if (mes.includes("May")){
      retorno = mes.replace("May ", "Mayo ");
    }
    if (mes.includes("June")){
      retorno = mes.replace("June ", "Junio ");
    }
    if (mes.includes("July")){
      retorno = mes.replace("Jult ", "Julio ");
    }
    if (mes.includes("August")){
      retorno = mes.replace("August ", "Agosto ");
    }
    if (mes.includes("September")){
      retorno = mes.replace("September ", "Septiembre ");
    }
    if (mes.includes("October")){
      retorno = mes.replace("October ", "Octubre ");
    }
    if (mes.includes("November")){
      retorno = mes.replace("November ", "Noviembre ");
    }
    if (mes.includes("December")){
      retorno = mes.replace("December ", "Diciembre ");
    }

    return retorno;
  }

}
