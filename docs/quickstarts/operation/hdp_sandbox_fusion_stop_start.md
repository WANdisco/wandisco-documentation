---
id: hdp_sandbox_fusion_stop_start
title: Shut down or start up HDP Sandbox and WANdisco Fusion
sidebar_label: Stop/Start HDP Sandbox & WANdisco Fusion
---

## Shutting down

The steps should be carried out prior to shutting down the Docker host itself.

### Stop HDP Sandbox services

Log in to the Ambari UI, and stop all services.

`http://<docker_IP_address>:8080`

Username: `admin`
Password: `admin`

**Ambari UI -> Services (...) -> Stop All -> CONFIRM STOP**

Wait until all services have stopped before continuing.

### Stop all containers

In the `fusion-docker-compose` directory on the Docker host, stop all containers by using:

`docker-compose stop`

_Example output_

```text
Stopping fusion_fusion-nn-proxy-hdp-3640_1       ... done
Stopping fusion_fusion-livehive-proxy-hdp-3640_1 ... done
Stopping fusion_sshd-hdp-3640_1                  ... done
Stopping fusion_fusion-ihc-server-hdp-3640_1     ... done
Stopping fusion_fusion-ui-server-hdp-3640_1      ... done
Stopping fusion_fusion-server-hdp-3640_1         ... done
Stopping fusion_fusion-ui-server-adls2-5837_1    ... done
Stopping fusion_fusion-ihc-server-adls2-5837_1   ... done
Stopping fusion_fusion-oneui-server_1            ... done
Stopping fusion_fusion-server-adls2-5837_1       ... done
Stopping fusion_debug_1                          ... done
Stopping fusion_sandbox-hdp_1                    ... done
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
   Starting fusion_fusion-nn-proxy-hdp-3640_1       ... done
   Starting fusion_fusion-livehive-proxy-hdp-3640_1 ... done
   Starting fusion_sshd-hdp-3640_1                  ... done
   Starting fusion_fusion-ihc-server-hdp-3640_1     ... done
   Starting fusion_fusion-ui-server-hdp-3640_1      ... done
   Starting fusion_fusion-server-hdp-3640_1         ... done
   Starting fusion_fusion-ui-server-adls2-5837_1    ... done
   Starting fusion_fusion-ihc-server-adls2-5837_1   ... done
   Starting fusion_fusion-oneui-server_1            ... done
   Starting fusion_fusion-server-adls2-5837_1       ... done
   Starting fusion_debug_1                          ... done
   Starting fusion_sandbox-hdp_1                    ... done
   ```

The HDP sandbox services will automatically start once the container is running. This can take 5-10 minutes.
