import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Member,
         USER_DATA,
         USER_LOGIN_DATA } from '../../philgo-api/v2/member';
import * as it from '../../providers/interface';
import { Xbase } from '../../xbase-api/xbase';
import { Core } from '../../providers/core';
import { FirebaseStorage } from '../../firebase-api/firebase-storage';

import { HomePage } from '../home/home';
import * as _ from 'lodash';

export const urlPrimaryPhoto = 'assets/img/anonymous.gif';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  login: USER_LOGIN_DATA = <USER_LOGIN_DATA> {};
  form: USER_DATA = <USER_DATA> {};
  process: it.FORM_PROCESS = it.formProcess;
  urlPhoto: string = urlPrimaryPhoto;

  file_upload_begin: boolean = false;
  file_delete_begin: boolean = false;
  file_upload_position: number = 0;

  constructor(
    private ngZone: NgZone,
    private navCtrl: NavController,
    private navParams: NavParams,
    public core: Core,
    private member: Member,
    private firebaseStorage: FirebaseStorage,
    private xbase: Xbase
  ) {

    console.log("RegisterPage::constructor() : navParams: ", this.navParams.data) ;

    this.checkLogin();

    console.log('this.form: ', this.form);
  }
  /**
   * @attention page re-rendering
   */
  renderPage() {
      this.ngZone.run(() => {
          console.log('ngZone.run()');
      });
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

      this.form.birthday = this.birthday( re.user_birth_year, re.user_birth_month, re.user_birth_day );
      if ( re.user_text_1 === void 0 || re.user_text_1 == 'null' || ! re.user_text_1 ) this.form.text_1 = null;
      else {
        this.form.text_1 = re.user_text_1;
        try {
          let data = JSON.parse( this.form.text_1 );
          this.urlPhoto = data.url;
        }
        catch( e ) {
          console.error('JSON parse failed on load user profile. paring primary photo');
          console.info('text_1:', this.form.text_1);
        }
      }
      console.log('this.form: ', this.form);
    },
    e => {
      alert("error: " + e);
    });
  }

  birthday( year, month, day ) : string {
    let bd = year + '-' + _.padStart(month, 2, '0') + '-' + _.padStart(day, 2, '0');
    return <string> bd;
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
 
    onClickDeletePhoto( ) {
      let data = this.form.text_1;
      if ( ! data ) return;
      let file;
      try {
        file = JSON.parse( data );
      }
      catch( e ) {
        alert("JSON parse failed:");
        return;
      }
      this.file_delete_begin = true;
      
      this.firebaseStorage.delete( file.ref, () => {
        this.file_delete_begin = false;
        this.urlPhoto = urlPrimaryPhoto;
        this.form.text_1 = null;
        this.renderPage();
      
      }, e => {
        this.file_delete_begin = false;
        alert("FILE DELETE ERROR: " + e);
        this.renderPage();
      } );
    }


    onFileUploaded( url, ref ) {
        console.log("onFileUploaded() : this : ", this);
        this.file_upload_begin = false;
        this.urlPhoto = url;
        console.log('this.urlPhoto: ', this.urlPhoto);
        let file_data = {
            url: url,
            ref: ref
        };
        this.form.text_1 = JSON.stringify( file_data );
        console.log('text_1', this.form.text_1 );
        this.renderPage();
    }
    getReferenceOfPrimaryPhoto( name ) {
        return 'primary-photo/' + Date.now() + '/' + name;
    }
    onChangeFile(event) {
        let file = event.target.files[0];
        if ( file === void 0 ) return;
        console.log('onChangeFile(): file: ', file);
        this.file_upload_begin = true;
        //this.position = 50;
        //this.urlPhoto = file.name;
        let ref = this.getReferenceOfPrimaryPhoto( file.name );
        this.firebaseStorage.upload( { file: file, ref: ref }, uploaded => {
            this.onFileUploaded( uploaded.url, uploaded.ref );
        },
        e => {
            this.file_upload_begin = false;
            alert(e);
        },
        percent => {
            this.file_upload_position = percent;
            console.log('percent: ' + this.file_upload_position);
            this.renderPage();
        });
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
