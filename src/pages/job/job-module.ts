import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { JobIndexPage } from './index/job-index';
import { JobPostPage } from './post/job-post';

@NgModule({
  declarations: [
    JobIndexPage
  ],
  imports: [
      IonicModule
  ],
  entryComponents: [
      JobIndexPage
  ],
  providers: []
})
export class JobModule {}
