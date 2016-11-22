import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class Core {

  isCordova: boolean = false;
  isWeb: boolean = true;
  constructor(
    private http: Http,
    public platform: Platform,
  ) {
    console.log('Core::constructor()');
    this.checkCordova();
  }

  checkCordova() {
    console.log('platform: ', this.platform.platforms());
    this.platform.ready().then( () => {
      console.log('Core::constructor() : platform ready !');
      if ( this.platform.is('cordova') ) {
        console.log('Core::constructor() : platform ready >> is cordova !');
        this.isCordova = true;
        this.isWeb = false;
      }
    });
  }


  /**
   * Returns random string.
   * @see README.md#Security
   * @note This generates random string.
   * 
   */
  getRandomString( id ) {
    let random_str = Math.random().toString(36).substr(2, 8);
    return id + '@Sp,.96@' + random_str ;
  }

  /**
   * @note
   */
  getBackendID( id ) {
    return id + '@sonub.com';
  }


}
