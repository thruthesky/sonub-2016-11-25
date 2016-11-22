import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { JobHomePage } from '../pages/home/job-home';
import { JobPostPage } from '../pages/post/job-post';

export let LINKS = [
        { component: JobHomePage, name: 'JobHomePage', segment: 'job' },
        { component: JobPostPage, name: 'JobPostPage', segment: 'job/post' }
];



@NgModule({
  declarations: [
    JobHomePage,
    JobPostPage,
  ],
  imports: [
      IonicModule
  ],
  entryComponents: [
      JobHomePage,
      JobPostPage
  ],
  providers: []
})
export class JobModule {}
