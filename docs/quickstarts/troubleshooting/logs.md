---
id: logs
title: Logs
sidebar_label: Logs
---

## Components

Log files are split into the various components that make up a LiveData Plane installation.

* LiveData Plane Server - one per zone.
* IHC Server - one per zone.
* UI Server - one per zone.
* OneUI - one per installation.

For Hadoop zones (i.e. CDH or HDP), additional components could be:

* NameNode Proxy
* Live Hive Proxy

All of these components are contained within their specific containers, as shown below from an example output of `docker-compose ps`:

```json
Name                                         Command                          State   Ports
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
fusion_debug_1                               tail -f /dev/null                Up
fusion_fusion-ihc-server-adls2_1             /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:7500->7500/tcp, 0.0.0.0:7501->7501/tcp, 0.0.0.0:9502->9502/tcp
fusion_fusion-ihc-server-sandbox-hdp_1       /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:7000->7000/tcp, 0.0.0.0:9002->9002/tcp
fusion_fusion-livehive-proxy-sandbox-hdp_1   /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:9083->9083/tcp
fusion_fusion-nn-proxy-sandbox-hdp_1         /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:8890->8890/tcp
fusion_fusion-oneui-server_1                 /bin/sh -c /etc/alternativ ...   Up      0.0.0.0:8081->8081/tcp
fusion_fusion-server-adls2_1                 /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:6944->6944/tcp, 0.0.0.0:8523->8523/tcp, 0.0.0.0:8524->8524/tcp, 0.0.0.0:8582->8582/tcp, 0.0.0.0:8584->8584/tcp
fusion_fusion-server-sandbox-hdp_1           /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:6444->6444/tcp, 0.0.0.0:8023->8023/tcp, 0.0.0.0:8024->8024/tcp, 0.0.0.0:8082->8082/tcp, 0.0.0.0:8084->8084/tcp
fusion_fusion-ui-server-adls2_1              /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:8583->8583/tcp, 0.0.0.0:8943->8943/tcp
fusion_fusion-ui-server-sandbox-hdp_1        /usr/bin/entrypointd.sh /b ...   Up      0.0.0.0:8083->8083/tcp, 0.0.0.0:8443->8443/tcp
fusion_induction_1                           /usr/bin/entrypointd.sh /s ...   Up
fusion_sandbox-hdp_1                         /sbin/init                       Up      0.0.0.0:50010->50010/tcp, 0.0.0.0:50070->50070/tcp, 8020/tcp, 8042/tcp, 0.0.0.0:8080->8080/tcp, 8088/tcp, 9083/tcp
fusion_sshd-sandbox-hdp_1                    /usr/local/bin/entrypointd ...   Up      0.0.0.0:2022->22/tcp, 0.0.0.0:8670->8670/tcp
```

## Viewing log files

### Individual containers

You can log in to a container and view the logs for a specific component in a zone. For example, if you are wanting to view the LiveData Plane Server's logs for the HDP Sandbox zone, run:

`docker-compose exec fusion-server-sandbox-hdp bash`

Once inside, you can access the log directory for the LiveData Plane Server.

`cd /var/log/fusion/server`

#### Log locations

The list below highlights the log directory for each component in their individual containers:

_LiveData Plane Server:_
`/var/log/fusion/server/`

_IHC Server:_
`/var/log/fusion/ihc/server/`

_UI Server:_
`/var/log/fusion/ui/`

_NameNode Proxy:_
`/var/log/fusion/plugins/live-nn/`

_Live Hive Proxy:_
`/var/log/fusion/plugins/live-hive-proxy/`

_LiveData Plane UI:_
`/var/log/wandisco/ui/`

### Debug container

The debug container holds all the LiveData Plane log files for each component. You can log in to this container to view any log file in either zone.

`docker-compose exec debug bash`

The `vim` and `less` commands are not available by default, to install them:

`apt-get update && apt install vim less`

#### Log locations

You will be logged inside of the `/debug` directory, which contains directories for each LiveData Plane zone and the OneUI (which is not linked to a specific zone).

_Example_
```bash
drwxr-xr-x 3 root root 4096 Mar 31 11:51 oneui-server
drwxr-xr-x 7 1000 1000 4096 Mar 31 11:51 adls2
drwxr-xr-x 7 1000 1000 4096 Mar 31 11:51 sandbox-hdp
```

The log locations for each component are slightly different to that of the individual containers.

LiveData Plane Server:
`/debug/<zone-name>/server/`

IHC Server:
`/debug/<zone-name>/ihc/server/`

UI Server:
`/debug/<zone-name>/ui/`

NameNode Proxy:
`/debug/<zone-name>/plugins/live-nn/`

Live Hive Proxy:
`/debug/<zone-name>/plugins/live-hive-proxy/`

LiveData Plane UI:
`/debug/oneui-server/ui/`

## Obtaining log files

You can compress and copy the log files to your Docker host from the debug container.

_Example_

`docker-compose exec -T debug tar -cvzf - /debug > /tmp/logs.tar.gz`

This stores all container log files in a gzip file in the `/tmp` directory on the Docker host. The file can then be transferred to your local machine if desired.
