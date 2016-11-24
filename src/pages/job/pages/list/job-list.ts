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
            limit: 12,
            orderby: "idx DESC"
        }, re => {
            console.log(re);
            if ( infinite ) infinite.complete();
            this.displayPosts( re );
        }, e => {
            console.log( "home search failed: " + e );
            if ( infinite ) infinite.complete();
        });
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
        this.inputPassword('Edit', password => {
            this.xbase.post_permission( {idx: idx, password: password }, () => {
                this.navCtrl.pop();
                this.navCtrl.push( JobPostPage, { idx: idx });
            }, e => {
                alert( 'Error: ' + e );
            })
        });

    }



    inputPassword( title, callback ) {
        let prompt = this.alertCtrl.create({
            title: title,
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
                    text: 'SUBMIT',
                    handler: data => {
                        console.log('Delete clicked');
                        //this.promptAlert( 'SUCCESS', 'Your post has been deleted.' );
                        //this.deletePost( idx, data.password );
                        callback( data.password );
                    }
                }
            ]
        });
        prompt.present();
    }

    onClickDelete( idx, i ) {
        this.inputPassword('Delete', password => {
            this.deletePost( idx, password );
        });
    }

    deletePost( idx, password ) {
        let data = { idx: idx, password: password };
        this.xbase.post_delete( data, () => {
            console.log('post deleted: ');
        }, e => {
            console.log('error:' + e);
            alert( 'error: ' + e );
        });
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