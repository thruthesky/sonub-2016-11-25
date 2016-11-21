import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";



@Component({
    templateUrl: 'job-index.html'
})
export class JobIndexPage {
    constructor(public navCtrl: NavController ) {

        navCtrl.push( JobPostPage );
    }

    onClickJobPost() {
        this.navCtrl.push( JobPostPage );
    }
}