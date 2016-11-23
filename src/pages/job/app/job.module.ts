import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { JobHomePage } from '../pages/home/job-home';
import { JobPostPage } from '../pages/post/job-post';
import { JobListPage } from "../pages/list/job-list";

export let LINKS = [
        { component: JobHomePage, name: 'JobHomePage', segment: 'job' },
        { component: JobPostPage, name: 'JobPostPage', segment: 'job/post' },
        { component: JobListPage, name: 'JobListPage', segment: 'job/list' }
];



@NgModule({
  declarations: [
      JobHomePage,
      JobPostPage,
      JobListPage
  ],
  imports: [
      IonicModule
  ],
  entryComponents: [
      JobHomePage,
      JobPostPage,
      JobListPage
  ],
  providers: []
})
export class JobModule {}
