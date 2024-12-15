---
icon: gauge-min
---

# Pagespeed monitoring

Under **Dashboard > Pagespeed**, you can see an overview of pagespeed monitors for different websites. This dashboard helps you view optimal website performance by providing clear, actionable insights into various aspects of your site's speed and user experience.

<figure><img src="../.gitbook/assets/Screenshot 2024-10-03 at 11.37.47 PM (1).png" alt=""><figcaption></figcaption></figure>

When you add a new page speed monitor, it is added here. Click on the "Create new" button to add a new page speed.&#x20;

Here, both monitors are shown as "Live (Collecting Data)" with a green dot, indicating they are actively monitoring. Each monitor has a small graph, representing recent pagespeed performance over time.

### Details of a pagespeed monitor

<figure><img src="../.gitbook/assets/Screenshot 2024-10-03 at 11.41.55 PM.png" alt=""><figcaption></figcaption></figure>

When you click on a pagespeed card, you'll see an overview of data collected using Google's PageSpeed Monitor API.&#x20;

### Score history graph

Shows performance trends over the past 24 hours. Four colored lines represent different metrics:

* Accessibility (blue)
* Best Practices (orange)
* Performance (green)
* Search Engine Optimization (purple)

You can toggle these metrics on/off using the checkboxes on the right

### Performance report

You'll see an overall score of your server's pagespeed.&#x20;

### Performance metrics

* **Cumulative Layout Shift:** Measures visual stability
* **Speed Index:** How quickly content is visually displayed
* **First Contentful Paint:** Time until the first content is rendered
* **Largest Contentful Paint:** Time until the largest content element is rendered
* **Total Blocking Time:** Sum of all periods between FCP and Time to Interactive

### Creating a new pagespeed&#x20;

When you are on a pagespeed screen, click on the "Create pagespeed" button. You'll see a screen similar to this:&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-10-03 at 11.47.41 PM.png" alt=""><figcaption></figcaption></figure>

This page allows you to set up a new pagespeed monitor for your website. Follow these steps to configure your monitor:

#### General settings

* **URL to monitor:** Enter the full URL of the website you want to monitor (e.g., [https://google.com](https://google.com)).
* **Display name (optional):** Enter a custom name for your monitor to easily identify it in your dashboard.

#### Checks to perform

Here, you can choose between HTTPS (recommended for secure sites) or HTTP protocols.

#### Incident notifications&#x20;

Select how you want to be notified when a new incident occurs. Currently the only way is email notifications, but we'll add more soon.

#### Advanced settings

**Check frequency:** Choose how often you want the system to check your website's pagespeed. The default is set to 3 minutes.

After configuring all settings, click the "Create monitor" button at the bottom right of the page.

#### Tips

* Ensure the URL you enter is correct and accessible.
* Choose a descriptive display name if you're monitoring multiple sites.
* Consider the trade-off between check frequency and resource usage. More frequent checks provide more data but may use more resources.
* Remember to enable your preferred notification methods to stay informed about incidents.

After creating the monitor, you'll be able to view its performance data in your dashboard. This will help you track your website's pagespeed and optimize its performance over time.







