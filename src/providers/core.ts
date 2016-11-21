import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the Core provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Core {

  isCordova: boolean = false;
  isWeb: boolean = true;
  constructor(
    private http: Http,
    public platform: Platform,
  ) {
    console.log('Core::constructor()');
    console.log('platform: ', this.platform.platforms());
    platform.ready().then( () => {
      console.log('Core::constructor() : platform ready !');
      if ( this.platform.is('cordova') || this.platform.is('android') || this.platform.is('ios') ) {
        console.log('Core::constructor() : platform ready >> is cordova !');
        this.isCordova = true;
        this.isWeb = false;
      }
    });
  }


  /**
   * @see README.md#Security
   */
  getPassword( id ) {
    let random_str = Math.random().toString(36).substr(2, 5);
    return id + '@Sp,.96@' + random_str ;
  }


}
