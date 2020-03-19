---
id: databricks_troubleshooting
title: Troubleshooting Databricks Delta Lake
sidebar_label: Databricks Delta Lake
---

See the [Useful information](./useful_info.md) section for additional commands and help.

[//]: <## Common issues and resolutions>

[//]: <There are no reported issues at present.>

## Rebuild

If you are using Databricks, delete any related databases from your Databricks cluster using your [notebook](https://docs.databricks.com/notebooks/notebooks-use.html#run-notebooks).

For example, if your use case is [HDP Sandbox to Azure Databricks with LiveAnalytics](../installation/hdp_sandbox_lhv_client-adlsg2_lan.md), delete the `databricks_demo` database from your Databricks cluster:

`DROP DATABASE databricks_demo CASCADE;`
