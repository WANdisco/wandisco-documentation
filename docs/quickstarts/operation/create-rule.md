---
id: create-rule
title: How to Create a Rule
sidebar_label: Create a Rule
---

Before you can migrate or replicate data, a [replication rule](../../glossary/r.md#replication-rules) needs to be created.

From the rules section of the dashboard, you can create a rule. By default, this will be a **HCFS** rule. If you have Live Hive installed, you will also have the **Hive** rule option.

|Always create a HCFS rule that will match the location of your underlying Hive data. Without this, Hive queries on the target zone will not work.|
|---|

## HCFS

1. Define the rule you wish to create:
   - Give the rule a unique name (i.e. one you haven't used before).
   - Provide the path for all zones. If wanting to **replicate to a different path on target**, select the option and provide the paths for the [source zone](../../glossary/s.md#source) and [target zone](../../glossary/t.md#target).
1. Files or directories can be excluded from replication using glob patterns:
   - The default exclusions shown are for Fusion’s housekeeping files, trash directories and Hive staging directories.
   - You can add any other exclusions required.
1. Additional rule options can be applied:
   - **Preserve HCFS Block Size** - Must be enabled when your path contains special file formats, such as ORC, Parquet, Avro.

After a few moments the rule will appear on your dashboard.
You can now perform a [consistency check](./consistency-check.md) or [start migrating](./migration.md) your data.

## Hive

1. Define a unique rule name.
1. Enter the pattern to match the Database(s) that you want to replicate. For example, using the pattern `test*` will match any database that has 'test' at the beginning of its name, such as `test01`, `test02`, `test03`.
1. Enter the pattern to match the Table(s) that you want to replicate. This follows the same principal as the database pattern.

After a few moments the rule will appear on your dashboard.
