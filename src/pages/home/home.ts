import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { JobIndexPage } from '../job/index/job-index';
import { ForumPage } from '../forum/forum';
import { RegisterPage } from '../register/register';

import { Xbase } from '../../xbase-api/xbase';

import { Member,
         USER_DATA,
         USER_LOGIN_DATA } from '../../philgo-api/v2/member';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login: USER_LOGIN_DATA = <USER_LOGIN_DATA> {};
  constructor(
    private navCtrl: NavController,
    private member: Member,
    private xbase: Xbase ) {
    console.log('HomePage::constructor()');

    // No more page move here.
    // Use DeepLinker


  }
  ionViewWillEnter() {
    console.log('HomePage::ionViewWillEnter()')
    this.checkLogin();
  }
  checkLogin() {
    this.member.logged( x => {
      this.login = x;
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
    this.navCtrl.push( JobIndexPage );
  }
  onClickForum() {
    this.navCtrl.push( ForumPage );
  }
  onClickLogin() {
    this.navCtrl.push( LoginPage );
  }
  onClickRegister() {
    this.navCtrl.push( RegisterPage );
  }
}
