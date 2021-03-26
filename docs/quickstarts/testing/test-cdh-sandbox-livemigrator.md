---
id: test-cdh-sandbox-livemigrator
title: Test CDH Sandbox with LiveMigrator
sidebar_label: LiveMigrator
---

Follow the steps below to demonstrate the migration of HCFS data from your CDH Sandbox to a target storage.

The CDH Sandbox will be the [source](../../help/glossary/s.md#source) storage in all instances.

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/retail_demo`
  * The `/retail_demo` directory on the CDH Sandbox contains sample data.
* Default exclusions
* Preserve HCFS Block Size = *false*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following overwrite settings:

   * Source Zone = **sandbox-cdh**
   * Target Zone = _Choose your target storage_
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your `/retail_demo` directory in your target storage.

   A new directory should exist (`customer_addresses_dim_hive`) with a ~50MB file inside (`customer_addresses_dim.tsv.gz`).

## Next steps

You have now successfully migrated data from your CDH Sandbox to your target storage using LiveMigrator. You can now try live replication by following our [LiveData tutorial](./test-cdh-sandbox-livedata.md).
