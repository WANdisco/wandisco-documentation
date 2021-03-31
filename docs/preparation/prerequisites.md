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
* LiveData UI (management interface)

Find out the prerequisites for each component in the following sections.

## LiveData Plane Service

The LiveData Plane Server and IHC Server are co-located on each node. The LiveData Plane Service can be installed on up to three nodes for each environment.

:::note
If installing on an Hadoop cluster, root access is required on the cluster manager node to install stacks/parcels.
:::

The following prerequisites are required on each LiveData Plane Service node:

* Linux operating system
  * See the [release notes](tba) for a list of supported operating systems.
* Java 1.8 64-bit.
* System user and group for running the LiveData Plane services.
  * Minimum 64000 ulimits (hard & soft) for number of processes (nproc) and number of open files (nofile).
* If installing on an Hadoop cluster:
  * Hadoop client libraries must be installed.
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

TBC

## Download

Download the LiveData Plane packages from our [customer download portal](https://customer.wandisco.com/) and upload to the designated hosts.

## Next steps

Follow our guide to [install](../installation/install-ui.md) LiveData Plane.
