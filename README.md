# BlueWave Uptime

BlueWave uptime monitoring application

## Getting Started

- Clone this repository to your local machine

1.  [Installation (Client)](#client)
2.  [Installation (Server)](#server)
3.  [Configuration(Server)](#config-server)
4.  [Endpoints](#endpoints)
    - <code>POST</code> [/api/v1/auth/register](#post-register)
    - <code>POST</code> [/api/v1/auth/login](#post-login)
    - <code>GET</code> [/api/v1/monitors](#get-monitors)
    - <code>GET</code> [/api/v1/monitor/{id}](#get-monitor-id)
    - <code>GET</code> [/api/v1/monitors/user/{userId}](#get-monitors-user-userid)
    - <code>POST</code> [/api/v1/monitors](#post-monitors)
    - <code>POST</code> [/api/v1/monitors/delete/{monitorId}](#post-monitors-del-id)
    - <code>POST</code> [/api/v1/monitors/edit/{monitorId}](#post-monitors-edit-id)
5.  [Error Handling](#error-handling)
6.  [Contributors](#contributors)

---

### Client

#### Installation

1.  Change directory to the `Client` directory
2.  Install all dependencies by running `npm install`

#### Starting Development Server

1.  Run `npm run dev` to start the development server.

---

### Server

#### Installation

1.  Change directory to the `Server` directory
2.  Install all dependencies by running `npm install`

---

#### Configuration {#config-server}

Configure the server with the following environmental variables

| ENV Variable Name    | Required/Optional | Type      | Description                                           | Accepted Values     |
| -------------------- | ----------------- | --------- | ----------------------------------------------------- | ------------------- |
| JWT_SECRET           | Required          | `string`  | JWT secret                                            |                     |
| DB_TYPE              | Optional          | `string`  | Specify DB to use                                     | `MongoDB \| FakeDB` |
| DB_CONNECTION_STRING | Required          | `string`  | Specifies URL for MongoDB Database                    |                     |
| PORT                 | Optional          | `integer` | Specifies Port for Server                             |                     |
| MAILERSEND_API_KEY   | Required          | `string`  | Specifies API KEY for MailerSend service              |                     |
| SYSTEM_EMAIL_ADDRESS | Required          | `string`  | Specifies System email to be used in emailing service |                     |

---

#### Starting the Development Server

1.  run `npm run dev` to start the development server

---

#### Endpoints

All endpoints return a response in this format:

| Name    | Type      | Notes                         |
| ------- | --------- | ----------------------------- |
| success | `boolean` | Success or failure of request |
| msg     | `string`  | Message describing response   |
| data    | `Object`  | Arbitrary Payload             |

Example:

```
{success: true, msg: "Successful Request", data: {test: testData}}
```

---

##### Data Types

<details>
<summary><code>User</code></summary>

| Name          | Type      | Notes                 |
| ------------- | --------- | --------------------- |
| firstname     | `string`  | First name            |
| lastname      | `string`  | Last name             |
| email         | `string`  | User's email          |
| profilePicUrl | `string`  | URL to User's picture |
| isActive      | `boolean` | Default to `true`     |
| isVerified    | `boolean` | Default to `false`    |
| updated_at    | `Date`    | Last update time      |
| created_at    | `Date`    | Time created at       |

</details>

<details>
<summary><code>Monitor</code></summary>

| Name        | Type      | Notes                                    |
| ----------- | --------- | ---------------------------------------- |
| userId      | `string`  | Unique ID identifying monitor creator    |
| name        | `string`  | Name of the monitor                      |
| description | `string`  | Description of the monitor               |
| url         | `string`  | Url the monitor will ping                |
| isActive    | `boolean` | Whether or not the monitor is active     |
| interval    | `integer` | Interval with which to ping monitor (ms) |
| updatedAt   | `Date`    | Last time the monitor was updated        |
| CreatedAt   | `Date`    | When the monitor was updated             |

</details>

---

<details>
<summary id='post-register'><code>POST</code> <b>/api/v1/auth/register</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name      | Type     | Notes               |
> | --------- | -------- | ------------------- |
> | firstname | `string` |                     |
> | lastname  | `string` |
> | email     | `string` | Valid email address |
> | password  | `string` | Min 8 chars         |

##### Response Payload

> | Type | Notes                              |
> | ---- | ---------------------------------- |
> | JWT  | JSON Web Token containing a `User` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"firstname" : "User First Name",
	"lastname": "User Last Name",
	"email" : "user@gmail.com",
	"password": "user_password"
}'
```

##### Sample Response

```json
{
  "success": true,
  "msg": "User created",
  "data": "<encoded_user>"
}
```

</details>

---

<details>
<summary id='post-login'><code>POST</code> <b>/api/v1/auth/login</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name     | Type     | Notes               |
> | -------- | -------- | ------------------- |
> | email    | `string` | Valid email address |
> | password | `string` | Min 8 chars         |

##### Response Payload

> | Type | Notes                              |
> | ---- | ---------------------------------- |
> | JWT  | JSON Web Token Containing a `User` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email" : "user@gmail.com",
	"password": "user_password"
}'
```

##### Sample response

```json
{
  "success": true,
  "msg": "Found user",
  "data": "<encoded_user>"
}
```

</details>

---

<details>
<summary id='get-monitors'><code>GET</code> <b>/api/v1/monitors</b></summary>

##### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

##### Response Payload

> | Type             | Notes             |
> | ---------------- | ----------------- |
> | `Array[Monitor]` | Array of monitors |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitors found",
  "data": [
    {
      "_id": "664d070786e62625ac612ca1",
      "userId": "6645079aae0b439371913972",
      "name": "Wha3",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-21T20:41:43.051Z",
      "updatedAt": "2024-05-21T20:45:10.496Z",
      "__v": 0
    },
    {
      "_id": "664e5ccf189c864800debc16",
      "userId": "6645079aae0b439371913972",
      "name": "Inserting a new Monitor",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-22T20:59:59.295Z",
      "updatedAt": "2024-05-22T20:59:59.295Z",
      "__v": 0
    }
  ]
}
```

</details>

---

<details>
<summary id='get-monitor-id'><code>GET</code> <b>/api/v1/monitor/{id}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type      | Notes                                               |
> | --------- | --------------------------------------------------- |
> | `Monitor` | Single monitor with the id in the request parameter |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors/664d070786e62625ac612ca1 \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor found",
  "data": {
    "_id": "664d070786e62625ac612ca1",
    "userId": "6645079aae0b439371913972",
    "name": "My Monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-05-21T20:41:43.051Z",
    "updatedAt": "2024-05-21T20:45:10.496Z",
    "__v": 0
  }
}
```

</details>

---

<details>
<summary id='get-monitors-user-userid'><code>GET</code> <b>/api/v1/monitors/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type             | Notes                                                              |
> | ---------------- | ------------------------------------------------------------------ |
> | `Array[Monitor]` | Array of monitors created by user with userId specified in request |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors/user/6645079aae0b439371913972 \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitors for user 6645079aae0b439371913972 found",
  "data": [
    {
      "_id": "664d070786e62625ac612ca1",
      "userId": "6645079aae0b439371913972",
      "name": "Wha3",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-21T20:41:43.051Z",
      "updatedAt": "2024-05-21T20:45:10.496Z",
      "__v": 0
    },
    {
      "_id": "664e5ccf189c864800debc16",
      "userId": "6645079aae0b439371913972",
      "name": "Inserting a new Monitor",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-22T20:59:59.295Z",
      "updatedAt": "2024-05-22T20:59:59.295Z",
      "__v": 0
    }
  ]
}
```

</details>

---

<details>
<summary id='post-monitors'><code>POST</code><b>/api/v1/monitors</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `Monitor` | Newly created monitor is returned |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors \
  --header <bearer_token> \
  --header 'Content-Type: application/json' \
  --data '{"userId": "6645079aae0b439371913972",
			"name": "Inserting a new Monitor",
			"description": "Description",
			"url": "https://monitor0.com",
			"isActive": true,
			"interval": 60000}'
```

##### Sample Response

```json
{
  "success": true,
  "msg": "Monitor created",
  "data": {
    "userId": "6645079aae0b439371913972",
    "name": "Inserting a new Monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "_id": "664e5ccf189c864800debc16",
    "createdAt": "2024-05-22T20:59:59.295Z",
    "updatedAt": "2024-05-22T20:59:59.295Z",
    "__v": 0
  }
}
```

</details>

---

<details>
<summary id='post-monitors-del-id'><code>POST</code><b>/api/v1/monitors/delete/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type | Notes               |
> | ---- | ------------------- |
> | None | No payload returned |

###### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors/delete/664e632a7a3ee9d620761938 \
  --header '<bearer_token>' \
  --header 'Content-Type: application/json' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor deleted"
}
```

## </details>

---

<details>
<summary id='post-monitors-edit-id'><code>POST</code><b>/api/v1/monitors/edit/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type      | Notes                       |
> | --------- | --------------------------- |
> | `Monitor` | Returns the updated monitor |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors/edit/664e5ccf189c864800debc16 \
  --header '<bearer_token' \
  --header 'Content-Type: application/json' \
  --data '
		{
			"_id": "664e5ccf189c864800debc16",
			"userId": "6645079aae0b439371913972",
			"name": "Edited monitor",
			"description": "Description",
			"url": "https://monitor0.com",
			"isActive": true,
			"interval": 60000
		}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor edited",
  "data": {
    "_id": "664e5ccf189c864800debc16",
    "userId": "6645079aae0b439371913972",
    "name": "Edited monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-05-22T20:59:59.295Z",
    "updatedAt": "2024-05-22T21:34:33.893Z",
    "__v": 0
  }
}
```

</details>

---

### Error handling {#error-handling}

Errors are returned in a standard format:

`{"success": false, "msg": "No token provided"}`

Errors are handled by error handling middleware and should be thrown with the following parameters

| Name    | Type      | Default                | Notes                                |
| ------- | --------- | ---------------------- | ------------------------------------ |
| status  | `integer` | 500                    | Standard HTTP codes                  |
| message | `string`  | "Something went wrong" | An error message                     |
| service | `string`  | "Unknown Service"      | Name of service that threw the error |

Example:

```
const myRoute = async(req, res, next) => {
  try{
    const result = myRiskyOperationHere();
  }
  catch(error){
    error.status = 404
    error.message = "Resource not found"
    error.service = service name
    next(error)
    return;
  }
}

```

Errors should not be handled at the controller level and should be left to the middleware to handle.

## Contributors

<a href="https://github.com/bluewave-labs/bluewave-uptime/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bluewave-labs/bluewave-uptime" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
