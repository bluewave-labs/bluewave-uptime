---
icon: dove
---

# High level overview



The figure below shows a high level architecture of the Uptime Manager.

<figure><img src="../.gitbook/assets/Screenshot 2024-10-04 at 9.28.27 AM.png" alt=""><figcaption></figcaption></figure>

### Typical auth request overview

The following diagram describes a typical request to the /auth endpoints.

<figure><img src="../.gitbook/assets/Screenshot 2024-10-04 at 9.30.30 AM.png" alt=""><figcaption></figcaption></figure>

### Typical monitor request overview

The following diagram describes a typical request to the `/monitors` endpoints.

<figure><img src="../.gitbook/assets/Screenshot 2024-10-04 at 12.13.55 PM.png" alt=""><figcaption></figcaption></figure>

### JobQueue

The heart of this application is a `JobQueue` class that wraps a BullMQ `Queue`. \
\
A `Monitor` is considered a job, when one is created it is enqueued in the `JobQueue`.\
\
Jobs are handled by a pool of workers in the `JobQueue` and their tasks are executed in the order in which they are enqueued.\
\
Workers are scaled up and down based on the jobs/worker ratio as jobs are enqueued and dequeued.

#### **High level overview of the JobQueue** 

<figure><img src="../.gitbook/assets/Screenshot 2024-10-04 at 12.17.44 PM.png" alt=""><figcaption></figcaption></figure>

### SSL

SSL is handled by LetsEncrypt and Certbot.  This works by Nginx and Certbot sharing the same volume where the certificates are held.  The following snippet from the docker-compose.yaml file shows how this works.\


<figure><img src="../.gitbook/assets/Screenshot 2024-10-04 at 12.20.52 PM.png" alt=""><figcaption></figcaption></figure>

Please see [this guide](https://phoenixnap.com/kb/letsencrypt-docker) for more information on this setup.

\
\
\


\
\


\
