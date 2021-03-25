---
id: migration_replication
title: Migration vs. Replication
sidebar_label: Migration vs. Replication
---

LiveData Plane provides the [LiveMigrator plugin](https://wandisco.com/products/live-migrator) as part of its standard Dockerized deployment. This allows you to conduct bulk migrations as well as continual live replication on selected paths.

## What is a Migration?

LiveMigrator allows you to migrate data in a single pass while keeping up with all changes occurring in the source zone. This results in guaranteed consistency between source and target at the completion of the migration.

LiveMigrator uses a single scan iterator which visits every source file once and once only, replicating data from the source to the target zone. This ensures the target has a complete copy of the data. If data is changed which the iterator hasn’t seen yet then the change will simply be picked up when the iterator reaches that content and replicated to the target environment. If changes occur in an area which has already been scanned by the iterator then LiveMigrator transfers the change as soon as it occurs. The result is a completely consistent data copy at the end of migration.
You can manually trigger a migration whenever you are ready to begin.

## What is Replication?

Replication is the standard functionality provided by the LiveData Plane software. LiveData Plane provides the capability of active file transfers to and from source and target filesystems. Replication occurs once a specific path in a filesystem is associated as a [replication rule](./concepts_replication_rules.md).

Client requests are intercepted by the LiveData Plane Client. This sends the requests to the LiveData Plane Server and coordinates it with the associated LiveData Plane servers in its ecosystem. The LiveData Plane Servers will then run those operations on their configured filesystem(s). This action is called replication and unlike migrations it is automatically enabled once a replication rule is defined.

## When should I use them?

How you choose to use LiveData Plane will depend on your [deployment model](./deployment_models.md).

For a Migration, you may only need to perform a one-time transfer of data from a source to a target filesystem. As such, a migration using LiveMigrator will be required to perform this task.

For a Disaster Recovery or Hybrid Cloud, if you have existing data on source, you will need to transfer it first using LiveMigrator. Once the migration
is complete, live data replication can then be used to keep the data in sync between source and target filesystems.
