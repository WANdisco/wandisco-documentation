---
id: create-rule
title: How to Create a Rule
sidebar_label: Create a Rule
---

Before you can migrate or replicate data, you will need to create [replication rules](../reference/concepts/concepts_replication_rules.md).

From the rules section of the dashboard, you can create a rule. By default, this will be a **HCFS** rule. If you have the Hive Plugin installed, you will also have the **Hive** rule option.

## HCFS

1. Define the rule you wish to create:
   - Give the rule a unique name (i.e. one you haven't used before).
   - Provide the path for all storages. If wanting to **replicate to a different path on target**, select the option and provide the paths for the [source storage](../help/glossary/s.md#source) and [target storage](../help/glossary/t.md#target).
1. Files or directories can be excluded from replication using glob patterns:
   - The default exclusions shown are for LiveData Plane’s housekeeping files, trash directories and Hive staging directories.
   - You can add any other exclusions required.
1. Additional rule options can be applied:
   - **Preserve HCFS Block Size** - Must be enabled when your path contains columnar file formats, such as ORC, Parquet, Avro. These are commonly used in Hadoop for Hive tables.

After a few moments the rule will appear on your dashboard.
You can now perform a [consistency check](./consistency-check.md), or start [migrating](./migration.md) or replicating your data.

## Hive

|Always create a HCFS rule that will match the location of your underlying Hive data. Without this, Hive queries on the target storage will not work.|
|---|

1. Define a unique rule name.
1. Enter the pattern to match the Database(s) that you want to replicate. For example, using the pattern `test*` will match any database that has 'test' at the beginning of its name, such as `test01`, `test02`, `test03`.
1. Following the same method, enter the pattern to match the Table(s) that you want to replicate.

After a few moments the rule will appear on your dashboard.
