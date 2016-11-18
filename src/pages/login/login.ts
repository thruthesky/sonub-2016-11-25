import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Auth as facebookAuth, User as facebookUser } from '@ionic/cloud-angular';
import { Core } from '../../providers/core';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private auth: facebookAuth,
    private user: facebookUser,
    public core: Core
    ) {



    }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }


  onClickFacebookLogin() {

    this.auth.login('facebook', { remember: true })
      .then( re => {
        console.log(re);
      })
      .catch( e => {
        console.log(e);
      });

  }

}
