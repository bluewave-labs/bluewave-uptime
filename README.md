# BlueWave Uptime

BlueWave uptime monitoring application

## Getting Started

- Clone this repository to your local machine

1.  [Installation (Client)](#client)
1.  [Installation (Server)](#server)
1.  [Configuration(Server)](#config-server)
1.  [Endpoints](#endpoints)

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
2.  Install all depencies by running `npm install`

---

#### Configuration {#config-server}

Configure the server with the following environmental variables

| ENV Varialbe Name    | Required/Optional | Type   | Description                                          | Accepted Values         |
| -------------------- | ----------------- | ------ | ---------------------------------------------------- | ----------------------- |
| DB_TYPE              | Optional          | string | Specifies DB Type, defaults to FakeDB                | `"MongoDB" \| "FakeDB"` |
| DB_CONNECTION_STRING | Required          | string | Specfies URL for MongoDB Database                    |                         |
| MAILERSEND_API_KEY   | Required          | string | Specfies API KEY for MailerSend service              |                         |
| SYSTEM_EMAIL_ADDRESS | Required          | string | Specfies System email to be used in emailing service |                         |

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
<summary><code>POST</code> <b>/api/v1/auth/register</b></summary>

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

> | Type   | Notes      |
> | ------ | ---------- |
> | `User` | User model |

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
  "msg": "User created}",
  "data": {
    "_id": "6645079aae0b439371913972",
    "firstname": "User First Name",
    "lastname": "User Last Name",
    "email": "user@gmail.com",
    "isActive": true,
    "isVerified": false,
    "updated_at": "2024-05-15T19:06:02.720Z",
    "created_at": "2024-05-15T19:06:02.720Z",
    "__v": 0
  }
}
```

</details>

---

<details>
<summary><code>POST</code> <b>/api/v1/auth/login</b></summary>

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

> | Type   | Notes      |
> | ------ | ---------- |
> | `User` | User model |

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
  "data": {
    "_id": "6644fb9bae0b439371913969",
    "firstname": "User First Name",
    "lastname": "User Last Name",
    "email": "user@gmail.com",
    "isActive": true,
    "isVerified": false,
    "updated_at": "2024-05-15T18:14:51.049Z",
    "created_at": "2024-05-15T18:14:51.049Z",
    "__v": 0
  }
}
```

</details>

---

<details>
<summary><code>GET</code> <b>/api/v1/monitors</b></summary>

##### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

##### Response Payload

> | Type             | Notes             |
> | ---------------- | ----------------- |
> | `Array[Monitor]` | Array of monitors |

</details>

---

<details>
<summary><code>GET</code> <b>/api/v1/monitor/{id}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type      | Notes                                               |
> | --------- | --------------------------------------------------- |
> | `Monitor` | Single monitor with the id in the request parameter |

</details>

---

<details>
<summary><code>GET</code> <b>/api/v1/monitors/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Request Payload

> | Type             | Notes                                                              |
> | ---------------- | ------------------------------------------------------------------ |
> | `Array[Monitor]` | Array of monitors created by user with userId specified in request |

</details>

## Contributors

<a href="https://github.com/bluewave-labs/bluewave-uptime/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bluewave-labs/bluewave-uptime" />
</a>
