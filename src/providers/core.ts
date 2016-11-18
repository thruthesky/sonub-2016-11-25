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
    console.log('Hello Core Provider');
    platform.ready().then( () => {
      if ( this.platform.is('cordova') ) {
        this.isCordova = true;
        this.isWeb = false;
      }
    });
  }


}
