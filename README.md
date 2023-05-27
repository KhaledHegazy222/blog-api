# Blog API

## endpoints

- User Authentication

      POST /account/login
      POST /account/signup
      POST /account/logout

- Posts

      GET 	/posts/
      GET 	/posts/:postID
      PUT 	/posts/:postID
      DELETE 	/posts/:postID

- Comments

      GET 	/posts/:postID/comments/
      GET 	/posts/:postID/comments/:commentID
      PUT 	/posts/:postID/comments/:commentID
      DELETE 	/posts/:postID/comments/:commentID

> All Put And Delete endpoints can only be use by the author of the post or the comment. (Write Permissions)

## Authorization

I used JWT token authentication to handle user authorization and token authentication.
