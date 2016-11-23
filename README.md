
# SONUB


Social Netowrk Hub

# TODO

    - [ ] If user has not photo, Photo Upload on User Profile. Social login users may have picture.
    - [ ] Post CRUD & Comment CRUD on PhilGo.com
    - [ ] Post CRUD & Comment CRUD on Xbase
    - [ ] Search on Xbase
    - [ ] Search on Philgo of google.
    - [ ] Social login & Register/log in philgo and xbase 
        - @comment : to work on this part, livereload should work on GenyMotion. as of ionic cli 2.1.12 & app-scripts 0.0.46, when running in genymotion, cordova is working but when running with livereload, cordova is not found.


    - [ ] JOB - don't let user input city, province. let them select to reduce human error on input.
    - [ ] JOB - don't let user input input Work experience, let them select.
    - [] JOB - permission on deleting photos on firebase storage.
    - [] JOB - firebase storage image cache double check.

    - [ ] @later Need to improve Xbase login password for security.
    - [ ] @later Philgo Logout and Xbase auto logout. At this time, when a user logs out in philgo, the user does not log out in xbase.

    - [x] @done *Philgo Login and Xbase Auto Login.*
    - [x] @done *Philgo Registration and Xbase auto Registration

# Flowcharts


* [Home](https://docs.google.com/drawings/d/1vq_-wilfcf8XVJ-xC7CZagOiZ09LrjUEXcPJsrRltQ4/edit)
* [Register](https://docs.google.com/drawings/d/1Bw22pNiOE5jLUcLCUPVnxVidpg_mE_GCm2zPfCwQJdk/edit)
* [Login](https://docs.google.com/drawings/d/1KIF1dG8AqVWj5qQ6Y5PS3SeMZRJ50JAK5d1hdje4flc/edit)
* [JOB](https://docs.google.com/drawings/d/1oTbPXtTxVlZIzGnPcPzTIYC1d6bcL5vvxMCUpf8pxIs/edit)


# Resources

* [The Best App Design Resouces](https://market.ionic.io/themes)
* [Mark Down  Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Github MarkDown Guide](https://guides.github.com/features/mastering-markdown/)
* [Resources for Design and Layout](https://drive.google.com/drive/u/0/folders/0B4u3qiWTgOC-UVA1ZkFkYjlQNk0)




# TEST

* All tests must follow DeepLinker test.
* For instance, a test might be run like below.

    * "http://localhost:8100/#/test/xbase" for all the xbsae test
    * "http://localhost:8100/#/test/xbase/test_user_search" for xbase test_user_get method test

* @see [Xbase Api Module](https://github.com/thruthesky/xbase-api/blob/master/xbase-api-module.ts)
* @see [Xbase Test Component](https://github.com/thruthesky/xbase-api/blob/master/xbase-test.ts)




# INSTALL

* rmdir /s node_modules
* npm install --verbose
* git submodule update --init
* git submodule foreach git checkout master
* npm install @types/lodash --save
* ionic plugin add cordova-plugin-device --save
* npm install @ionic/cloud-angular --save
* App ID and settings are already done in the code. @see http://docs.ionic.io/setup.html#app-id
* cordova plugin add cordova-plugin-inappbrowser --save
* npm install firebase --save



# User Registration

* @see [User Registration Doc](https://github.com/thruthesky/sonub/tree/master/src/pages/register)

# User Login

* @see [User Login Doc](https://github.com/thruthesky/sonub/tree/master/src/pages/login)



# Language Translation

* @see src/pipes/language.ts

# Security

* When a user logs in through Social,

    * A random password will be generated and that password will be used every where.
    * So, that password must be saved in a secret place.
        * That's the ionic cloud Auth User Data.
    * To register PhilGo and Xbase, use the password.
    * To login, use the password.


# Locations of Philippines

You can get provinces and cities of province like below.

 * @example to get provinces : http://philgo.com/etc/location/philippines/json.php
 * @example to get cities of a province : http://philgo.com/etc/location/philippines/json.php?province=Bohol
 * @example to get all the provinces and cities : http://philgo.com/etc/location/philippines/json.php?province=all

 ````
    http.get( 'http://philgo.com/etc/location/philippines/json.php' )
      .subscribe( re => {
        let data = JSON.parse( re['_body'] );
        this.provinces = data;
        console.log('place:', data);
      });
````
