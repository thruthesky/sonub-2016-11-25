import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JobModule } from '../pages/job/job-module';
import { ForumModule } from '../pages/forum/forum-module';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JobModule,
    ForumModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
