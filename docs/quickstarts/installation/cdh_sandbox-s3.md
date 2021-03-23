---
id: cdh_sandbox-s3
title: Cloudera (CDH) Sandbox to AWS S3
sidebar_label: CDH Sandbox to AWS S3
---

Use this quickstart to configure LiveData Plane to replicate from a non-kerberized Cloudera (CDH) Sandbox to an AWS S3 bucket.

What this guide will cover:

* Installing LiveData Plane and a CDH Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
* Integrating LiveData Plane with AWS S3.

If you would like to try something different with the CDH Sandbox, see:

* [CDH Sandbox to ADLS Gen2](./cdh_sandbox-adlsg2.md)

## Prerequisites

:::info
For more information about to create a suitable VM with all services installed, see our [AWS VM creation](../preparation/aws_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
:::

To complete this install, you will need:

* AWS S3 bucket.
  * Only [regions that support Signature Version 2](https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html) are currently supported.

* Linux Virtual Machine (e.g. AWS EC2 instance).
  * Minimum size recommendation = **8 vcpus, 32 GiB memory** (e.g. [m5.2xlarge](https://aws.amazon.com/ec2/instance-types/)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.

* The following packages must be installed on the VM:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* AWS S3 details:

  * [Bucket name](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) (Example: `fusion-bucket`)
  * [Bucket region](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) (Example: `eu-west-1`)
  * [Access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) (Example: `AOIPUFY7ETYAHBCYT765`)
  * [Secret key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) (Example: `TY76eI3no3cdaWghr5tBkzPOP090bcD9c0lqpoL5`)

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup LiveData Plane

1. Clone the LiveData Plane docker repository:

   `git clone https://github.com/WANdisco/cdh-s3.git`

1. Change to the repository directory:

   `cd cdh-s3`

1. Create and start your containers:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Check CDH services are started

The CDH Sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:

1. Log in to Cloudera via a web browser.

   `http://<dockerhost_IP_address>:7180`

   Username: `admin`
   Password: `admin`

1. Select the **HDFS** service.

1. Wait until all the HDFS components are showing as **Started**.

### Configure the S3 storage

1. Log in to the UI via a web browser.

   `http://<dockerhost_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **s3** storage, and fill in the details for your AWS S3 bucket. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

## Next steps

### Migration

Follow our [CDH Sandbox LiveMigrator testing guide](../testing/test-cdh-sandbox-livemigrator.md) to perform a sample data migration.

### Replication

Follow our [CDH Sandbox LiveData testing guide](../testing/test-cdh-sandbox-livedata.md) to perform live replication of data.

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/cdh_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.
