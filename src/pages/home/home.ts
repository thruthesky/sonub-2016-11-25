import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { JobIndexPage } from '../job/index/job-index';
import { ForumPage } from '../forum/forum';

import { Xbase } from '../../xbase-api/xbase';
// import { XbaseTest } from '../../xbase-api/xbase-test';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private xbase: Xbase ) {


    // new XbaseTest(xbase).run();
    //navCtrl.push( LoginPage );

    
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
}
