import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";
import { JobListPage } from "../list/job-list";
import { Xbase } from '../../../../xbase-api/xbase';
import { Location } from  '../../providers/location'


export interface SearchData {
    category_1: string;
    name: string;
    city: string;
    province: string;
    extra_2: string;
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

    numbers = Array.from(new Array(20), (x,i) => i+1);
    provinces: Array<string> = [];
    cities = [];
    showCities: boolean = false;

    data: SearchData = {
        category_1: 'housemaid',
        name: '',
        city: 'all',
        province: 'all',
        extra_2: 'all', //work experience
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
        workExperience: 'Work Experience',
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
                private alertCtrl: AlertController,
                private xbase: Xbase,
                private location: Location
    ) {

        location.get_province( re => {
           //console.log('success location.get_province::', re);
            this.provinces = re;
        }, e => {
            console.log('error location.get_province::', e);
        });

    }

    ionViewDidEnter() {
        this.search( );
    }

    onClickJobPost() {
        this.navCtrl.push( JobPostPage );
    }

    onClickJobList() {
        this.navCtrl.push( JobListPage );
    }

    showLoader() {
        this.searching = true;
    }
    hideLoader() {
        this.searching = false;
    }

    get cityKeys() {
        return Object.keys( this.cities );
    }

    search( $event? ) {
        let cond = '';
        let today = new Date();
        let yy = today.getFullYear();
        let maxAge = yy-this.searchByAge.lower + 1;
        let minAge = yy-this.searchByAge.upper;
        this.showCities = false;

        cond = "birth_year >= '"+minAge+"'";
        cond += " AND birth_year <= '"+maxAge+"'";

        if( this.data.province != 'all') {
            cond += " AND province = '"+ this.data.province +"'"
            this.location.get_cities( this.data.province, re => {
                console.log('cities', re);
                if(re) {
                    this.cities = re;
                    this.showCities = true
                }
            }, e => {
                console.log('error location.get_cities::', e);
            });
        }
        if( this.data.city != 'all') cond += " AND city LIKE '%" + this.data.city + "%' ";

        if( this.data.category_1 != 'all') cond += " AND category_1 = '"+ this.data.category_1 +"'";

        if(( this.data.male ) && ( ! this.data.female )) {
            cond += " AND gender = 'M'";
        }
        else if (( ! this.data.male ) && ( this.data.female )) {
            cond += " AND gender = 'F'";
        }

        if( this.data.name ) cond += " AND first_name LIKE '%" + this.data.name + "%' ";
        if( this.data.extra_2 != 'all' ) cond += " AND extra_2 <= '" + this.data.extra_2 + "'";
        console.log('search condition:: ', cond);

        this.posts = [];
        this.showLoader();
        this.xbase.post_search({
            cond: cond,
            orderby: 'idx DESC'
        }, re => {
            console.log(re);
            this.onSearchComplete( re );
        }, e => {
            console.log( "home search failed: " + e );
        });
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
        console.info('onClickEdit:: key' + idx);
        this.inputPassword('Edit', password => {
            this.xbase.post_permission( {idx: idx, password: password }, () => {
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


}