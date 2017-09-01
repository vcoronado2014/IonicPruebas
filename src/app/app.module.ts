import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { LoginPage } from '../pages/login/login';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { RendicionesPage } from '../pages/rendiciones/rendiciones';

import { AuthService } from '../app/services/AuthService';
import { NgCalendarModule } from 'ionic2-calendar';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

import {DetailRendicionPage} from "../pages/detail-rendicion/detail-rendicion";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    LoginPage,
    UsuariosPage,
    RendicionesPage,
    DetailRendicionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    ChartModule.forRoot(highcharts),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    LoginPage,
    UsuariosPage,
    RendicionesPage,
    DetailRendicionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
