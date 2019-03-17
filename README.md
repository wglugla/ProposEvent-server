# ProposEvent-server

Backend to the project **ProposEvent**

## Backend requirements

REST API using [Node.js](https://nodejs.org/en/docs/), [ExpressJS](http://expressjs.com/), [MySQL](https://github.com/mysqljs/mysql), powered by [Sequelize](http://docs.sequelizejs.com/) and [Bcryptjs](https://www.npmjs.com/package/bcryptjs).

## Shortcut of the app idea

User creates account which allows him to:

- create new event and invite people to take part in it
- take part in an event created by someone

Events are selected by tags connected with your account and each event.

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

### Register new user

- **URL:**:
  `/signup`
- **Method:**
  `POSt`
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
  `POSt`
- **URL params:**
  _none_
  - **Request:**

```json
{
  "username": "string 5-45 characters required",
  "password": "string required regex(/^[a-zA-Z0-9]{8,30}$/"
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

### Get all tags

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
