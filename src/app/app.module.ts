import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { XbaseApiModule, LINKS as XBASE_API_LINKS } from '../xbase-api/xbase-api-module';
import { PhilgoApiModule } from '../philgo-api/v2/philgo-api-module';
import { IonicApiModule } from '../ionic-api/ionic-api-module';
import { JobModule } from '../pages/job/job-module';
import { ForumModule, LINKS as FORUM_LINKS } from '../pages/forum/forum-module';
import { Core } from '../providers/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
//import { ForumPage } from '../pages/forum/forum';

let links: Array<{ component: any; name: any; segment: any }> = [
  { component: HomePage, name: 'Home', segment: 'home' },
  { component: RegisterPage, name: 'Register', segment: 'register' },
  { component: LoginPage, name: 'Login', segment: 'login' }
];
FORUM_LINKS.map( e => links.push( e ) );
XBASE_API_LINKS.map( e => links.push(e) );


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: links
    }),
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
    LoginPage,
    RegisterPage
  ],
  providers: [ Core ]
})
export class AppModule {}
