import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Xbase } from '../../../../xbase-api/xbase';
import { Camera } from 'ionic-native';
import { FirebaseStorage } from '../../../../firebase-api/firebase-storage';


export interface  PostEdit {
    category_1: string;
    post_id : string;
    title: string;
    content: string;
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile: string;
    extra_1: string; //birthday
    address: string;
    city: string;
    province: string;
    country: string;
    extra_2: string; // year of experience
    gender: 'M' | 'F' | '';
    profession: '';
    attachment_1?: string;
    attachment_2?: string;
    attachment_3?: string;
}


@Component({
    templateUrl: 'job-post.html'
})
export class JobPostPage {

    appTitle: string = "Post Edit";
    data : PostEdit = <PostEdit> {
        post_id: 'test'
    };
    urlPhoto: string = "assets/img/anonymous.gif";
    loader: boolean = false;
    postKey: string;
    photoId: number = 0;

    result = null;
    progress = null;
    error = null;

    file_progress:boolean = false;
    position = 0;

    cordova: boolean = false;


    text = {
        fillInAllInfo: 'Fill in All Information',
        email: 'Email Address',
        gender: 'Gender',
        selectGender: 'Select Gender',
        mobile: 'Mobile #',
        address: 'Address',
        city: 'City',
        province: 'Province',
        country: 'Country',
        workExperience: 'Work Experience',
        more: 'More',
        less: 'Less',
        edit: 'Edit',
        delete: 'Delete',
        password: 'Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        middleName: 'Middle Name',
        birthday: 'Birthday',
        male: 'Male',
        female: 'Female',
        personalTitle: 'personal Title',
        personalContent: 'personal Content',
        connectingToServer: 'Connecting to server...',
        submitPost: 'Submit Post'
    };

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private events: Events,
                private alertCtrl: AlertController,
                private platform: Platform,
                private xbase: Xbase,
                private firebaseStorage: FirebaseStorage,
                private ngZone: NgZone
    ) {

        if ( platform.is('cordova') ) this.cordova = true;

        this.postKey = navParams.get('postKey');
        console.info('navParams:: ' , this.postKey);

        if ( this.postKey ) {
            //retrieve the data and display on their respective field
        }
    }
    /**
     * Re-Renders Page.
     * @note From JaeHo Song. It is considered a bug that it really does not bind properly. when the value changes, it does not reflect on page.
     * 
     * @warning this method must be removed after the bug has been fixed from the Angular or Ionic
     * 
     * 
     */
    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }

    onClickPost() {
        this.loader = true;
        this.xbase.post_write( this.data ,
            re => {
                console.log('post write success: re: ' + re);
                this.loader = false;
                let alert = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Your post has been posted.',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.pop();
            },
            e => {
                this.loader = false;
                console.log('post write failed: ' + e );
            });
    }

    onFileUploaded( url, ref ) {
        console.log("onFileUploaded() : this : ", this);
        this.file_progress = false;
        this.urlPhoto = url;
        this.renderPage();
        console.log('this.urlPhoto: ', this.urlPhoto);
        let attachment = {
            url: url,
            ref: ref
        };
        this.data.attachment_1 = JSON.stringify( attachment );
    }

    onChangeFile(event) {
        let file = event.target.files[0];
        if ( file === void 0 ) return;
        console.log('onChangeFile(): file: ', file);
        this.file_progress = true;
        //this.position = 50;
        //this.urlPhoto = file.name;
        let ref = 'job-primary-photo/' + Date.now() + '/' + file.name;
        this.firebaseStorage.upload( { file: file, ref: ref }, uploaded => {
            this.onFileUploaded( uploaded.url, uploaded.ref );
        },
        e => {
            this.file_progress = false;
            alert(e);
        },
        percent => {
            this.position = percent;
            console.log('percent: ' + this.position);
            this.renderPage();
        });
    }

    onClickDeletePhoto( ref ) {
        /* this.file.delete( ref, () => {
         this.urlPhoto = null;
         this.data.urlPhoto = null;
         this.data.refPhoto = null;
         }, e => {
         alert("FILE DELETE ERROR: " + e);
         } ); */
    }

    onClickPhoto() {
        if ( ! this.cordova ) return;
        console.log('onClickPhoto()');
        let confirm = this.alertCtrl.create({
            title: 'PHOTO UPLOAD',
            message: 'Do you want to take photo? or choose photo from gallery?',
            cssClass: 'alert-camera-selection',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => this.cameraTakePhoto( Camera.PictureSourceType.CAMERA )
                },
                {
                    text: 'Gallery',
                    handler: () => this.cameraTakePhoto( Camera.PictureSourceType.PHOTOLIBRARY )
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancel clicked');
                    }
                }
            ]
        });
        confirm.present();
    }

    cameraTakePhoto( type: number ) {
        /* console.log('cameraTakePhoto()');
         let options = {
         destinationType: Camera.DestinationType.DATA_URL,
         sourceType: type,
         encodingType: Camera.EncodingType.JPEG,
         quality: 100
         };

         Camera.getPicture(options).then((imageData) => {
         this.file_progress = true;
         let ref = 'user-primary-photo/' + Date.now() + '/' + 'primary-photo.jpg';
         let data : FILE_UPLOAD = {
         file : {
         name: 'primary-photo.jpg',
         type: 'image/jpeg'
         },
         ref: ref,
         base64: imageData
         };
         this.file.upload( data, uploaded => {
         this.onFileUploaded( uploaded.url, uploaded.ref );
         },
         e => {
         this.file_progress = true;
         alert( e );
         },
         percent => {

         } );
         }, (err) => { alert(err); }); */

    }

}