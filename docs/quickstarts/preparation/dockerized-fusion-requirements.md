---
id: dockerized-fusion-requirements
title: Dockerized Fusion Requirements
sidebar_label: Requirements
---

## Before you begin

Select your [pre-configured environment](../installation/installation-quickstarts.md) before running through these instructions.

All Dockerized Fusion environments require a host machine that meets minimum specifications, and each pre-configured environment may vary in the minimum specification needed.

## Create a host machine

Create a suitable host with all packages installed:

* [Create an AWS Virtual Machine](./aws_vm_creation.md)
* [Create an Azure Virtual Machine](./azure_vm_creation.md)

Alternatively, create and use one of your own hosts and install the required packages.

### Host specifications

Ensure that the host meets the minimum size recommendation specified in the installation guides for Dockerized Fusion.

For example, the [HDP Sandbox to ADLS Gen2 with LiveMigrator](../installation/hdp_sandbox-adlsg2_lm.md#prerequisites) guide requires the following:

* 8 cpus.
* 32 GiB memory.
* 24 GB storage for the `/var/lib/docker` directory.
* Recommended Operating System = **Ubuntu 18.04 LTS**.

### Host packages

The required packages are as follows:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
* [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

For help installing the required packages on Ubuntu 18.04, see the [VM Preparation](./vm_prep.md) guide.

## Next steps

Once you have a suitable host with all packages installed, [deploy the pre-configured environment](../installation/installation-quickstarts.md).
