import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";
import { Xbase } from '../../../../xbase-api/xbase';

@Component({
    selector: 'page-job-list',
    templateUrl: 'job-list.html'
})
export class JobListPage {


    appTitle: string = "Helper List";
    page: number = 0;
    posts = [];
    moreButton = [];
    noMorePost: boolean = false;
    text = {
        personalInformation: 'Personal Information',
        name: 'Name',
        gender: 'Gender',
        age: 'Age',
        mobile: 'Mobile #',
        address: 'Address',
        more: 'More',
        less: 'Less',
        edit: 'Edit',
        delete: 'Delete',
    };

    date = new Date();
    fullYear = this.date.getFullYear();

    constructor(public navCtrl: NavController,
                private alertCtrl: AlertController,
                private xbase: Xbase
    ) {
        this.loadPosts();
    }


    loadPosts( infinite? ) {
        this.xbase.post_search({
            page: ++this.page,
            limit: 12
        }, re => {
            console.log(re);
            if ( infinite ) infinite.complete();
            this.displayPosts( re );
        }, e => {
            console.log( "home search failed: " + e );
            if ( infinite ) infinite.complete();
        })
        /*this.xbase.post_search( args,
                res => {
                    console.log('xpost.gets::: ', res.data.rows);
                    if ( infinite ) infinite.complete();
                    this.displayPosts( res.data.rows );
                } ,
                e => {
                    if ( infinite ) infinite.complete();
                    console.log("fetch failed: ", e);
                }
            );*/
    }

    displayPosts( data ) {
        console.log('displayPosts:::')
        if ( data.count ) {
            for( let post of data.rows ){
                if(post.attachment_1) {
                    post.attachment_1 = JSON.parse(post.attachment_1);
                }
                this.posts.push( post);
            }
        }
        console.log( this.posts );
    }

    doInfinite( infiniteScroll ) {

        this.loadPosts( infiniteScroll );

    }

    onClickEdit( idx ) {
        console.info('onClickEdit:: key' + idx);
        this.navCtrl.pop();
        this.navCtrl.push( JobPostPage, { idx: idx });
    }

    onClickDelete( postKey, i ) {
        let prompt = this.alertCtrl.create({
            title: 'Delete',
            message: "Enter password of the post",
            inputs: [
                {
                    name: 'password',
                    placeholder: 'Input password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: data => {
                        console.log('Delete clicked');
                        //this.promptAlert( 'SUCCESS', 'Your post has been deleted.' );
                    }
                }
            ]
        });
        prompt.present();
    }

    promptAlert( title, message ) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}