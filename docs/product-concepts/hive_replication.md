---
id: hive_replication
title: Hive Replication & Databricks Integration
sidebar_label: Hive Replication & Databricks Integration
---

## Overview

WANdisco offers two plugins that can be used together to implement a LiveAnalytics solution.

The Fusion Plugin for Live Hive provides a method of replicating Hive metadata and the Fusion Plugin for Databricks Delta Lake is used with WANdisco Fusion to transform this data so that it is compatible with the Spark-based cloud analytics platform that Databricks provides.

The Fusion Plugin for Live Hive can also be used as a standalone plugin in multiple Fusion environments, allowing Hive metadata replication to occur between Hadoop zones.

## Fusion Plugin for Live Hive

WANdisco Fusion provides a method of replicating Hive metadata with the Fusion Plugin for Live Hive. The deployment of this plugin includes the installation of the Live Hive plugin and the Live Hive proxy.

The Live Hive Proxy service coordinates actions performed by client applications that interact with the Hive Metastore. This could either be directly using its thrift interface, or indirectly via another client application (such as [Beeline](https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Clients#HiveServer2Clients-Beeline%E2%80%93CommandLineShell)).

The Live Hive Proxy passes on read commands directly to the local Hive Metastore, and coordinates any write commands with the Fusion Plugin for Live Hive, so all metastores on all environments within the replicated ecosystem will perform the write operations (e.g. database/table creation).

Live Hive will automatically start to replicate Hive databases and tables when their names match a user defined rule. This must also include a matching HCFS rule for the underlying filesystem data of the database/table.

![Live Hive Replication - workflow example](../assets/arch_live_hive.png)

1. Write access needs to be coordinated by Fusion before executing the command on the Hive Metastore.
1. Read commands are 'passed-through' straight to the Hive Metastore as they do not need to be coordinated via Fusion.
1. Fusion makes a connection to the Hive Metastore on the cluster and coordinates any write requests with the rest of the replicated ecosystem.

## Fusion Plugin for Databricks Delta Lake

The Fusion Plugin for Databricks Delta Lake works in conjunction with WANdisco Fusion and the Fusion Plugin for Live Hive to deliver WANdisco’s LiveAnalytics solution.

When Hive tables are created in the source Hadoop zone, the Fusion Plugin for Databricks Delta Lake will create replicas of those tables in [Databricks](https://docs.databricks.com/getting-started/overview.html). Modify Hive schemas and see the same structure reflected in changes to matching Delta Lake tables.

Data ingestion to Hive tables is also replicated to the Databricks cluster, which allows you to access the same information as Delta Lake content in a Databricks environment.

## LiveAnalytics deployment overview

A deployment consists of two zones:

**Zone 1**  
This represents the source environment, where your [Apache Hive](https://hive.apache.org/) content and metadata reside. Your table content will reside in the cluster storage (typically HDFS), and your Hive metadata are managed by and maintained in a Hive Metastore. An operational deployment of a LiveAnalytics solution will include:  
* WANdisco Fusion
* Fusion Plugin for Live Hive

**Zone 2**  
This is the target environment, where your [Databricks](https://docs.databricks.com/getting-started/overview.html) instance is available. Hive content from Zone 1 will be replicated to cloud storage and transformed to the format used by Delta Lake. Metadata changes made to Hive tables in Zone 1 will be replicated to equivalent changes to Databricks Delta Lake tables. An operational deployment of the solution will include:  
* WANdisco Fusion
* Fusion Plugin for Databricks Delta Lake
