---
id: hdp_sandbox_lhv_client-adlsg2_lan
title: Hortonworks (HDP) Sandbox to Azure Databricks with LiveAnalytics
sidebar_label: HDP Sandbox to Azure Databricks with LiveAnalytics
---

Use this quickstart to configure LiveData Plane to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an Azure Databricks cluster.

This uses the [WANdisco LiveAnalytics](https://wandisco.com/products/live-analytics) solution, comprising both LiveData for Databricks and the Hive Plugin.

What this guide will cover:

- Installing LiveData Plane and a HDP Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating LiveData Plane with Azure Databricks.

If you would like to try something different with the HDP Sandbox, see:

* [HDP Sandbox to ADLS Gen2 (HCFS data only)](./hdp_sandbox-adlsg2.md)
* [HDP Sandbox to S3](./hdp_sandbox-s3.md)

## Prerequisites

:::info
For more information about to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
:::

To complete this install, you will need:

* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Databricks cluster.
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

* Credentials for your Azure Databricks cluster:
  * [Databricks Service Address (Instance name)](https://docs.databricks.com/workspace/workspace-details.html#workspace-instance-and-id) (Example: `westeurope.azuredatabricks.net`)
    * As of April 16th 2020, the URL scheme for a new Databricks Workspace will have a format of `adb-<workspace-id>.<random>.azuredatabricks.net`. The URL format for existing Workspaces will stay the same.
  * [Bearer Token](https://docs.databricks.com/dev-tools/api/latest/authentication.html#generate-a-token) (Example: `dapibe21cfg45efae945t6f0b57dfd1dffb4`)
  * [Databricks Cluster ID](https://docs.databricks.com/workspace/workspace-details.html#cluster-url) (Example: `0234-125567-cowls978`)
  * [JDBC/ODBC HTTP path](https://docs.databricks.com/bi/jdbc-odbc-bi.html#construct-the-jdbc-url) (Example: `sql/protocolv1/o/8445611090456789/0234-125567-cowls978`)

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup LiveData Plane

1. Clone the LiveData Plane docker repository:

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

   `http://<dockerhost_IP_address>:8080`

   Username: `admin`
   Password: `admin`

1. Select the **HDFS** service.

1. Wait until all the HDFS components are showing as **Started**.

### Configure the ADLS Gen2 storage

1. Log in to the UI via a web browser.

   `http://<dockerhost_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **ADLS GEN2** storage, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Check the **Use Secure Protocol** box.

1. Click **Apply Configuration** and wait for this to complete.

### Configure LiveData for Databricks

1. Click on the **Settings** cog in the **ADLS GEN2** storage, and fill in the details for your Databricks cluster. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Activate** and wait for the status to show as **Active** before continuing.

## Next steps

Follow our [HDP Sandbox LiveAnalytics testing guide](../testing/test-hdp-sandbox-liveanalytics.md) to replicate to your Databricks cluster.

## Troubleshooting

* If you are unable to access the Ambari or LiveData Plane UI, you may need admin assistance with your network configuration. See our [Azure specific troubleshooting](../troubleshooting/general_troubleshooting.md#unable-to-access-ambari-cloudera-or-fusion-ui-on-vm) section for more detail.

* See our [Troubleshooting](../troubleshooting/hdp_sandbox_troubleshooting.md) guide for help with this install.

* See the [shutdown and start up](../operation/hdp_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.

## Reference architecture

![Architecture: HDP Sandbox to Azure Databricks with LiveAnalytics](/wandisco-documentation/img/arch_hdp_sandbox_az_databricks_lan.jpg)

1. Live Hive Proxy will intercept and co-ordinate the Hive request with the LiveData Plane Server on the HDP zone.
1. If the request is on a database/table that matches a Hive rule, the LiveData Plane Server in the HDP zone will coordinate with the LiveData Plane Server in the ADLS Gen2 zone (read requests are passed through to Hive). Metadata is replicated from the HDP zone to the ADLS Gen2 zone.
1. Any related HDFS data writes/changes are read by the IHC Server in the HDP zone, and replicated to the LiveData Plane Server in the ADLS Gen2 zone.
1. The LiveData Plane Server in the ADLS zone will transform the Hive metadata to equivalent changes on the Azure Databricks Delta Lake tables.
1. The LiveData Plane Server in the ADLS zone will transform the HDFS data to equivalent ADLS Gen2 storage changes.
1. The ADLS Gen2 storage changes are then pushed to the Databricks cluster automatically through LiveData Plane's ETL library (installed on the Databricks cluster).