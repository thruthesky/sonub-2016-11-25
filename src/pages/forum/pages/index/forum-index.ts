import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Post } from '../../../../philgo-api/v2/post';

@Component({
    templateUrl: 'forum-index.html'
})
export class ForumIndexPage {
    community;
    buyandsell;
    life;
    travel;
    love;
    news;
    info;
    constructor(
        private navParams: NavParams,
        private post: Post
    ) {
        console.log("ForumIndexPage::constructor() : navParams: ", this.navParams.data) ;

        this.community = ['greeting', 'knowhow', 'wanted', 'case', 'lookfor', 'phil_life_tip', 'freetalk', 'caution', 'qna', 'party'];
        this.buyandsell = ['personal', 'buyandsell', 'biz_partner', 'massage', 'real_estate', 'phone', 'food_delivery', 'rent', 'cars', 'boarding_house'];
        this.life = ['tagalog', 'document', 'im', 'visa'];
        this.travel = ['golf', 'rentcar', 'hotel', 'rest', 'woman_place', 'travel_free', 'nature', 'travel_photo', 'travel_story'];
        this.love = ['mary', 'marriage_process', 'new_marrage_story', 'group__kopino', 'kophil'];
        this.news = ['reminder', 'database', 'typoon', 'news'];
        this.info = ['business', 'info', 'internet', 'newcomer'];

        this.displayForums();
    }


    ionViewDidLoad() {
    }


    displayForums() {
        this.post.getForums( data => {
            console.log('forums: ', data);
        }, e => {
            console.log('getForum() error: ', e);
        });
    }

}