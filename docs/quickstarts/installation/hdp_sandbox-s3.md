---
id: hdp_sandbox-s3
title: Hortonworks (HDP) Sandbox to AWS S3
sidebar_label: HDP Sandbox to AWS S3
---

Use this quickstart to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an AWS S3 bucket.

What this guide will cover:

- Installing WANdisco Fusion and a HDP Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with AWS S3.

If you would like to try something different with the HDP Sandbox, see:

* [HDP Sandbox to ADLS Gen2](./hdp_sandbox-adlsg2.md)

## Prerequisites

:::info
For more information about to create a suitable VM with all services installed, see our [AWS VM creation](../preparation/aws_vm_creation.md) guide. See our [VM Preparation](../preparation/vm_prep.md) guide for how to install the services only.|
:::

To complete this install, you will need:

* AWS S3 bucket.
  * Only [regions that support Signature Version 2](https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html) are currently supported.

* Linux Virtual Machine (e.g. AWS EC2 instance).
  * Minimum size recommendation = **4 vcpus, 32 GiB memory** (e.g. [r5.xlarge](https://aws.amazon.com/ec2/instance-types/)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.

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

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

1. Change to the repository directory:

   `cd fusion-docker-compose`

1. Run the setup script:

   `./setup-env.sh`

1. Choose the `HDP Sandbox to S3` option when prompted.

1. You have now completed the setup, to create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Check HDP services are started

The HDP Sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:

1. Log in to Ambari via a web browser.

   `http://<dockerhost_IP_address>:8080`

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

Follow our [HDP Sandbox LiveMigrator testing guide](../testing/test-hdp-sandbox-livemigrator.md) to perform a sample data migration.

### Replication

Follow our [HDP Sandbox LiveData testing guide](../testing/test-hdp-sandbox-livedata.md) to perform live replication of data.

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/hdp_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.

## Reference architecture

![Architecture: HDP Sandbox to S3](/wandisco-documentation/img/arch_hdp_sandbox_s3.jpg)

1. If a HDFS write request is on a path that matches a HCFS rule, the Fusion Server in the HDP zone will coordinate with the Fusion Server in the S3 zone (read requests are passed through to HDFS).
1. HDFS writes/changes are then read by the Fusion IHC in the HDP zone, and replicated to the Fusion Server in the S3 zone.
1. The Fusion Server in the S3 zone will transform the HDFS data to equivalent S3 bucket changes.