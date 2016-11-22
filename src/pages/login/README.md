# User Login



* @see [User Login Flowchat](https://docs.google.com/drawings/d/1KIF1dG8AqVWj5qQ6Y5PS3SeMZRJ50JAK5d1hdje4flc/edit)
* When a user does social login, register & login into Philgo and Xbase
* User login status will be maintained(saved) only in PhilGo.COM



# User login fail


* When philgo login fails, everything fails.

* When philgo login success, but xbase fails,

    * xbase database may changed(deleted), in this case, the user must re-register with new id.
    * @Warning even if th user failed login xbase, the user has logged in since philgo login is the primary.
