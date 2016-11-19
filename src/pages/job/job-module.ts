import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { JobIndexPage } from './index/job-index';
import { JobPostPage } from './post/job-post';

import { AgeCalculator } from "./pipes/age-calculator";

@NgModule({
  declarations: [
    JobIndexPage,
    JobPostPage,
    AgeCalculator
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
