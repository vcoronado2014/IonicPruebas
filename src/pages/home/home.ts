import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';
import { AuthService } from '../../app/services/AuthService';
import { DetailsPage } from '../../pages/details/details';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService, AuthService]
})
export class HomePage {
  public foundRepos;
  public username;
  public nombreUsuario: string;

  constructor(
    private github: GitHubService,
    private auth: AuthService,
    public navCtrl: NavController
  ){
      this.nombreUsuario = sessionStorage.getItem('PERSONA_NOMBRE');
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

}
