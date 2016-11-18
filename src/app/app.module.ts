import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { XbaseApiModule } from '../xbase-api/xbase-module';
import { PhilgoApiModule } from '../philgo-api/v2/philgo-module';
import { IonicApiModule } from '../ionic-api/ionic-module';
import { JobModule } from '../pages/job/job-module';
import { ForumModule } from '../pages/forum/forum-module';
import { Core } from '../providers/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    XbaseApiModule,
    PhilgoApiModule,
    IonicApiModule,
    JobModule,
    ForumModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [ Core ]
})
export class AppModule {}
