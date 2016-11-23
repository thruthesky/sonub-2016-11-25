import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Post, POSTS } from '../../../../philgo-api/v2/post';
@Component({
    selector: 'page-post-list',
    templateUrl: 'post-list.html'
})
export class PostListPage {


    post_id: string = '';
    posts: POSTS = <POSTS> {};
    constructor(
        private navParams: NavParams,
        private post: Post
    ) {
        console.log("PostListPage::constructor() : navParams: ", this.navParams.data) ;
        this.post_id = this.navParams.get('post_id');


        this.post.page( {post_id: this.post_id, page_no: 1}, (posts: POSTS) => {
            console.log('posts:', posts);
            /*
            console.log('point ad title: ', posts.ads[0].subject);
            console.log('comment user name: ', posts.posts[0].comments[0].member.name);
            */
            this.posts = posts;
        }, e => {
            alert(e);
        });


    }

}