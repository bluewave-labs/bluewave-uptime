# BlueWave Uptime

BlueWave uptime monitoring application

## Getting Started

- Clone this repository to your local machine

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

#### Configuration

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

##### Data Types

###### Monitor

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

---

##### GET /api/v1/monitors

###### Response

| Status Code | Type                  | Description                      |
| ----------- | --------------------- | -------------------------------- |
| 200         | Response with Payload | Response with a list of monitors |

###### Payload

| Type             | Notes             |
| ---------------- | ----------------- |
| `Array[Monitor]` | Array of monitors |

---

##### GET /api/v1/monitor/:id

###### Response

| Status Code | Type                  | Description                    |
| ----------- | --------------------- | ------------------------------ |
| 200         | Response with Payload | Response with a single monitor |

###### Payload

| Type      | Notes                                               |
| --------- | --------------------------------------------------- |
| `Monitor` | Single monitor with the id in the request parameter |

---

##### GET /api/v1/monitors/user/:userId

| Status Code | Type                  | Description                      |
| ----------- | --------------------- | -------------------------------- |
| 200         | Response with Payload | Response with a list of monitors |

###### Payload

| Type             | Notes                                                              |
| ---------------- | ------------------------------------------------------------------ |
| `Array[Monitor]` | Array of monitors created by user with userId specified in request |

## Contributors

<a href="https://github.com/bluewave-labs/bluewave-uptime/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bluewave-labs/bluewave-uptime" />
</a>
