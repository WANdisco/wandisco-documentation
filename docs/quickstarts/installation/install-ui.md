---
id: install-ui
title: Install Management UI
sidebar_label: Install Management UI
---

## Install steps

Once you have completed all of the [prerequisites](../preparation/prerequisites-ui.md), install the UI package on your host machine:

_Red Hat_  
`sudo yum install -y one-ui-server-<ui-version>.noarch.rpm`

_Debian_  
`sudo apt install -y ./one-ui-server_<ui-version>_all.deb`

The above commands assume that the package is inside your working directory.

### Directory structure (informational)

The following directories are created during the installation of the UI:

_Operation:_ `/opt/wandisco/one-ui-server/`  
_Configuration files:_ `/etc/wandisco/one-ui-server/`  
_Logs:_ `/var/log/fusion/one-ui-server/`  
_Runtime:_ `/var/run/fusion/one-ui-server/`

### Start the service

Once the package has been installed, start the UI service:

`sudo service one-ui-server start`

### Login

Log in to the UI via a web browser (default port for the UI is 8081).

`http://<hostname/IP_address>:8081`

Enter your email address and create a password.

## Next steps

[Connect to storages](./connect-to-storages.md) (i.e existing deployments) using the UI. 
