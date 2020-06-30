---
id: adlsg1-adlsg2
title: ADLS Gen1 to ADLS Gen2
sidebar_label: ADLS Gen1 to ADLS Gen2
---

Use this quickstart if you want to configure Fusion to replicate from ADLS Gen1 to ADLS Gen2 storage.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with ADLS Gen1 and ADLS Gen2 storage.

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* ADLS Gen1 storage account.
* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **16 vcpus, 32 GiB memory** (e.g. [Standard F16s v2](https://docs.microsoft.com/en-us/azure/virtual-machines/fsv2-series?toc=/azure/virtual-machines/linux/toc.json&bc=/azure/virtual-machines/linux/breadcrumb/toc.json)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal (and not via our [guide](../preparation/azure_vm_creation.md)), you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following services must be installed on the VM:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* ADLS Gen1 storage account details:
  * [Hostname / Endpoint](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#create-a-data-lake-storage-gen1-account) (Example: `<account-name>.azuredatalakestore.net`)
    * The following [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/dls/account?view=azure-cli-latest#az-dls-account-list) command will get a list of Data Lake Store accounts and endpoints:
    `az dls account list --output table`
  * [Home Mount Point / Directory](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#createfolder) (Example: `/` or `/path/to/mountpoint`)
    * Fusion will be able to read and write to everything contained within the Mount Point.
  * [Client ID / Application ID](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) (Example: `a73t6742-2e93-45ty-bd6d-4a8art6578ip`)
  * [Refresh URL](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/v1-oauth2-on-behalf-of-flow#service-to-service-access-token-request) (Example: `https://login.microsoftonline.com/<tenant-id>/oauth2/token`)
    * The `<tenant-id>` is a value given to the service principal during creation, see the [Microsoft docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) for how to retrieve this.
  * [Handshake User / Service principal name](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-azure-active-directory-application) (Example: `fusion-app`)
  * [ADL credential / Application secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret) (Example: `8A767YUIa900IuaDEF786DTY67t-u=:]`)

* ADLS Gen2 storage account details:
  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Access key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

1. Change to the repository directory:

   `cd fusion-docker-compose`

1. Run the setup script:

   `./setup-env.sh`

1. Choose the `ADLS Gen1 to Gen2` option when prompted.

1. You have now completed the setup. To create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Configure the ADLS Gen1 storage

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **ADLS GEN1** storage, and select the **ADLS Gen1** storage type.

1. Fill in the details for your ADLS Gen1 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

### Configure the ADLS Gen2 storage

1. Click on the **Settings** cog for the **ADLS GEN2** storage, and select the **ADLS Gen2** storage type.

1. Fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

1. Check the **Use Secure Protocol** box.

1. Click **Apply Configuration** and wait for this to complete.

## Migration

Follow the steps below to demonstrate the migration of data from your ADLS Gen1 to Gen2 storage.

### Get sample data

Upload sample data to your ADLS Gen1 storage account, see the [Microsoft docs](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#uploaddata) for guidance.

You can get the sample data from the link below:

[customer_addresses_dim.tsv.gz](https://github.com/pivotalsoftware/pivotal-samples/raw/master/sample-data/customer_addresses_dim.tsv.gz)

Place it within your **Home Mount Point** (see [info you will require](#info-you-will-require) for reference).

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/`
* Default exclusions
* Preserve HCFS Block Size = *False*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following settings:

   * Source Storage = **adls1**
   * Target Storage = **adls2**
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your ADLS Gen2 container.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

_You have now successfully migrated data from your ADLS Gen1 to your ADLS Gen2 storage using LiveMigrator._

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

_Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._
