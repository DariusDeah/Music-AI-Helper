## What

A user is any person that can connect through the client side application to use services and features provided by the server

## Who

Each user has an id associated with a database entity representing them, users can be validated with their Id and a jwt token that is placed in a cookie set by the server

## Actions

All users can perform the following actions

- create an account (if one does not exist)
- login to account
- logout of account [Authentication Needed to Access]
- use 3rd party api services proxied by the server e.g.(chatgpt api) [Authentication Needed to Access]

## Entity

```json
{
  "id": "any uuid string",
  "username": "a unique username that the user can be identified by in the client",
  "email": "a unique email that the user can be identified by in the client or contacted by",
  "password": "a unique 8 character minimum string  that the user can use to access their account",
  "ip": "IP address of the user that the server can use to implement IP based functionality e.g rate limiting"
}
```

## Endpoints

```json
{
  "/signup": "endpoint used to signup and create a user account",
  "/login": " endpoint used to grant a request access to an existing account",
  "/logout": " endpoint used to logout an active and logged in user account",
  "/getUserInfo": "endpoint used by the client to retrieve information about active and logged in user"
}
```
