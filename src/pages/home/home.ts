import { Component } from '@angular/core';

import { Platform, NavController } from 'ionic-angular';
import { Language } from '../../pipes/language';
import { Core } from '../../providers/core';
import { LoginPage } from '../login/login';
import { JobHomePage } from '../job/pages/home/job-home';
import { ForumIndexPage } from '../forum/pages/index/forum-index';
import { PostListPage } from '../forum/pages/post-list/post-list';
import { RegisterPage } from '../register/register';

import { Xbase } from '../../xbase-api/xbase';

import { Member,
//         USER_DATA,
         USER_LOGIN_DATA } from '../../philgo-api/v2/member';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login: USER_LOGIN_DATA = null;
  output: any = <any> {};
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private core: Core,
    private member: Member,
    private xbase: Xbase,
    private language: Language
    ) {
    console.log('HomePage::constructor()');

    // No more page move here.
    // Use DeepLinker
    this.platform.ready().then( () => {
      console.log('platform ready():');
      if ( this.platform.is('cordova') ) console.log("Cordova");
      else console.log("NOT Cordova");
    });


//    this.output['language'] = this.language.transform("Hello, World!", null);
    this.output['password'] = core.getRandomString('n');

  }
  ionViewWillEnter() {
    console.log('HomePage::ionViewWillEnter()')
    this.checkLogin();
  }
  checkLogin() {
    this.member.logged( x => {
      console.log("checkLogin::philgo login ok: login info : ", x);
      this.login = x;
      // this.xbase.logged( x => {
      //   console.log("checkLogin::xbase login ok: session_id: " + x);
      // }, () => {
      //   console.log("checkLogin::xbase NOT login");
      // });
    },
    () => this.login = null );
  }
  onClickLogout() {
    this.member.logout( () => this.checkLogin() );
  }
  onClickProfileUpdate() {
    this.onClickRegister();
  }
  onClickJob() {
    this.navCtrl.push( JobHomePage );
  }
  onClickForum() {
    this.navCtrl.push( ForumIndexPage );
  }
  onClickLogin() {
    this.navCtrl.push( LoginPage );
  }
  onClickRegister() {
    this.navCtrl.push( RegisterPage );
  }
}
