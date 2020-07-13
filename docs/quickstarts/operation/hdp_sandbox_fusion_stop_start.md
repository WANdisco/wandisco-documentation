---
id: hdp_sandbox_fusion_stop_start
title: Shut down or start up HDP Sandbox and WANdisco Fusion
sidebar_label: Stop/Start HDP Sandbox & WANdisco Fusion
---

## Shutting down

The steps should be carried out prior to shutting down the Docker host itself.

### Stop HDP Sandbox services

Log in to the Ambari UI, and stop all services.

`http://<dockerhost_IP_address>:8080`

Username: `admin`
Password: `admin`

**Ambari UI -> Services (...) -> Stop All -> CONFIRM STOP**

Wait until all services have stopped before continuing.

### Stop all containers

In the `fusion-docker-compose` directory on the Docker host, stop all containers by using:

`docker-compose stop`

_Example output_

```text
Stopping fusion-oneui-server               ... done
Stopping fusion-server-adls2               ... done
Stopping induction                         ... done
Stopping fusion-ihc-server-adls2           ... done
Stopping fusion-server-sandbox-hdp         ... done
Stopping sshd-sandbox-hdp                  ... done
Stopping fusion-ihc-server-sandbox-hdp     ... done
Stopping fusion-nn-proxy-sandbox-hdp       ... done
Stopping fusion-livehive-proxy-sandbox-hdp ... done
Stopping fusion-ui-server-adls2            ... done
Stopping fusion-ui-server-sandbox-hdp      ... done
Stopping sandbox-hdp                       ... done
Stopping debug                             ... done
```

### Shutdown the Docker host

You can now safely shut down the Docker host.

## Starting up

Ensure the Docker host is started and that the docker containers have been created previously (using `docker-compose up -d`).

### Start all containers

1. In the `fusion-docker-compose` directory on the Docker host, verify that the containers are stopped.

   `docker-compose ps`

   All containers should have an `Exit` state.

1. Start all containers.

   `docker-compose start`

   _Example output_

   ```text
   Starting fusion-oneui-server               ... done
   Starting fusion-server-adls2               ... done
   Starting induction                         ... done
   Starting fusion-ihc-server-adls2           ... done
   Starting fusion-server-sandbox-hdp         ... done
   Starting sshd-sandbox-hdp                  ... done
   Starting fusion-ihc-server-sandbox-hdp     ... done
   Starting fusion-nn-proxy-sandbox-hdp       ... done
   Starting fusion-livehive-proxy-sandbox-hdp ... done
   Starting fusion-ui-server-adls2            ... done
   Starting fusion-ui-server-sandbox-hdp      ... done
   Starting sandbox-hdp                       ... done
   Starting debug                             ... done
   ```

The HDP sandbox services will automatically start once the container is running. This can take 5-10 minutes.
