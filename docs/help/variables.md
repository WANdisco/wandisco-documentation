---
id: variables
title: Variables
sidebar_label: Variables
---

Many variables are used throughout our documentation. Below you will find a list of the variables with an explanation of their usage.

## Variables

### &lt;ihc-version&gt;

The IHC distribution version of the zone, this is referenced in all IHC service scripts.

- Example of value: `hdp_2_6_5`
- Example of usage: `service fusion-ihc-server-<ihc-version> restart`
- Where to find: `/etc/init.d` directory on the LiveData Plane server.

### &lt;fusion-version&gt;

The version of LiveData Plane, this may include the distribution version within the value.

- Example of value: `2.14.2.2.2.6.5`
- Example of usage: `ls -l /opt/cloudera/parcels/FUSION-<fusion-version>-cdh5.16.1-el7/lib/`

### &lt;hadoop-username&gt;

The Hadoop username that is used or defined in HCFS/HDFS environments.

- Example of value: `hive`
- Example of usage: `hdfs dfs -ls /user/<hadoop-username>`

### &lt;cluster-name&gt;

The Hadoop cluster name.

- Example of value: `CLUSTER-01`
- Example of usage: `curl -u admin:password -H "X-Requested-By: ambari" http://ambari.server.com:8080/api/v1/clusters/CLUSTER-01/hosts/`
- Where to find: Cluster manager UI or API.

### &lt;hdp-version&gt;

The Hortonworks (HDP) version string used on a HDP node's filesystem.

- Example of value: `2.6.5.0-292`
- Example of usage: `ls -l /usr/hdp/<hdp-version>/spark/lib/`

### &lt;cdh-version&gt;

The Cloudera (CDH) version string used on a CDH node's filesystem.

- Example of value: `6.1.0-1.cdh6.1.0.p0.770702`
- Example of usage: `ls -l /opt/cloudera/parcels/CDH-<cdh-version>/jars/`

### &lt;hdi-version&gt;

The HDInsight (HDI) version.

- Example of value: `3.6`
- Example of usage: `scp fusion-hcfs-azure-hdi-<hdi-version>-client-hdfs_2.14.2.2-2977_all.deb hdi_node:/downloads/`
- Where to find: [Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning)

### &lt;hadoop-version&gt;

The underlying Hadoop version, this is often used on MapR filesystems.

- Example of value: `hadoop-2.7.0`
- Example of usage: `ls -l /opt/mapr/hadoop/<hadoop-version>/etc/hadoop/`
- Where to find: [MapR documentation](https://mapr.com/docs/61/ReferenceGuide/hadoop-version.html)

### &lt;docker-hostname&gt;

The hostname or IP address of the Docker host.

- Example of value: `docker-hostname.01.com`
- Example of usage: `ssh <docker-hostname>`

### &lt;container-name&gt;

The name assigned to the docker container.

- Example of value: `fusion-oneui-server`
- Example of usage: `docker exec -it <container-name> bash`
- Where to find: Output of `docker container ls -a` (Names column).

### &lt;service-name&gt;

The service name for a LiveData Plane docker container.

- Example of value: `fusion-ui-server-hdp`
- Example of usage: `docker-compose restart <service-name>`
- Where to find: [List of service names](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/troubleshooting/useful_info#service-names)

### &lt;zone-name&gt;

The zone name of a LiveData Plane environment.

- Example of value: `hdp`
- Example of usage: `fusion-server-<zone-name>`
- Where to find: Output of `docker container ls -a` (Names column).
