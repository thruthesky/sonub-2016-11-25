import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, Events } from 'ionic-angular';

import { Camera } from 'ionic-native';

export interface  PostEdit {
    key : string;
    category: string;
    ID : number;
    post_title: string;
    post_content: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile: string;
    birthday: string;
    address: string;
    gender: 'M' | 'F' | '';
    fid: Array<string>;
    urlPhoto?: string;
    refPhoto?: string;
}


@Component({
    templateUrl: 'job-post.html'
})
export class JobPostPage {

    appTitle: string = "Post Edit";
    data : PostEdit = <PostEdit> {};

    urlPhoto: string = "assets/img/photo.png";
    loader: boolean = false;
    postKey: string;
    photoId: number = 0;

    result = null;
    progress = null;
    error = null;
    file_progress = null;
    position = 0;

    cordova: boolean = false;


    text = {
        fillInAllInfo: 'Fill in All Information',
        gender: 'Gender',
        selectGender: 'Select Gender',
        mobile: 'Mobile #',
        address: 'Address',
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
        personalTitle: 'personalTitle',
        personalContent: 'personalContent',
        connectingToServer: 'Connecting to server...',
        submitPost: 'Submit Post'
    };

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private events: Events,
                private alertCtrl: AlertController,
                private platform: Platform,
                //private file: Data
    ) {

        if ( platform.is('cordova') ) this.cordova = true;

        this.postKey = navParams.get('postKey');
        console.info('navParams:: ' , this.postKey);

        if ( this.postKey ) {
            //retrieve the data and display on their respective field
        }
    }

    onClickPost() {
        this.loader = true;
        /*this.post
            .sets( this.data )
            .create( () => {
                this.loader = false;
                let alert = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Your post has been posted.',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.pop();
                console.log( 'onclickPost::Success' );
            }, e => {
                this.loader = false;
                console.log( 'onclickPost::Failed' + e );
            }); */
    }

    onFileUploaded( url, ref ) {
        this.file_progress = false;
        this.urlPhoto = url;
        this.data.urlPhoto = url;
        this.data.refPhoto = ref;
    }

    onChangeFile(event) {
       /* let file = event.target.files[0];
        if ( file === void 0 ) return;
        this.file_progress = true;
        let ref = 'user-primary-photo/' + Date.now() + '/' + file.name;
        this.file.upload( { file: file, ref: ref }, uploaded => {
                this.onFileUploaded( uploaded.url, uploaded.ref );
            },
            e => {
                this.file_progress = false;
                alert(e);
            },
            percent => {
                this.position = percent;
            } ); */
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