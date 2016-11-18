import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Member,
         USER_DATA,
         USER_LOGIN_DATA } from '../../philgo-api/v2/member';
import * as it from '../../providers/interface';
import { Core } from '../../providers/core';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  login: USER_LOGIN_DATA = <USER_LOGIN_DATA> {};
  form = <USER_DATA> {};
  process: it.FORM_PROCESS = it.formProcess;
  urlPhoto = 'assets/img/anonymous.gif';

  constructor(
    private navCtrl: NavController,
    private member: Member,
    private core: Core
  ) {

    this.checkLogin();

    // test registration on xbase
      this.registerXbase( () => {

        alert("Registration Success!");
      },
      e => {
        alert("Error: " + e);
      });
  }

  checkLogin() {
    this.member.logged( x => {
      this.login = x;
      this.loadUserProfile();
    }, () => this.login = null );
  }

  loadUserProfile() {
    this.member.data( re => {
      console.log('loginUserProfile(): re', re);
      this.form.name = re.user_name;
      this.form.email = re.user_email;
      this.form.mobile = re.user_mobile;
      this.form.gender = re.user_gender;
      this.form.birthday = re.birth_year + '-' + re.birth_month + '-' + re.birth_day;
    },
    e => {
      alert("error: " + e);
    });
  }
  onClickRegister() {
    console.log('onClickRegister():', this.form);
    this.process  = { 'loader': true };
    this.member.register( this.form, () => {
      console.log('onClickRegister::sucess: ');
      this.navCtrl.setRoot( HomePage );
      // @todo register in xbase.
      this.registerXbase( () => {

        alert("Registration Success!");
      },
      e => {
        alert("Error: " + e);
      });
    },
    e => {
      if ( e == 'json-parse-error' ) {
        this.process['error'] = 'Server Error. Please notify this to admin';
      }
      else this.process = { 'error': e };
    })
  }
  registerXbase( successCallback, failureCallback ) {

  }



    /**
     * Update
     */
    onClickUpdate() {
      console.log('onClickUpdate()', this.form);
      this.process = { loader: true };
      this.form.id = this.login.id;
      this.form.session_id = this.login.session_id;
      this.member.register( this.form, () => {
        this.process = {};
        alert("Profile update success !");
      },
      e => {
        if ( e == 'json-parse-error' ) this.process = { 'error' : 'Server Error. Please notifiy this to admin' };
        else this.process =  { error: e };
      });
    }


    onClickCancel(){
        this.navCtrl.setRoot(HomePage);
    }


    onClickPhoto(){

    }
 
    onClickDeletePhoto(){

    }

    onChangeFile($event){

    }



  ionViewDidLoad() {
    console.log('RegisterPage::ionViewDidLoad()');
  }

}
