---
id: azure_vm_prep
title: Preparing an Azure Linux VM for a Fusion installation
sidebar_label: Azure VM Preparation
---

This quickstart helps you prepare an Azure Linux VM suitable for a Fusion installation using docker. It walks you through:

* Installation of services.
* Verification of available storage for docker images.

|This is not required if you have used our [Azure VM Creation](./azure_vm_creation.md) guide, as all services and disk requirements will have been included.|
|---|

## Prerequisites

* Azure Virtual Machine (VM).
  * Root or sudo access on server (this is normally available by default).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal, you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

_These instructions have been tested on Ubuntu LTS._

## Preparation

### Install services

1. Log in to the VM via a terminal session.

2. Run the command below to install Git.

   `apt-get update && apt install -y git`

3. Run the commands below to install [Docker](https://docs.docker.com/install/) (v19.03.5 or higher).

   `apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common`

   `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -`

   `add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

   `apt-get update && apt install -y docker-ce docker-ce-cli containerd.io`

4. Start the Docker service and verify that it is correctly installed.

   `systemctl start docker`

   `docker run hello-world` - This will print an informational message and exit if docker is running correctly.

   `systemctl enable docker` - This will enable docker to start up automatically on server reboot.

5. Install [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher) by running the commands below.

   `curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

   `chmod +x /usr/local/bin/docker-compose`

   `ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose`

6. Verify that Docker Compose is correctly installed.

   `docker-compose --version`

   _Example output_
   ```json
   docker-compose version 1.25.0, build 0a186604
   ```

### Verify storage for docker images

Verify that there is at least 24GB of disk space available in the `/var/lib/docker` directory.

`df -h /var/lib/docker`

_Example output_

```bash
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        31G    3G   28G  10% /
```
