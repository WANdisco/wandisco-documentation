---
id: useful_info
title: Useful information
sidebar_label: Useful information
---

## Reference links

### [Docker installation guide](https://docs.docker.com/install/)

### [Docker Compose installation guide](https://docs.docker.com/compose/install/)

### [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Useful commands

### Container

Build, create and start containers:

`docker-compose up -d`

List all running containers:

`docker-compose ps`

Stop all containers and retain current state:

`docker-compose stop`

Start all containers:

`docker-compose start`

Restart all containers:

`docker-compose restart`

### Login

Log in to a specific container:

`docker exec -it <container-name> bash`

Log in to a specific container as root user:

`docker exec -u root -it <container-name> bash`

### Image

To use the latest Fusion docker images:

`docker-compose down -v`

`git pull`

`./setup-env.sh`

`docker-compose up -d`

You will need to recreate replication rules and add previous configuration after performing this.

### Service

`docker-compose start|stop|restart <service-name>`

_Example to restart Fusion UI Server_

`docker-compose restart fusion-oneui-server`

### Service names

#### General services

`fusion-ui-server-<zone-name>`

`fusion-ihc-server-<zone-name>`

`fusion-server-<zone-name>`

`fusion-oneui-server`

#### Environment specific services

`fusion-nn-proxy-<zone-name>`

`sshd-<zone-name>`

#### Plugin services

`fusion-livehive-proxy-<zone-name>`

## Rebuild

In the event that you need to rebuild your Fusion environment, use the docker compose command shown below to stop and delete all containers and volumes.

`docker-compose down -v`

This is a destructive action that cannot be recovered from, you will lose all container data including that stored in the persisted storage directories (e.g. `/etc/wandisco`, `/etc/hadoop`).

Run the setup script again (it will not prompt for any questions), followed by the docker compose up command to recreate the Fusion environment.

`./setup-env.sh`

`docker-compose up -d`

### Create a new environment

If you want to create a new environment:

`docker-compose down -v`

`git clean -xdf`

`./setup-env.sh`

The setup script will now prompt you for questions, follow one of the [quickstarts](../installation/quickstart-config.md) to configure your new environment.
