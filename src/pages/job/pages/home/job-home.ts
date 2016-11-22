import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";
import { Xbase } from '../../../../xbase-api/xbase';


export interface SearchData {
    profession: string;
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

    data: SearchData = {
        profession: 'housemaid',
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
        let gender = '';
        let today = new Date();
        let yy = today.getFullYear();
        let mm: string | number = today.getMonth()+1;
        let dd: string | number = today.getDate();
        //let maxAge = yy-this.searchByAge.lower+'-'+mm+'-'+dd;
        //let minAge = yy-this.searchByAge.upper+'-'+mm+'-'+dd;

        let maxAge = yy-this.searchByAge.lower + 1;
        let minAge = yy-this.searchByAge.upper;


        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        if((this.data.male) && ( ! this.data.female)) {
            cond = "gender = 'M' AND ";
        }
        else if ((! this.data.male) && (this.data.female)) {
            cond = "gender = 'F' AND ";
        }
        //if birthday is available YYYY-MM-DD
        //cond = cond + "birthday BETWEEN '" + minAge + "' AND '" + maxAge +"'";

        cond = cond + "birth_year BETWEEN '" + minAge + "' AND '" + maxAge +"'";






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
        if ( data.count ) this.posts = data.rows;
        console.log('displayPosts:: ' , this.posts);
    }


    onClickEdit( idx ) {
        this.navCtrl.push( JobPostPage, { idx: idx });
    }

}