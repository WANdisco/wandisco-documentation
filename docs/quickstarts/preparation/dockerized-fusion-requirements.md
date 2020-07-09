---
id: dockerized-fusion-requirements
title: Dockerized Fusion Requirements
sidebar_label: Requirements
---

## Before you begin

Choose one of the [quickstart guides](../installation/installation-quickstarts.md) before running through these instructions.

All Dockerized Fusion environments require a host machine that meet minimum specification, and each guide may vary in the minimum specification needed.

## Create a host machine

Follow one of our creation guides to create a suitable host with all packages installed:

* [AWS VM Creation](./aws_vm_creation.md)
* [Azure VM Creation](./azure_vm_creation.md)

Alternatively, create or use one of your own hosts and install the required packages.

### Host specifications

Ensure that the host meets the minimum size recommendation specified in the installation guides for Dockerized Fusion.

For example, the [HDP Sandbox to ADLS Gen2 with LiveMigrator](../installation/hdp_sandbox-adlsg2_lm.md#prerequisites) guide requires the following minimum specification:

* 8 cpus.
* 32 GiB memory.
* 24 GB storage for the `/var/lib/docker` directory.
* Recommended Operating System = **Ubuntu 18.04 LTS**.

### Host packages

The required packages are as follows:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
* [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

For help installing the required packages on Ubuntu 18.04, use our [VM Preparation](./vm_prep.md) guide.

## Next steps

Once you have a suitable host with all packages installed, follow your chosen [quickstart guide](../installation/installation-quickstarts.md) to deploy the pre-configured environment.