---
id: connect-to-storages
title: Connect to Storages
sidebar_label: Connect to Storages
---

Once you have [logged in to the UI](./install-ui.md#login), configure your environment by connecting to your storages.

:::note
You will need to have existing deployments before you can complete this task (as mentioned in the [prerequisites](../preparation/prerequisites-ui.md#existing-deployments)).
:::

1. On the dashboard, select to add **Storage -> Fusion Storage**.

1. Enter details to connect to your Fusion Server:

   * Hostname
   * Port (default is 8082)
   
   Click **Connect** once complete.

   You will be notified that the connection is being initiated, the storage will show on the dashboard **Storage** list once complete.

1. If another zone is detected (i.e. the Fusion Server you have connected to is inducted to other zones), it will also be added to the **Storage** list.

   Otherwise, repeat this process again for each storage you want to add.

## Next steps

[Test](../testing/test-ui.md) your environment using the UI.