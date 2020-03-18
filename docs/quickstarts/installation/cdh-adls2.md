---
id: cdh-adlsg2
title: Cloudera (CDH) to ADLS Gen2
sidebar_label: Cloudera (CDH) to ADLS Gen2
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Cloudera (CDH) cluster to an ADLS Gen2 container.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with the CDH cluster and ADLS Gen2 storage.

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) guide. See our [Azure VM preparation](../preparation/azure_vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* CDH cluster.
  * The [HDFS superuser](https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsPermissionsGuide.html#The_Super-User) must be `hdfs` for the purposes of this quickstart.
* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **Standard D4 v3 (4 vcpus, 16 GiB memory).**
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal (and not via our [guide](../preparation/azure_vm_creation.md)), you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following services must be installed on the VM:  
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* Administrator credentials for your Cloudera manager.

* ADLS Gen2 storage account details:

  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Account key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository to your Azure VM instance:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

1. Change to the repository directory:

   `cd fusion-docker-compose`

1. Run the setup script:

   `./setup-env.sh`

1. Enter `n` when asked whether to use the HDP sandbox.

1. Enter the zone details:

   * First zone type = `cdh`
   * First zone name = _press enter for the default value_

   * Second zone type = `adls2`
   * Second zone name = _press enter for the default value_

1. When prompted, press enter to use the default trial license or provide the absolute file system path to your own license on the VM.

   _Example:_  `/home/vm_user/license.key`

1. Enter your docker hostname, which will be the VM hostname.

   _Example:_  `docker_host01.realm.com`

1. Enter the CDH zone details:

   _Examples:_

   * CDH version = `5.16.0`
     * All minor versions are supported within each version listed (e.g. choose `5.16.0` if you are using `5.16.1`).
   * Active NameNode hostname = `namenode.example.com`
   * Active NameNode port = `8020`
   * NameNode nameservice = `nameservice01`
   * Plugins = `NONE`

1. Enter the ADLS Gen2 zone details:

   _Examples:_

   * [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) = `3.6`
     * This is required even if you are not intending to use a HDI cluster.
   * Plugins = `NONE`

1. You have now completed the setup. To create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Configure the ADLS Gen2 zone

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

2. Click on the **Settings** cog for the **ADLS GEN2** zone, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

3. Check the **Use Secure Protocol** box.

4. Click **Apply Configuration** and wait for this to complete.

## Migration

You can now create a [replication rule](../operation/create-rule.md) and then [migrate your data](../operation/migration.md).

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/hdp_sandbox_troubleshooting.md) guide for help.

_Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._
