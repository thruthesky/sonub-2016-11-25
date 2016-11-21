import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Member,
         USER_DATA,
         USER_LOGIN_DATA } from '../../philgo-api/v2/member';
import * as it from '../../providers/interface';
import { Xbase } from '../../xbase-api/xbase';
import { Core } from '../../providers/core';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  login: USER_LOGIN_DATA = <USER_LOGIN_DATA> {};
  form: USER_DATA = <USER_DATA> {};
  process: it.FORM_PROCESS = it.formProcess;
  urlPhoto = 'assets/img/anonymous.gif';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public core: Core,
    private member: Member,
    private xbase: Xbase
  ) {

    console.log("RegisterPage::constructor() : navParams: ", this.navParams.data) ;

    this.checkLogin();

    console.log('this.form: ', this.form);
  }

  ionViewDidLoad() {
    console.log('RegisterPage::ionViewDidLoad()');
  }
  ionViewWillEnter() {
    // this.form = userData;
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
      this.form.birthday = re.user_birth_year + '-' + re.user_birth_month + '-' + re.user_birth_day;
    },
    e => {
      alert("error: " + e);
    });
  }


  onClickRegisterXbase(){
     this.registerXbase( () => {
        alert("Registration Success!");
      },
      e => {
        alert("Error: " + e);
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




  /**
   * Register into xbase
   * @Attention this method is invoked right after philgo register, once philgo register success, then there should be no error registering in xbase.
   * @see README.md
   */
  registerXbase( successCallback, failureCallback ) {
    let registerData = {
      id: this.form.id,
      password: '~philgo.com@' + this.form.id,
      email: this.form.id + '@philgo.com'
    };
    console.log("registerXbase: registerData: ", registerData);
    this.xbase.user_register( registerData, session_id => {
      console.log('xbase register ok: session_id: ' + session_id);
    }, e => {
      console.error('xbase register failed: ' + e);
    });

  }
}
