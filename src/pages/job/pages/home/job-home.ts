import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";
import { Xbase } from '../../../../xbase-api/xbase';


export interface SearchData {
    category_1: string;
    name: string;
    city: string;
    province: string;
    male: boolean;
    female: boolean;
    age?: {
        lower: number;
        upper: number;
    }
}

export interface AgeSearchRange {
    lower: number;
    upper: number;
}

@Component({
    selector: 'page-job-home',
    templateUrl: 'job-home.html'
})
export class JobHomePage {
    name : string = '';
    address: string = '';
    searchByAge: AgeSearchRange = { lower: 18 , upper: 60 };
    ageRange:  AgeSearchRange = this.searchByAge;
    male: boolean = false;
    female: boolean = false;
    searching: boolean = false;
    moreButton = [];
    posts = [];
    date = new Date();
    fullYear = this.date.getFullYear();

    data: SearchData = {
        category_1: 'housemaid',
        name: '',
        city: '',
        province: '',
        male: false,
        female: false
    };

    appTitle: string = "Search Helper";
    text = {
        searchByGender: 'Search by Gender',
        searchByAge: 'Search by Age',
        searchByAddress: 'Search by Address',
        searchByName: 'Search by Name',
        searchByCity: 'Search by City',
        searchByProvince: 'Search by Province',
        searching: 'Searching',
        male: 'Male',
        female: 'Female',
        between: 'Between',
        and: 'And',
        like: 'like',
        personalInformation: 'Personal Information',
        name: 'Name',
        gender: 'Gender',
        age: 'Age',
        mobile: 'Mobile #',
        address: 'Address',
        more: 'More',
        less: 'Less',
        edit: 'Edit',
    };
    constructor(public navCtrl: NavController,
                private xbase: Xbase
    ) {

    }

    ionViewDidEnter() {
        this.search( );
    }

    onClickJobPost() {
        this.navCtrl.push( JobPostPage );
    }

    showLoader() {
        this.searching = true;
    }
    hideLoader() {
        this.searching = false;
    }

    search( $event? ) {
        let cond = '';
        let today = new Date();
        let yy = today.getFullYear();
        let maxAge = yy-this.searchByAge.lower + 1;
        let minAge = yy-this.searchByAge.upper;

        cond = "birth_year >= '"+minAge+"'";
        cond += " AND birth_year <= '"+maxAge+"'";

        if( this.data.category_1 != 'all') cond += " AND category_1 = '"+ this.data.category_1 +"'";

        if((this.data.male) && ( ! this.data.female)) {
            cond += " AND gender = 'M'";
        }
        else if ((! this.data.male) && (this.data.female)) {
            cond += " AND gender = 'F'";
        }

        if(this.data.city ) cond += " AND city LIKE '%" + this.data.city + "%' ";
        if(this.data.province ) cond += " AND province LIKE '%" + this.data.province + "%' ";
        if(this.data.name ) cond += " AND first_name LIKE '%" + this.data.name + "%' ";
        console.log('search condition:: ', cond);

        this.posts = [];
        this.showLoader();
        this.xbase.post_search({
            cond: cond
        }, re => {
            console.log(re);
            this.onSearchComplete( re );
        }, e => {
            console.log( "home search failed: " + e );
        })
    }

    onSearchComplete( re ) {
        console.log('onSearchComplete()');
        this.hideLoader();
        this.displayPosts( re );
    }

    displayPosts( data ) {
        console.log( 'success', data );
        if ( data.count ) {
            for( let post of data.rows ){
                if(post.attachment_1) {
                    post.attachment_1 = JSON.parse(post.attachment_1);
                }
                this.posts.push( post);
            }
        }
        console.log('displayPosts:: ' , this.posts);
    }


    onClickEdit( idx ) {
        this.navCtrl.push( JobPostPage, { idx: idx });
    }

}