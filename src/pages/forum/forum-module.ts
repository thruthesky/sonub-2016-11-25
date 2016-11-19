import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForumPage } from './forum';



export let LINKS = [
        { component: ForumPage, name: 'Forum', segment: 'forum/:post_id/:category' }
];
@NgModule({
  declarations: [
    ForumPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
      ForumPage
  ],
  providers: []
})
export class ForumModule {}
