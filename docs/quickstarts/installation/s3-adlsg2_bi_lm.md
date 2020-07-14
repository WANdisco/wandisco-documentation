---
id: s3-adlsg2_bi_lm
title: AWS S3 and Azure Data Lake Storage Gen2 with LiveMigrator
sidebar_label: AWS S3 & ADLS Gen2 with LiveMigrator
---

Use this quickstart if you want to configure Fusion to migrate data from an AWS S3 bucket to an ADLS Gen2 container, or vice versa, using WANdisco LiveMigrator. 
The set up is the same for either scenario, just choose the direction when starting your migration.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with AWS S3 and ADLS Gen2 storage.
- Performing sample data migrations in both directions.

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation.md) or [AWS VM creation](../preparation/aws_vm_creation.md) guides. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* AWS S3 bucket.
  * Only [regions that support Signature Version 2](https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html) are currently supported.

* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Linux Virtual Machine (e.g. AWS EC2 instance, Azure VM, etc).
  * Minimum size recommendation = **4 vcpus, 16 GiB memory** (e.g. [r5.xlarge](https://aws.amazon.com/ec2/instance-types/), [Standard_D4s_v3](https://docs.microsoft.com/en-us/azure/virtual-machines/dv3-dsv3-series?toc=/azure/virtual-machines/linux/toc.json&bc=/azure/virtual-machines/linux/breadcrumb/toc.json#dv3-series)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal (and not via our [guide](../preparation/azure_vm_creation.md)), you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following services must be installed on the VM:  
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* AWS S3 details:

  * [Bucket name](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) (Example: `fusion-bucket`)
  * [Bucket region](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) (Example: `eu-west-1`)
  * [Access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) (Example: `AOIPUFY7ETYAHBCYT765`)
  * [Secret key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) (Example: `TY76eI3no3cdaWghr5tBkzPOP090bcD9c0lqpoL5`)

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

1. Choose the `S3 and ADLS Gen2` option when prompted.

1. You have now completed the setup, to create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Configure the S3 storage

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **s3** storage, and fill in the details for your AWS S3 bucket. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

### Configure the ADLS Gen2 storage

1. Click on the **Settings** cog for the **ADLS GEN2** storage, and fill in the details for your ADLS Gen2 container. See the [Info you will require](#info-you-will-require) section for reference.

1. Check the **Use Secure Protocol** box.

1. Click **Apply Configuration** and wait for this to complete.

## Migration

Follow the steps below to demonstrate migration of HCFS data between the AWS S3 bucket and the ADLS Gen2 container.

### Get sample data

1. Create the following directories to host the sample data:

   * AWS S3 bucket directory = `s3_to_adls2`
     * See the S3 docs ([Amazon console](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-folder.html) / [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/workdocs/create-folder.html)) for guidance.
   * ADLS Gen2 container directory = `adls2_to_s3`
     * See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-explorer#create-a-directory) for guidance.

1. Get the sample data from the link below:  
   [customer_addresses_dim.tsv.gz](https://github.com/pivotalsoftware/pivotal-samples/raw/master/sample-data/customer_addresses_dim.tsv.gz)

1. Upload the data to the directories created earlier on your AWS S3 bucket and ADLS Gen2 container, see the relevant docs for more info:

   * [Amazon S3 console](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html#upload-objects-by-drag-and-drop) / [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html#examples)
   * [ADLS Gen2](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#uploaddata)

### Create replication rules

1. On the dashboard, create a **HCFS** rule with the following parameters:

   * Rule Name = `migration_to_adls2`
   * Path for all storages = `/s3_to_adls2`
   * Default exclusions
   * Preserve HCFS Block Size = *False*

1. Create a second **HCFS** rule with the following parameters:

   * Rule Name = `migration_to_s3`
   * Path for all storages = `/adls2_to_s3`
   * Default exclusions
   * Preserve HCFS Block Size = *False*

### Migrate your data to ADLS Gen2

1. On the dashboard, view the `migration_to_adls2` rule.

1. Start your migration with the following overwrite settings:

   * Source Zone = **s3**
   * Target Zone = **adls2**
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your `s3_to_adls2` directory in your ADLS Gen2 container.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

### Migrate your data to AWS S3

1. On the dashboard, view the `migration_to_s3` rule.

1. Start your migration with the following overwrite settings:

   * Source Zone = **adls2**
   * Target Zone = **s3**
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your `adls2_to_s3` directory in your AWS S3 bucket.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

_You have now successfully migrated data between your AWS S3 bucket and ADLS Gen2 container using LiveMigrator._

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

_Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._
