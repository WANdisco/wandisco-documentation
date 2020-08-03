---
id: general_troubleshooting
title: General troubleshooting
sidebar_label: General
---

The issues listed here are not specific to any distribution or plugin, and may be seen on any LiveData Plane deployment.

If looking for an issue that is specific to a distribution or plugin, select the appropriate option on the sidebar.

See the [Useful information](./useful_info.md) section for additional commands and help. It also includes a rebuild section for starting over.

## Common issues and resolutions

### Permission denied when installing packages or services

The commands given in the [VM Preparation](../preparation/vm_prep.md#install-services) guide assume that you are running as root user. If you are not, then an error similar to below will be seen:

```
$ apt-get update && apt install -y git
__
Reading package lists... Done
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
E: Unable to lock directory /var/lib/apt/lists/
W: Problem unlinking the file /var/cache/apt/pkgcache.bin - RemoveCaches (13: Permission denied)
W: Problem unlinking the file /var/cache/apt/srcpkgcache.bin - RemoveCaches (13: Permission denied)
```

To resolve this, either switch to root user (e.g. `sudo -i`) or run the commands with sudo if your VM user has sufficient privileges, e.g.

`$ sudo apt-get update && sudo apt install -y git`

### Error 'connection refused' after starting LiveData Plane for the first time

You may see this error when running `docker-compose up -d` for the first time inside the `fusion-docker-compose` directory:

```json
ERROR: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on [::1]:53: read udp [::1]:52155->[::1]:53: read: connection refused
```

Running the `docker-compose up -d` command a second time will fix the issue.

### LiveData Plane zones not inducted together

If the LiveData Plane zones are not inducted together after starting LiveData Plane for the first time (`docker-compose up -d`), run the same command again to start the induction container:

`docker-compose up -d`

## Azure specific

### Unable to access Ambari, Cloudera or LiveData Plane UI on VM

Depending on how your Network IP or DNS hostname resolution is set up for your Azure environment, you may experience issues when trying to access hosted services on the VM.

These services require you to access them on a standard port such as 8080 (Ambari), 7180 (Cloudera) or 8081 (LiveData Plane UI), for example:

`http://<vm_ip_address>:8081`

You may experience issues sooner if you are unable to log in to your Azure VM via SSH (this uses the standard port 22).

If you cannot access these services or log in to your VM, you may need admin assistance from whoever manages your Azure environment/subscription. See the Microsoft docs for more info:

* [IP address types and allocation methods in Azure](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-ip-addresses-overview-arm)
