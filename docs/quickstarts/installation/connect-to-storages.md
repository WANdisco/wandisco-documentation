---
id: connect-to-storages
title: Connect to Storages
sidebar_label: Connect to Storages
---

Once you have [logged in to the UI](./install-ui.md#login), configure your environment by connecting to your storages.

:::note
You must have existing LiveData Plane deployments before you can connect to your storages (as mentioned in the [prerequisites](../preparation/prerequisites-ui.md#existing-deployments)).
:::

1. On the dashboard, select to add **Storage -> LiveData Plane Storage**.

1. Enter details to connect to your LiveData Plane Server:

   * Hostname/IP
   * Port (default is 8082)
   
   Click **Connect** once complete.

   You will be notified that the connection is being initiated. The storage will show on the dashboard **Storage** list once complete.

1. If another zone is detected (if the LiveData Plane Server you have connected to is inducted to other zones), it will also be added to the **Storage** list.

   Otherwise, repeat this process for each storage you want to add.

## Next steps

[Test](../testing/test-ui.md) your environment using the UI.