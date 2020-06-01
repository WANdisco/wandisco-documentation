---
id: cdh_sandbox-adlsg2_ld
title: Cloudera (CDH) Sandbox to ADLS Gen2 with LiveData
sidebar_label: CDH Sandbox to ADLS Gen2 with LiveData
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Cloudera (CDH) Sandbox to an ADLS Gen2 container.

What this guide will cover:

- Installing WANdisco Fusion and a CDH Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with ADLS Gen2 storage.
- Live replication of sample data.

If you would like to try something different with the CDH Sandbox, see:

* [Migration of data to ADLS Gen2](./cdh_sandbox-adlsg2_lm.md)
* [Live replication of data/Hive metadata to Databricks](./cdh_sandbox_lhv_client-adlsg2_lan.md)

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **8 vcpus, 32 GiB memory** (e.g. [Standard D8s v3](https://docs.microsoft.com/en-us/azure/virtual-machines/dv3-dsv3-series#dsv3-series)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal (and not via our [guide](../preparation/azure_vm_creation.md)), you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following packages must be installed on the VM:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* ADLS Gen2 storage account details:

  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Access key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

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

1. Choose the `CDH Sandbox to custom distribution` option when prompted.

1. Enter the second zone details:

   * Second zone type = `adls2`
   * Second zone name = _press enter for the default value_

1. Enter the CDH Sandbox zone details:

   _Examples:_

   * Plugins = `NONE`

1. Enter the ADLS Gen2 zone details:

   _Examples:_

   * [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) = `3.6`
     * This is required even if you are not intending to use a HDI cluster.
   * Plugins = `NONE`

1. You have now completed the setup, to create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Check CDH services are started

The CDH Sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:

1. Log in to Cloudera via a web browser.

   `http://<docker_IP_address>:7180`

   Username: `admin`
   Password: `admin`

1. Select the **HDFS** service.

1. Wait until all the HDFS components are showing as **Started**.

### Configure the ADLS Gen2 storage

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **ADLS GEN2** storage, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Check the **Use Secure Protocol** box.

1. Click **Apply Configuration** and wait for this to complete.

## Replication

Follow the steps below to demonstrate live replication of HCFS data from the CDH Sandbox to the ADLS Gen2 container.

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `replicate`
* Path for all storages = `/testdir`
* Default exclusions
* Preserve HCFS Block Size = *False*

### Test HCFS replication

1. On the terminal for the **Docker host**, upload a test file to the `/testdir` path in HDFS on the **sandbox-cdh** container.

   `docker-compose exec -u hdfs sandbox-cdh hdfs dfs -put /etc/services /testdir/test_file`

1. Check that the `test_file` is now located in your `/testdir` directory on your ADLS Gen2 container.

#### Test large data sets (optional)

If you want to replicate larger amounts of data, see our [CDH Sandbox testing](../testing/test_cdh_sandbox.md) guide.

_You have now set up live replication from your CDH Sandbox to your ADLS Gen2 container. Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._

## Troubleshooting

* If you are unable to access the Cloudera or Fusion UI, you may need admin assistance with your network configuration. See our [Azure specific troubleshooting](../troubleshooting/general_troubleshooting.md#unable-to-access-ambari-cloudera-or-fusion-ui-on-vm) section for more detail.

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/cdh_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.
