---
id: a
title: A
sidebar_label: A
---

## Acceptor
The recipient node for an incoming Agreement message initiated by a Proposer. It is a Paxos term used in content distribution for a node that can vote on the order in which replicated changes will play out.

## Agreement
Each step that the DConE replicated state machine executes is called an agreement.

## Agreement Manager
Individual agreement steps of the replicated state machine are executed under the purview of one or more Agreement Managers.

## Amazon Web Services (AWS)
AWS is a subsidiary of Amazon.com which provides cloud computing platforms on a subscription basis. LiveData Plane can be run on this platform.

## Ambari
It is an open source management platform for provisioning, managing, monitoring and securing Apache Hadoop clusters.
Ambari is also a fibre which is quite similar to jute!

## AMQP
Advanced Message Queuing Protocol

## Apache Kafka
A fast, scalable, fault-tolerant messaging system.
Kafka is often used in place of traditional message brokers like JMS and AMQP because of its higher throughput, reliability and replication.
Kafka works in combination with Apache Storm, Apache HBase and Apache Spark for real-time analysis and rendering of streaming data.

## API
Application Program Interface.

## Azure
Azure is Microsoft’s cloud computing platform, a growing collection of integrated services-analytics, computing, database, mobile, networking, storage, and web-for moving faster, achieving more, and saving money.

## Azure resource group
Applications are typically made up of many components, for example a web app, database, database server, storage, and 3rd party services. Azure Resource Manager (ARM) enables you to work with the resources in your application as a group, referred to as an Azure Resource Group. You can deploy, update, monitor or delete all of the resources for your application in a single, coordinated operation. You use a template for deployment and that template can work for different environments such as testing, staging and production. You can clarify billing for your organization by viewing the rolled-up costs for the entire group. For more information, see Azure Resource Manager Overview.

## Azure Blob storage
Azure Blob storage is a robust, general-purpose storage solution that integrates with HDInsight. Through the WASB driver and the WebWasb (WebHDFS over WASB) interface, the full set of components in HDInsight can operate directly via standard Hadoop DFS tools (command line, File System Java API) on structured or unstructured data in Blob storage.

There are several benefits associated with using Azure Blob Storage as the native file system:

* Storing data in Blob storage enables users to safely delete the HDInsight clusters that are used for computation without losing user data.
* Data reuse and sharing
* Data storage cost

Although there is an implied performance cost of not co-locating computer clusters and storage resources, this is mitigated by the way the compute clusters are created close to the storage account resources inside the Azure datacenter, where the high-speed network makes it very efficient for the compute nodes to access the data inside Azure Blob storage. For more information, see Use Azure Blob storage with Hadoop in HDInsight.

### Address files in Blob storage
HDInsight uses Azure Storage Blob through the WASB(S) driver. Azure Blob storage is transparent to users and developers. To access the files on the default storage account, you can use one of the following syntax:

```text
/example/jars/hadoop-mapreduce-examples.jar
wasb:///example/jars/hadoop-mapreduce-examples.jar
wasb://mycontainer@myaccount.blob.core.windows.net/example/jars/hadoop-mapreduce-examples.jar
```

If the data is stored outside the default storage account, you must link to the storage account at the creation time. The URI scheme for accessing files in Blob storage from HDInsight is:

```text
wasb[s]://<BlobStorageContainerName>@<StorageAccountName>.blob.core.windows.net/<path>
wasb[s]: The URI scheme provides unencrypted access (with the wasb: prefix) and SSL encrypted access (with wasbs).
```

We recommend using wasbs wherever possible, even when accessing data that lives inside the same datacenter in Azure.

* `<BlobStorageContainerName>`: Identifies the name of the container in Azure Blob storage.
* `<StorageAccountName>`: Identifies the Azure Storage account name. An FQDN is required.
* `<path>`: is the file or directory HDFS path name. Because containers in Azure Blob storage are simply key-value stores, there is no true hierarchical file system. A slash character ( / ) inside a blob key is interpreted as a directory separator. For example, the blob name for `hadoop-mapreduce-examples.jar` is:
```text
example/jars/hadoop-mapreduce-examples.jar
```
When working with blobs outside of HDInsight, most utilities do not recognize the WASB format and instead expect a basic path format, such as `example/jars/hadoop-mapreduce-examples.jar`.
Best Practices for using blob storage with HDInsight:

* Don’t share a default container between two live clusters. This is not a supported scenario.
* Re-use the default container to reuse the same root path on a different cluster.
* Use additional linked storage account for user data.
