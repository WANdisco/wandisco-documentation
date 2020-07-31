---
id: cdh_sandbox-s3_ld
title: Cloudera (CDH) Sandbox to AWS S3 with LiveData
sidebar_label: CDH Sandbox to AWS S3 with LiveData
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Cloudera (CDH) Sandbox to an AWS S3 bucket.

What this guide will cover:

- Installing WANdisco Fusion and a CDH Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with AWS S3.
- Live replication of sample data.

If you would like to try something different with the CDH Sandbox, see:

* [Migration of data to AWS S3](./cdh_sandbox-s3_lm.md)

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [AWS VM creation](../preparation/aws_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
|---|

To complete this install, you will need:

* AWS S3 bucket.
  * Only [regions that support Signature Version 2](https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html) are currently supported.

* Linux Virtual Machine (e.g. AWS EC2 instance).
  * Minimum size recommendation = **4 vcpus, 32 GiB memory** (e.g. [r5.xlarge](https://aws.amazon.com/ec2/instance-types/)).
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

### Setup Fusion

1. Clone the Fusion docker repository:

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

   `http://<docker_IP_address>:7180`

   Username: `admin`
   Password: `admin`

1. Select the **HDFS** service.

1. Wait until all the HDFS components are showing as **Started**.

### Configure the S3 storage

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **s3** storage, and fill in the details for your AWS S3 bucket. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

## Replication

Follow the steps below to demonstrate live replication of HCFS data from the CDH Sandbox to your AWS S3 bucket.

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `replicate`
* Path for all storages = `/testdir`
* Default exclusions
* Preserve HCFS Block Size = *False*

### Test HCFS replication

1. Log in to **Hue** via a web browser.

   `http://<docker_IP_address>:8889`

   Username: `hdfs`
   Password: `hdfs`

1. Go to **Menu** -> **Files**.

1. Move to `/testdir` path and **Upload** any file from your host machine.

1. Check that the file you uploaded is now located in your `/testdir` directory in your AWS S3 bucket.

#### Test large data sets (optional)

If you want to replicate larger amounts of data, see our [CDH Sandbox testing](../testing/test_cdh_sandbox.md) guide.

_You have now set up live replication from your CDH Sandbox to your AWS S3 bucket. Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/cdh_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.
