import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
@Component({
    templateUrl: 'post-list.html'
})
export class PostListPage {

    constructor(
        private navParams: NavParams
    ) {
        console.log("PostListPage::constructor() : navParams: ", this.navParams.data) ;
    }

}