import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Xbase } from '../../../../xbase-api/xbase';
import { Camera } from 'ionic-native';
import { FirebaseStorage } from '../../../../firebase-api/firebase-storage';


export interface  PostEdit {
    idx: number;
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
    birthday: string;
    birth_year?: number;
    birth_month?: number;
    birth_day?: number;
    address: string;
    city: string;
    province: string;
    country: string;
    extra_2: string; // year of experience
    gender: 'M' | 'F' | '';
    attachment_1?: string;
}

export const urlPrimaryPhoto = 'assets/img/anonymous.gif';

export interface FILE_UPLOAD {
    file: any;
    blob?: any;
    ref?: string;
    base64?: string;
}
export interface FILE_UPLOADED {
    url: string;
    ref: string;
}


@Component({
    selector: 'page-job-post',
    templateUrl: 'job-post.html'
})
export class JobPostPage {

    appTitle: string = "Post Edit";
    data : PostEdit = <PostEdit> {
        post_id: 'test',
        title: 'helper'
    };
    urlPhoto: string = urlPrimaryPhoto;
    loader: boolean = false;
    idx: number;
    photoId: number = 0;

    result = null;
    progress = null;
    error = null;

    file_progress:boolean = false;
    position = 0;

    file_upload_begin: boolean = false;
    file_delete_begin: boolean = false;
    file_upload_position: number = 0;

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

        this.idx = navParams.get('idx');
        console.info('navParams:: ' , this.idx);

        if ( this.idx ) {
            console.log("PostEditPage:: post edit id=" + this.idx);
            //retrieve the data and display on their respective field
            this.xbase.post_get( this.idx, re => {
                console.log('post.get success: idx: ' + re['idx'], re);
                if(re['idx']) {
                    this.data.idx = re.idx;
                    this.data.category_1 = re.category_1;
                    this.data.post_id = re.post_id
                    this.data.content= re.content;
                    this.data.first_name = re.first_name;
                    this.data.middle_name = re.middle_name;
                    this.data.last_name = re.last_name;
                    this.data.mobile = re.mobile;
                    this.data.birthday = re.birth_year +'-'+re.birth_month+'-'+re.birth_day;
                    this.data.birth_year = re.birth_year;
                    this.data.birth_month = re.birth_month;
                    this.data.birth_day = re.birthday;
                    this.data.address = re.address;
                    this.data.city = re.city;
                    this.data.province = re.province;
                    this.data.extra_2 = re.extra_2; // year of experience
                    this.data.gender = re.gender;
                    this.data.attachment_1 = re.attachment_1;
                    if(this.data.attachment_1){
                        let primary = JSON.parse(this.data.attachment_1);
                        this.urlPhoto = primary.url;
                    }
                }
                else {
                    console.log('ID doesnt exist')
                }
            }, e => {
                console.log('postget failed: ' + e);
            });
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

        if(this.data['birthday']) {
            let str = this.data['birthday'].split('-');
            this.data['birth_year'] = parseInt(str[0]);
            this.data['birth_month'] = parseInt(str[1]);
            this.data['birth_day'] = parseInt(str[2]);
        }

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
    getReferenceOfPrimaryPhoto( name ) {
        return 'job-primary-photo/' + Date.now() + '/' + name;
    }
    onChangeFile(event) {
        let file = event.target.files[0];
        if ( file === void 0 ) return;
        console.log('onChangeFile(): file: ', file);
        this.file_progress = true;
        //this.position = 50;
        //this.urlPhoto = file.name;
        let ref = this.getReferenceOfPrimaryPhoto( file.name );
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
        let data = this.data.attachment_1;
        if ( ! data ) return;
        let file;
        try {
            file = JSON.parse( data );
        }
        catch( e ) {
            alert("JSON parse failed:");
            return;
        }
        this.file_delete_begin = true;

        this.firebaseStorage.delete( file.ref, () => {
            this.file_delete_begin = false;
            this.urlPhoto = urlPrimaryPhoto;
            this.data.attachment_1 = null;
            this.renderPage();

        }, e => {
            this.file_delete_begin = false;
            alert("FILE DELETE ERROR: " + e);
            this.renderPage();
        } );
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
        console.log('cameraTakePhoto()');
        let options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: type,
            encodingType: Camera.EncodingType.JPEG,
            quality: 100
        };

        Camera.getPicture(options).then((imageData) => {
            this.file_progress = true;
            let ref = this.getReferenceOfPrimaryPhoto( 'primary-photo.jpg' );
            let data : FILE_UPLOAD = {
                file : {
                    name: 'primary-photo.jpg',
                    type: 'image/jpeg'
                },
                ref: ref,
                base64: imageData
            };
            this.firebaseStorage.upload( data, uploaded => {
                    this.onFileUploaded( uploaded.url, uploaded.ref );
                },
                e => {
                    this.file_progress = true;
                    alert( e );
                },
                percent => {

                } );
        }, (err) => {
            alert(err);
        });

    }

}