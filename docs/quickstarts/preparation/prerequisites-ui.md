---
id: prerequisites-ui
title: Prerequisites
sidebar_label: Prerequisites
---

## Prerequisites

The following prerequisites are required on the machine that will host the management UI:

* Linux operating system (CentOS/RHEL-based, Debian-based or SUSE Linux).
* Root or sudo access on your host machine.
* Java 1.8 64-bit.
* Port `8081` accessible on your host machine (to access the UI through a web browser).
* Network connectivity to existing LiveData Plane servers.
  * Your host machine must have access to the API port on each LiveData Plane server host.
  * The default API port is `8082` for HTTP (non-SSL) connections, and `8084` for HTTPS (SSL enabled) connections.

### Existing deployments

To connect to existing deployments, LiveData Plane 2.15.5 (or later) must be pre-installed as guided in our product manual - [silent installation guide](https://docs.wandisco.com/bigdata/wdfusion/#_silent_installation).

#### Supported Platforms

[//]: <This may be replaced with a link to the release notes for LiveData Plane 2.15.5.>

* AWS S3
* Azure: WASB, ADLS Gen1, ADLS Gen2
* Cloudera
* Hortonworks

Check the release notes for your version of LiveData Plane for which CDH/HDP versions are supported (example for [LiveData Plane 2.15.2](https://community.wandisco.com/s/article/WANdisco-Fusion-Release-2-15-2)).

#### Migrations

Perform migrations using the UI by purchasing and installing the [LiveMigrator plugin](https://docs.wandisco.com/bigdata/wdfusion/plugins/live-migrator/6.0) on your existing LiveData Plane deployment.

## Download UI package

Download the UI package and transfer to your host machine. You will need your license key to access our [customer download portal](https://customer.wandisco.com/).

## Next steps

Follow our guide to [install](../installation/install-ui.md) the UI.