---
id: arch_hdp_sandbox_az_databricks_lan
title: Architecture - HDP Sandbox to Azure Databricks with LiveAnalytics
sidebar_label: HDP Sandbox to Azure Databricks with LiveAnalytics
---

![Architecture: HDP Sandbox to Azure Databricks with LiveAnalytics](../../assets/arch_hdp_sandbox_az_databricks_lan.jpg)

1. Live Hive Proxy will intercept and co-ordinate the Hive request with the Fusion Server on the HDP zone.
1. If the request is on a database/table that matches a Hive rule, the Fusion Server in the HDP zone will coordinate with the Fusion Server in the ADLS zone (read requests are passed through to Hive). Metadata is replicated from the HDP zone to the ADLS zone.
1. Any related HDFS data writes/changes are read by the Fusion IHC in the HDP zone, and replicated to the Fusion Server in the ADLS zone.
1. The Fusion Server in the ADLS zone will transform the Hive metadata to equivalent changes on the Azure Databricks Delta Lake tables.
1. The Fusion Server in the ADLS zone will transform the HDFS data to equivalent ADLS storage changes in Azure.
1. The ADLS storage changes are then pushed to the Databricks cluster automatically through Fusion's Datatransformer library (installed on the Databricks cluster).
