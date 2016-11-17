import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForumPage } from './forum';

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
