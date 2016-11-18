import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { JobIndexPage } from './index/job-index';
import { JobPostPage } from './post/job-post';

@NgModule({
  declarations: [
    JobIndexPage,
    JobPostPage
  ],
  imports: [
      IonicModule
  ],
  entryComponents: [
      JobIndexPage,
      JobPostPage
  ],
  providers: []
})
export class JobModule {}
