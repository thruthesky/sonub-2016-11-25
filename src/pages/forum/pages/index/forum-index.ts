import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostListPage } from '../post-list/post-list';

type FORUMS = Array< { name: Array<string>} >;
@Component({
    templateUrl: 'forum-index.html'
})
export class ForumIndexPage {
    forum_names = [ 'community', 'buyandsell', 'life', 'travel', 'love', 'news', 'info' ];
    forums: FORUMS = <FORUMS> {};
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        console.log("ForumIndexPage::constructor() : navParams: ", this.navParams.data) ;

        this.forums['community'] = ['greeting', 'knowhow', 'wanted', 'case', 'lookfor', 'phil_life_tip', 'freetalk', 'caution', 'qna', 'party'];
        this.forums['buyandsell'] = ['personal', 'buyandsell', 'biz_partner', 'massage', 'real_estate', 'phone', 'food_delivery', 'rent', 'cars', 'boarding_house'];
        this.forums['life'] = ['tagalog', 'document', 'im', 'visa'];
        this.forums['travel'] = ['golf', 'rentcar', 'hotel', 'rest', 'woman_place', 'travel_free', 'nature', 'travel_photo', 'travel_story'];
        this.forums['love'] = ['mary', 'marriage_process', 'new_marrage_story', 'group__kopino', 'kophil'];
        this.forums['news'] = ['reminder', 'database', 'typoon', 'news'];
        this.forums['info'] = ['business', 'info', 'internet', 'newcomer'];

    }


    ionViewDidLoad() {
    }

    onClickForum( post_id ) {
        console.log('onClickForum() post_id: ', post_id);
        this.navCtrl.push( PostListPage, { post_id : post_id });
    }

}