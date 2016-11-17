import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { JobIndexPage } from '../job/index/job-index';
import { ForumPage } from '../forum/forum';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
    
  }
  onClickJob() {
    this.navCtrl.push( JobIndexPage );
  }
  onClickForum() {
    this.navCtrl.push( ForumPage );
  }
}
