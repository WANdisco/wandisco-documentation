---
id: deployment_models
title: Deployment models
sidebar_label: Deployment models
---

There are numerous use cases for WANdisco Fusion, some of these are explored below.

## Migration

WANdisco Fusion allows you to replicate all your data from an on-premise cluster to cloud-based infrastructure. Fusion supports a variety of on-premise platforms, and is able to replicate seamlessly to multiple cloud vendors.

The migration can happen without impact to your Hadoop operations and cluster activity can be maintained as normal.

Fusion also offers replication for associated Hive metadata that can be ingested into a target metastore, or a [Databricks](https://docs.databricks.com/getting-started/index.html) cluster.

## Disaster Recovery

WANdisco Fusion offers live replication of data between environments, which allows you to safeguard your data from loss. If disaster does occur, the data will be available on your alternative environment(s). This will allow normal operations to proceed regardless of impact on the affected zone.

Fusion also offers replication of security policies used in Hadoop distributions such as Ranger and Sentry. This will help provide consistent interaction between all your environments.

## Hybrid Cloud
Fusion allows you to divide up your workflows across separate environments through live replication. You can ingest data on-premise (or where ever the data is generated) and query it at scale in another optimized environment. For example, a cloud environment with elastic scaling.

When running all your work streams on a single cluster, it requires careful coordination with different types of workloads. By using Fusion, you get more control over each environment's performance as you can split this activity across multiple clusters.

## Backup & Recovery
The [Fusion Backup](https://docs.wandisco.com/bigdata/wdfusion/plugins/fusion-backup/5.0/) plugin allows a zone to be marked for backup purposes on a per-location basis. You can schedule how long to retain a backup as well as the timing and frequency of each backup.

Hadoop compatible file system (HCFS) data is snapshotted and stored within Fusion on designated paths. You can recover the state of a designated path in the file system using standard Hadoop commands.
