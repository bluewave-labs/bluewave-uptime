---
description: >-
  This user guide helps new users navigate and understand the Checkmate
  dashboard layout and functionality.
icon: computer-mouse
---

# Using Uptime Manager

## **General Overview**

Checkmate is an open-source server monitoring tool designed to track the uptime, downtime, and performance of servers, websites, or web applications.&#x20;

It provides real-time alerts, status updates, and detailed response time metrics.

### **Sidebar menu**&#x20;

The sidebar on the left contains the following sections:

* **Dashboard**: The main section that shows an overview of your monitored services, including their status and performance. It includes "Monitors" and "Pagespeed"
* **Incidents**: A section where alerts and incidents regarding the monitored services are logged. This helps users investigate issues and track downtime history.
* **Account**: User-related settings and account information are accessible here.
* **Support**: Links to customer support or documentation to help troubleshoot or ask for assistance.
* **Settings**: Provides customization options for the application’s behavior, monitoring frequency, and notification preferences.

**User info section**

At the bottom of the sidebar, you’ll see the current logged-in user alongside with the role.

### **Dashboard content**

The main section of the dashboard displays an overview of the monitored services, including their current status and key performance indicators.

The dashboard offers a summary of your uptime monitors:

* **Up**: The number of monitored services that are currently operational.
* **Down**: The number of monitored services that are currently experiencing issues.
* **Paused**: The number of services that have their monitoring paused.

**Actively monitoring table**

This section lists all the services being monitored, showing key details for each service:

<figure><img src="../.gitbook/assets/Screenshot 2024-10-03 at 10.56.43 PM.png" alt=""><figcaption></figcaption></figure>

* **Host**: The name and URL of the service being monitored.
* **Status**: The current status of the service, indicated by color-coded icons:
  * Green: **Up** (operational)
  * Red: **Down** (non-operational)
  * Yellow: **Paused** (monitoring paused for this service)
* **Response time**: A visual graph showing the performance trends of the service over time. Each bar represents the response time of the service at a given interval. Green bars indicate a healthy response time, while red bars indicate slower or problematic performance.
* **Type**: Indicates the type of service being monitored (either Ping or HTTP).
* **Actions**: This column has settings icons that allow the user to configure the monitoring details of the specific service.

At the top-right corner of the dashboard, there’s a button labeled **Create monitor**. This allows users to add a new server or website to monitor.

A search bar is available above the list of monitored services, enabling users to quickly locate specific services by name or URL.

**Status indicators**

* **Green**: Indicates the service is currently up and operational.
* **Red**: Indicates the service is down or experiencing problems.
* **Yellow**: Indicates that monitoring for this service is paused.

Each service has a graph in the **Response Time** column that displays its performance history over time. This allows you to easily visualize any spikes or drops in performance.

The gear icon next to each monitored service allows for quick access to configuration settings or additional monitoring options.

### Table actions&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-10-03 at 10.57.45 PM.png" alt="" width="375"><figcaption></figcaption></figure>

When you click on the gear icon, you'll see a few options that correspond to that host:&#x20;

1. **Open site**: Opens the monitored website or server in a new browser tab.
2. **Details**: Displays historical uptime and performance metrics for the service.
3. **Incidents**: Shows a log of all incidents related to the service, including downtime and performance issues.
4. **Configure**: Allows modification of monitoring parameters like check frequency and alert preferences.
5. **Clone**: Duplicates the current service’s monitoring settings for a new service.
6. **Remove**: Removes the service from the monitored list and stops all monitoring activities.
