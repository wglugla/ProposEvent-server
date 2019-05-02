# ProposEvent-server - REST API

This is a server for the project **ProposEvent**
You can check client app here: [ProposEvent-client](https://github.com/wglugla/ProposEvent-client),

## Technologies

REST API using

- [Node.js](https://nodejs.org/en/docs/),
- [ExpressJS](http://expressjs.com/),
- [MySQL2](https://www.npmjs.com/package/mysql2), _powered by_
- [Sequelize](http://docs.sequelizejs.com/) _and_
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (_password encryption_)

## Shortcut of the ProposEvent app idea

User creates account which allows him to:

- create new event and allow people to take part in it
- take part in an event created by someone
- edit existing events
- find events based on user interests

> NOTE: Events are selected by tags connected with your account and each event.

## Authorization

Most endpoints are protected by Bearer **JSON Web Token** assigned to the logged in user.
Get access defining headers to your request:

```jsonld=
headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
},
```

## Database model

![](https://user-images.githubusercontent.com/25866930/57068722-d7be0f80-6cd2-11e9-9559-00658973f1ed.png)

## API

### Get all users

- **URL:**:
  `/users/`
- **Method:**
  `GET`
- **URL params:**
  _none_
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get user by id

- **URL:**:
  `/users/:id`
- **Method:**
  `GET`
- **URL params:**
  `id`
- **Success response:**

```json
{
  "status": true,
  "data": {
    "user_id": "",
    "username": "",
    "name": "",
    "surname": "",
    "password": ""
  }
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Not found"
}
```

### Get user's events

- **URL:**:
  `/users/:id/events`
- **Method:**
  `GET`
- **URL params:**
  `id(Integer)`
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get user's signed events

- **URL:**:
  `/users/:id/signedEvents`
- **Method:**
  `GET`
- **URL params:**
  `id(Integer)`
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Register new user

- **URL:**:
  `/signup`
- **Method:**
  `POST`
- **URL params:**
  _none_

- **Request:**

```json
{
  "username": "string 5-45 characters required",
  "name": "string 5-20 characters required",
  "surname": "string 5-20 characters required",
  "password": "string required regex(/^[a-zA-Z0-9]{8,30}$/",
  "tags": "string, required, to split using ',', without white characters"
}
```

- **Success response:**

```json
{
  "status": true,
  "data": "User registered"
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Login

- **URL:**:
  `/signin`
- **Method:**
  `POST`
- **URL params:**
  _none_
- **Request:**

```json
{
  "username": "string 5-45 characters required",
  "password": "string required regex(/^[a-zA-Z0-9[!@#$%^&]{5,20}$/)"
}
```

- **Success response:**

```json
{
  "status": true,
  "data": "Success",
  "token": "JWT TOKEN"
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Incorrect login or password"
}
```

### Match events with user

- **URL:**:
  `/user/:id/events/suggested`
- **Method:**
  `GET`
- **URL params:**
  `id(Integer)`
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get all tags

- **URL:**:
  `/tags/`
- **Method:**
  `GET`
- **URL params:**
  _none_
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get tag by tag id

- **URL:**:
  `/tags/:id`
- **Method:**
  `GET`
- **URL params:**
  `id`
- **Success response:**

```json
{
  "status": true,
  "data": {
    "tag_id": "",
    "value"
  }
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get all events

- **URL:**:
  `/events/`
- **Method:**
  `GET`
- **URL params:**
  _none_
- **Success response:**

```json
{
  "status": true,
  "data": []
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Get tag by tag id

- **URL:**:
  `/events/:id`
- **Method:**
  `GET`
- **URL params:**
  `id`
- **Success response:**

```json
{
  "status": true,
  "data": {
    "event_id": "",
    "owner_id": "",
    "place": "",
    "date": "",
    "description": ""
  }
}
```

- **Error response:**

```json
{
  "status": false,
  "error": "Error message"
}
```

### Create new event

- **URL:**:
  `/events/create`
- **Method:**
  `POST`
- **URL params:**
  `none`

- **Request**

```json=
{
    "date": "\"
    "description": "\"
    "owner_id": ""
    "place": ""
    "tags": ""
    "title": ""
}
```

- **Success response:**

```json=
{
  "status": true,
  "data": "Event created"
}
```

- **Error response:**

```json=
{
  "status": false,
  "error": "Error message"
}
```

### Modify event

- **URL:**:
  `/events/modify/:id`
- **Method:**
  `POST`
- **URL params:**
  `id (Integer)`

- **Request**

```json=
{
    "date": "\"
    "description": "\"
    "owner_id": ""
    "place": ""
    "tags": ""
    "title": ""
}
```

- **Success response:**

```json=
{
  "status": true,
  "data": "Event modified"
}
```

- **Error response:**

```json=
{
  "status": false,
  "error": "Error message"
}
```

### Add member to event

- **URL:**:
  `/events/addmember`
- **Method:**
  `POST`
- **URL params:**
  `null`

- **Request**

```json=
{
  "user_id": "",
  "event_id": ""
}
```

- **Success response:**

```json=
{
  "status": true,
  "data": "User Added
}
```

- **Error response:**

```json=
{
  "status": false,
  "error": "Error message"
}
```

### Remove member from event

- **URL:**:
  `/events/removemember
- **Method:**
  `POST`
- **URL params:**
  `null`

- **Request**

```json=
{
  "user_id": "",
  "event_id": ""
}
```

- **Success response:**

```json=
{
  "status": true,
  "data": "User Removed
}
```

- **Error response:**

```json=
{
  "status": false,
  "error": "Error message"
}
```
