import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LanguageModule } from '../../../app/language-module';
import { ForumIndexPage } from '../pages/index/forum-index';
import { PostListPage } from '../pages/post-list/post-list';
import { Post } from '../../../philgo-api/v2/post';


export let LINKS = [
        { component: ForumIndexPage, name: 'ForumIndex', segment: 'forum' },
        { component: PostListPage, name: 'PostList', segment: 'forum/:post_id' }
];
@NgModule({
  declarations: [
    ForumIndexPage,
    PostListPage
  ],
  imports: [
    IonicModule,
    LanguageModule
  ],
  entryComponents: [
    ForumIndexPage,
    PostListPage
  ],
  providers: [ Post ]
})
export class ForumModule {}
