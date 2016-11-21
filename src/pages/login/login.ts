import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Auth , User  } from '@ionic/cloud-angular';
import { Core } from '../../providers/core';
import { RegisterPage } from '../register/register';
import { Member, USER_LOGIN_DATA } from '../../philgo-api/v2/member';
import { Xbase } from '../../xbase-api/xbase';
import * as it from '../../providers/interface';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: USER_LOGIN_DATA = <USER_LOGIN_DATA> {};
  process: it.FORM_PROCESS = <it.FORM_PROCESS> {};

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private auth: Auth,
    private user: User,
    public core: Core,
    private member: Member,
    private xbase: Xbase

    ) {



    }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  onClickLogin() {
    console.log("LoginPage::onClickLogin() form: ", this.form);
    this.process = { 'loader' : true };
      this.member.login( this.form, ( login: USER_LOGIN_DATA ) => {
        this.xbaseLogin( () => {
          alert('Login success !');
          this.navCtrl.setRoot( HomePage );
        });
      },
      e => {
        this.process = { 'error' : e };
      });
  }
  
  xbaseLogin( successCallback ) {
    let data = {id: this.form.id, password: '~philgo.com@' + this.form.id};
    this.xbase.user_login( data, session_id => {
      console.log("xbaseLogin() : success : session_id: " + session_id )
      successCallback();
    }, e => {
      console.error('error login xbase: ' + e);
    });
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
  onClickGooglePlusLogin() {

    this.auth.login('google', { remember: true })
      .then( re => {
        console.log(re);
      })
      .catch( e => {
        console.log(e);
      });

  }

  onClickTwitterLogin() {

    this.auth.login('twitter', { remember: true })
      .then( re => {
        console.log(re);
        console.log("user: ", this.user.details );
      })
      .catch( e => {
        console.log(e);
      });

  }

  onClickInstagramLogin() {

    this.auth.login('instagram', { remember: true })
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
