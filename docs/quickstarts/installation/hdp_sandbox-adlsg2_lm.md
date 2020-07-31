---
id: hdp_sandbox_adlsg2_lm
title: Hortonworks (HDP) Sandbox to ADLS Gen2 with LiveMigrator
sidebar_label: HDP Sandbox to ADLS Gen2 with LiveMigrator
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an ADLS Gen2 container using WANdisco LiveMigrator.

What this guide will cover:

- Installing WANdisco Fusion and a HDP Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with ADLS Gen2 storage.
- Performing a sample data migration.

If you would like to try something different with the HDP Sandbox, see:

* [Live replication of data to ADLS Gen2](./hdp_sandbox-adlsg2_ld.md)
* [Live replication of data/Hive metadata to Databricks](./hdp_sandbox_lhv_client-adlsg2_lan.md)

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

* The following services must be installed on the VM:
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

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/hdp-adls2.git`

1. Change to the repository directory:

   `cd hdp-adls2`

1. Create and start your containers:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Check HDP services are started

The HDP sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:

1. Log in to Ambari via a web browser.

   `http://<docker_IP_address>:8080`

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

## Migration

Follow the steps below to demonstrate migration of HCFS data from the HDP sandbox to the ADLS Gen2 container.

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/retail_demo`
* Default exclusions
* Preserve HCFS Block Size = *True*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following overwrite settings:

   * Source Storage = **sandbox-hdp**
   * Target Storage = **adls2**
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your `/retail_demo` directory in your ADLS Gen2 container.

   A new directory should exist (`customer_addresses_dim_hive`) with a ~50MB file inside (`customer_addresses_dim.tsv.gz`).

_You have now successfully migrated data from your HDP Sandbox to your ADLS Gen2 container using LiveMigrator. You can now try live replication by following our [LiveData quickstart](./hdp_sandbox-adlsg2_ld.md#replication)._

_Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._

## Troubleshooting

* If you are unable to access the Ambari or Fusion UI, you may need admin assistance with your network configuration. See our [Azure specific troubleshooting](../troubleshooting/general_troubleshooting.md#unable-to-access-ambari-cloudera-or-fusion-ui-on-vm) section for more detail.

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/hdp_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.
