/**
 * 
 * @code Example code on template

    {{ 'home' | ln:{ day: 'Monday', time: '12:34' } }}

 * @endcode
 */

import { Injectable, Pipe } from '@angular/core';
import { Config } from '../etc/config';
import { languageText as lt } from '../etc/language-text';
@Pipe({
  name: 'ln'
})
@Injectable()
export class Language {

  transform(value, args?) {
    let ln = Config.language;
    let str = value;
    if ( lt[value] !== void 0 && lt[value][ln] !== void 0 && lt[value][ln] ) str = lt[value][ln];
    for( let i in args ) {
      str = str.replace('#' + i, args[i]);
    }

    //console.log('str: ', str);
    return str;
  }
}
