---
icon: screwdriver-wrench
---

# Server settings

Under the Settings page, you can configure the server's behaviour.

### General settings

Display timezone: The timezone of the dashboard you publicly display.

### History and monitoring

Define here for how long you want to keep the data. You can also remove all past data. You can also clear all stats. This is irreversible.

### Demo monitors

Here you can add and remove demo monitors. It will load roughly 300 demo monitors at the same time so you can test your server.

### Advanced settings

Here you can setup the following:

* **Client settings:** The URL of the APIs and debug level. The more verbose the debug level, the more log is written on the server.
* **Email settings:** Set your host email settings here. These settings are used for sending system emails.
* **Server settings:** Several server settings can be done here. Alternatively, you can add a pagespeed API key to bypass Google's limitations (albeit they are generous about it)

Select a number for jwt TTL and a unit for it (days or hours), the combined result would be in vercel/ms time format, e.g "99d", this will be sent to server to persist
