# User Registration

* Sonub is an app of combination of philgo.com, xbase, ionic, fireframe.

* User must save his profile data into philgo.com and xbase.

* User can login through philgo.com and social like facebook.com.

    * If a user logs in through social,

        * then the user must save his profile data into philgo.com and xabase.


* PhilGo.COM is the base for user register, login, profile data saving.

    * If a user has successfully registered in PhilGo.COM,
        the app must save the user's registration data in xbase without error.


* When a user logged in through philgo.com
    * the user must login into xbase also.
    * if the user has no account in xbase, then create one.

* When a user logged in through social site,
    * the app must create account and login in Philgo.com and Xbase without error.


* ID format of philgo.com & xbase for social login

    id@facebook.com
    id@google+.com
    id@twitter.com



* For instance, sonub app.

    * if a user registers, the user data must save in PhilGo.COM

    * if user registered in philgo.com successfully,

        then the app must create id in xbase without error.

        * for instance, if user id conflicts,

            then create something like
                "user_id@philgo.com-2", "user_id@philgo.com-3" and so on.
     
     * xbase password is the combination of philgo member_idx and user_id

        ex) user_id/member_idx@philgo.com

# User Registration PhilGo and Xbase ID Format

  * Xbase user ID is "philgo_user_id@philgo.com"
  * Xbase user Password is "~philgo.com@philgo_user_id"