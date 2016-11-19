import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { Core } from '../../providers/core';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private auth: Auth,
    private user: User,
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

  onClickRegister() {
    this.navCtrl.push( RegisterPage );
  }

}