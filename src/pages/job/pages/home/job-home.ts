import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobPostPage } from "../post/job-post";


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
    constructor(public navCtrl: NavController ) {


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
        this.showLoader();
    }
}