import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GitHubService } from '../../app/services/github';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService]
})
export class DetailsPage {
  public readme = "";
  public repo;

  constructor(
    private github: GitHubService,
    private nav: NavController,
    private navParams: NavParams
    ) {
      this.repo = navParams.get('repo');

      this.github.getDetails(this.repo).subscribe(
        data=>this.readme=data.text(),
        err=>{
          if(err.status == 404){
            this.readme = 'Este repo no tiene readme';
          } else {
            console.error(err);
          }
        },
        () => console.log('get details complete')
      )

  }
  /*
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
    this.nav.push(DetailsPage, {repo: repo });
  }
*/

}
