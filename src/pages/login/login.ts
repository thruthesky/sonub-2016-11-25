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
    private philgoMember: Member,
    private xbase: Xbase

    ) {


      console.log("LoginPage::constructor()");

    }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  onClickLogin() {
    console.log("LoginPage::onClickLogin() form: ", this.form);
    this.process = { 'loader' : true };

      this.philgoMember.login( this.form, ( login: USER_LOGIN_DATA ) => {
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
      this.process = { 'error' : 'Xbase Login Error : ' + e };
    });

  }

  onClickCustomLogin() {

      this.auth.login('custom', { remember: true })
        .then( re => {
          console.log(re);
        })
        .catch( e => {
          console.log(e);
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
        console.log('user details: ');
        console.log(this.user.details );

        let details: any = this.user.details;
        let twitter_id: string = details.twitter_id;
        let id = twitter_id + '@twitter.com';
        this.loginOrRegisterBackend( id );

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

  /**
   * 
   * @param id - must be in email-format like '1234@tiwtter.com'
   * @note To know if the user already registered or not, check password on ionic cloud auth user data.
   * 
   * 1. login and return.
   * 2. if login fails, register.
   *    2.1 create password and save.
   */
  loginOrRegisterBackend( id ) {
    // get user password.
    let password = this.user.get('password', '');
    if ( password ) this.loginBackend( id, password );
    else this.registerBackend( id );
  }
  loginBackend( id, password ) {
    console.log("LoginPage::loginBackend()");
      this.philgoMember.login( this.form, ( login: USER_LOGIN_DATA ) => {
        this.xbaseLogin( () => {
          console.log('PhilGo & Xbase Login success !');
          this.navCtrl.setRoot( HomePage );
        });
      },
      e => {
        console.log("error login: ", e);
      });
  }
  registerBackend( id ) {
        this.user.set('password', this.core.getRandomString( id ) );
        this.registerPhilgo( id, re => this.registerXbase(id, session_id =>{
          console.log('register success: session_id: ', session_id);
        }) );
  }


  /**
   * Register philgo.com
   */
  registerPhilgo( id, callback ) {
    let password = this.user.get('password', '');
    let data = {
      id: id,
      nickname: id,
      password: password,
      name: id,
      email: id,
      mobile: '01234567890',
      gender: 'M'
    };
    console.log('registerPhilgo() data: ', data);
    this.philgoMember.register( data , () => {
      console.log('registerPhilgo() : success');
      callback();
    }, e => console.log('registerPhilgo() failed: ', e) );
  }
  /**
   * 
   */
  registerXbase( id, callback ) {
    let password = this.user.get('password', '');
    let registerData = {
      id: id,
      password: password,
      email: id
    };
    console.log("registerXbase: registerData: ", registerData);
    this.xbase.user_register( registerData, session_id => {
      console.log('xbase register ok: session_id: ' + session_id);
    }, e => {
      console.error('xbase register failed: ' + e);
    });

  }



  onClickRegister() {
    this.navCtrl.push( RegisterPage );
  }
}
