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

Pull down latest docker container images:

`docker-compose pull`

### Service

`docker-compose start|stop|restart <service-name>`

_Example to restart Fusion ONEUI Server_

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

If you want to create a new environment, delete the `.yml` and `.env` files that were created after running the setup script. This should be performed after running the `docker-compose down -v` command.

_Default file names_

`rm -f docker-compose.common.yml docker-compose.zone-a.yml docker-compose.zone-b.yml common.env zone_a.env zone_b.env`

There may also be plugin `.yml` for a specific zone that requires deletion.

_Plugin file names_

`rm -f docker-compose.zone-a-plugin.yml docker-compose.zone-b-plugin.yml`

Now follow one of the [quickstarts](../installation/quickstart-config.md) to create a new environment.
