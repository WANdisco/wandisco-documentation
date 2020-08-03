---
id: useful_info
title: Useful Information
sidebar_label: Useful Information
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

### Image

To use the latest LiveData Plane docker images:

`docker-compose down -v`

`git pull`

`./setup-env.sh`

`docker-compose up -d`

You now need to recreate replication rules and add previous configuration.

### Service

You need to reference the LiveData Plane service name rather than the container name when using docker compose.

`docker-compose start|stop|restart <service-name>`

_Example to restart LiveData Plane Server_

`docker-compose restart fusion-server-<zone-name>`

#### Service names

##### General

`fusion-ui-server-<zone-name>`

`fusion-ihc-server-<zone-name>`

`fusion-server-<zone-name>`

`fusion-oneui-server`

##### Environment specific

`fusion-nn-proxy-<zone-name>`

`sshd-<zone-name>`

##### Plugins

`fusion-livehive-proxy-<zone-name>`

##### Sandboxes

`sandbox-hdp`

`sandbox-cdh`

### Login

Log in to a specific container:

`docker-compose exec <service-name> bash`

Log in to a specific container as root user:

`docker-compose exec -u root <service-name> bash`

## Rebuild

In the event that you need to rebuild your LiveData Plane environment, use:

`docker-compose down -v`

|This is a destructive action that cannot be recovered from. It will stop and delete all containers, volumes and unused networks.|
|---|

Run the setup script again (it will not prompt for any questions), followed by the docker compose up command to recreate the environment.

`./setup-env.sh`

`docker-compose up -d`

### Create a new environment

To create a new environment:

`docker-compose down -v`

`git clean -xdf`

`./setup-env.sh`

The setup script prompts you for questions. [Configure your new environment](../installation/installation-quickstarts.md).
