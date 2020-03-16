---
id: adlsg1-adlsg2
title: ADLS Gen1 to ADLS Gen2
sidebar_label: ADLS Gen1 to ADLS Gen2
---

Use this quickstart if you want to configure Fusion to replicate from ADLS Gen1 storage to an ADLS Gen2 container.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with the ADLS Gen1 and ADLS Gen2 storage.

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) guide. See our [Azure VM preparation](../preparation/azure_vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* ADLS Gen1 storage account.
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

* ADLS Gen1 storage account details:
  * [Hostname / Endpoint](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#create-a-data-lake-storage-gen1-account) (Example: `fusionstorage.azuredatalakestore.net`)
  * [Home Mount Point / Directory](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#createfolder) (Example: `/` or `/path/to/mountpoint`)
  * [Client ID / Application ID](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) (Example: `a73t6742-2e93-45ty-bd6d-4a8art6578ip`)
  * [Refresh URL](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/v1-oauth2-on-behalf-of-flow#service-to-service-access-token-request) (Example: `https://login.microsoftonline.com/<tenant-id>/oauth2/token`)
    * The `<tenant-id>` is a value given to the service principal during creation, see the [Microsoft docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) for how to retrieve this.
  * [Handshake User / Service principal name](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-azure-active-directory-application) (Example: `fusion-app`)
  * [ADL credential / Application secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret) (Example: `8A767YUIa900IuaDEF786DTY67t-u=:]`)

* ADLS Gen2 storage account details:
  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Account key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

1. Change to the repository directory:

   `cd fusion-docker-compose`

1. Run the setup script:

   `./setup-env.sh`

1. Enter `n` when asked whether to use the Hortonworks Sandbox.

1. Enter the zone details:

   * First zone type = `adls1`
   * First zone name = _press enter for the default value_

   * Second zone type = `adls2`
   * Second zone name = _press enter for the default value_

1. When prompted, press enter to use the default trial license or provide the absolute file system path to your own license on the VM.

   _Example:_  `/home/vm_user/license.key`

1. Enter your docker hostname, which will be the VM hostname.

   _Example:_  `docker_host01.realm.com`

1. Enter the [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) for the ADLS Gen1 zone. This is required even if you are not intending to use a HDI cluster.

1. When prompted to select a plugin for the ADLS Gen1 zone, press enter for `NONE`.

1. Enter the [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) for the ADLS Gen2 zone. This is required even if you are not intending to use a HDI cluster.

1. When prompted to select a plugin for the ADLS Gen2 zone, press enter for `NONE`.

1. You have now completed the setup. To create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Configure the ADLS Gen1 zone

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **adls1** zone, and select the **ADLS Gen1** storage type.

1. Fill in the details for your ADLS Gen1 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

### Configure the ADLS Gen2 zone

1. Click on the **Settings** cog for the **adls2** zone, and select the **ADLS Gen2** storage type.

1. Fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Check the **Use Secure Protocol** box.

1. Click **Apply Configuration** and wait for this to complete.

## Migration

You can now create a [replication rule](../operation/create-rule.md) and then [migrate your data](../operation/migration.md).

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/hdp_sandbox_lan_troubleshooting.md) guide for help.

_Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._
