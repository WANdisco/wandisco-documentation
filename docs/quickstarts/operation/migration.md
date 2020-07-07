---
id: migration
title: Start a Migration
sidebar_label: Start a Migration
---

:::note
You must have the [LiveMigrator](http://docs.wandisco.com/bigdata/wdfusion/plugins/live-migrator/6.0/) plugin installed as part of your deployment.
By default, all pre-configured environments (through Docker) have the LiveMigrator plugin installed.
:::

Once you have created a [HCFS replication rule](./create-rule.md#hcfs) you can start a migration using the LiveMigrator. This allows you to migrate data in a single pass while keeping up with all changes to your source storage. The outcome is guaranteed data consistency between source and target. As data is being migrated it is immediately ready to be used, without interruption.

On the dashboard, view the HCFS rule that you want to start migrating.

You will need to configure the **overwrite settings**. This determines what happens if the LiveMigrator encounters content in the target path with the same name and size.

- Skip - If the filesize is identical between the source and target, the file is skipped. If it’s a different size, the whole file is replaced.

- Overwrite - Everything is replaced, even if the file size is identical.  
  Either files are always overwritten, or they are only overwritten if their timestamp is after a time you specify. This time must be set in UTC.

Check the details are correct and **Start Migration**.
