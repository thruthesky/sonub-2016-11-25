import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
@Component({
    templateUrl: 'forum.html'
})
export class ForumPage {

    constructor(
        private navParams: NavParams
    ) {
        console.log("RegisterPage::constructor() : navParams: ", this.navParams.data) ;
    }

}