import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConfigService } from '../../app/services/ConfigService';

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
  providers: [ ConfigService]
})
export class DetailRendicionPage {

  public accion="";
  public NombreCompleto="";

  constructor(
    private config: ConfigService,
    private nav: NavController,
    private alert: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
  ) {

    let loader = this.loading.create({
      content: 'Cargando...',
    });

    loader.present().then(() => {
      //aca las llamadas ajax


      loader.dismiss();
    });
  }



}
