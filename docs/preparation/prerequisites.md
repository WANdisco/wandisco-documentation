---
id: prerequisites
title: Prerequisites
sidebar_label: Prerequisites
---

LiveData Plane is made up of the following core components:

* LiveData Plane Service
  * LiveData Plane Server
  * Inter-Hadoop Communication (IHC) Server
* NameNode Proxy _or_ LiveData Plane Client
* LiveData UI

Find out the prerequisites for each component in the following sections.

## LiveData Plane Service

The LiveData Plane Server and IHC Server are co-located on each node. The LiveData Plane Service can be installed on up to three nodes for each environment.

:::note
If installing on an Hadoop cluster, root access is required on the cluster manager node to install stacks/parcels.
:::

The following prerequisites are required on each LiveData Plane Service node:

* Linux operating system
  * See the [release notes](tba) for a list of supported operating systems.
* Root or sudo access.
* Java 1.8 64-bit.
* System user and group for running the LiveData Plane services.
  * Minimum 64000 ulimits (hard & soft) for maximum number of processes (`nproc`) and maximum number of open files (`nofile`).
* If installing on an Hadoop cluster:
  * The HDFS client/gateway must be installed on the node.
  * Ability to authenticate as the [HDFS superuser](https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsPermissionsGuide.html#The_Super-User) (for example: `hdfs`).
  * If Kerberos is enabled on your Hadoop cluster, a valid keytab containing a suitable principal for the HDFS superuser must be available on the Linux host.

### Service host specification

* 16 CPUs
* 32 GB RAM
* 750 GB storage (SSD-backed volumes)
  * 500 GB for the `/opt/wandisco` directory.
  * 250 GB for the `/var/log/fusion` directory.
  * Minimal storage required for the `/etc/fusion/conf` and `/var/run/fusion` directories.
* 500 Mbps minimum network. Your network bandwidth must be able to cope with transferring data and ongoing changes from your source zone.
  * See [bandwidth considerations](../reference/concepts/bandwidth_considerations.md) for more detailed advice on data sizes vs bandwidth.

## Hadoop cluster interaction

LiveData Plane offers two choices for interacting with an Hadoop cluster: NameNode Proxy or LiveData Plane Client.

### NameNode Proxy

Install an additional service on the LiveData Plane Service host(s).

The NameNode Proxy intercepts HDFS write requests to the local NameNode. If the write request is within a replicated path, LiveData Plane replicates it on the target zone(s). The local write request also passes through to the local NameNode.

The following prerequisites are required for the NameNode Proxy host:

* The NameNode Proxy should be co-located on the LiveData Plane Service node(s).
  * A maximum of two NameNode Proxies can be installed on a cluster.
* System user and group for running the NameNode Proxy service must match the NameNode user and group.
  * The ulimits for the NameNode Proxy system user must match that of the NameNode(s) user for the cluster.
  * If Kerberos is enabled on your Hadoop cluster, a valid keytab containing a suitable principal for the NameNode Proxy must be available on the Linux host. The principal for the NameNode Proxy must map to the NameNode user after [auth_to_local](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SecureMode.html#Mapping_from_Kerberos_principals_to_OS_user_accounts) rules.

### LiveData Plane Client

Install a client/gateway on every node in the cluster that has a HDFS client/gateway installed.

The LiveData Plane Client redirects HDFS write requests to the LiveData Plane Service. If the write request is within a replicated path, LiveData Plane replicates it on the target zone(s). The local write request also passes through to the local NameNode.

There are no prerequisites required for the LiveData Plane Client.

## LiveData UI

The LiveData UI can be installed on one of the Hadoop edge nodes or an independent host. Only one host is required for the UI.

The following prerequisites are required on the machine that will host the UI:

* Linux operating system
  * See the [release notes](tba) for a list of supported operating systems.
* Root or sudo access.
* Java 1.8 64-bit.
* Port `8081` accessible on your host machine to access the UI through a web browser.
* Network connectivity to LiveData Plane servers.
  * Your host machine must have access to the API port on each LiveData Plane server host. The default API port is `8082` for HTTP connections, and `8084` for HTTPS connections.

### UI host specification

**TBC**

* 4 CPUs
* 4 GB RAM
* 100 GB storage (SSD-backed volumes)

## Download

Download the LiveData Plane packages from our [customer download portal](https://customer.wandisco.com/) and upload to the designated hosts. You will need a WANdisco license key to access the customer download portal.

## Next steps

Check the [network requirements](./network-requirements.md) for LiveData Plane.
