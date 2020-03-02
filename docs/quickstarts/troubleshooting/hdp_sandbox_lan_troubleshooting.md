---
id: hdp_sandbox_lan_troubleshooting
title: Troubleshooting Hortonworks (HDP) Sandbox to Azure Databricks
sidebar_label: HDP Sandbox to Azure Databricks
---

This troubleshooting guide should be used in conjunction with the [HDP Sandbox to Azure Databricks](../installation/hdp_sandbox_lhv_client-adlsg2_lan.md) guide.

Please see the [Useful information](./useful_info.md) section for additional commands and help.

## Common issues

### No Route to Host after docker container restart

After restarting a single docker container, such as the HDP sandbox, you may encounter connectivity issues between Fusion and the Sandbox.

The internal IP address of the container can change when restarting the container and Fusion will have cached the old address. This in turn causes the `No Route to Host` error.

To resolve, you must restart all containers within the `fusion-docker-compose` directory:

`docker-compose restart`

### Unable to activate Live Hive Plugin

When trying to activate the Live Hive plugin, it may fail to do so on the first attempt.

The cause will often be that the HDP sandbox services have not yet fully started (this can take up to 5 minutes). You can check this by logging in to the Ambari UI and checking the status of HDFS.

1. Log in to the Ambari UI via a web browser.

   `http://<docker_IP_address>:8080`

   Username: `admin`
   Password: `admin`

2. Select the **HDFS** service.

3. Wait until all the HDFS components are showing as **Started** and then retry activation of the Live Hive plugin.

### Error 'connection refused' after starting Fusion for the first time

You may see the following error occur when running `docker-compose up -d` for the first time inside the fusion-docker-compose repository:

```json
ERROR: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on [::1]:53: read udp [::1]:52155->[::1]:53: read: connection refused
```

If encountering this error, run the `docker-compose up -d` command again, and this should initiate the download of the docker images.

### Uninstalling the Datatransformer Jar

Uninstalling the Datatransformer Jar (named `etl.jar` in the Databricks library) from your Databricks cluster will not remove it from storage.

To remove from the underlying storage, run the command below and adjust to your credentials:

`curl  -F path="/wandisco-databricks-etl-6.0.1.1.jar" https://<databricks-service-address>/api/2.0/dbfs/delete -H "Authorization: Bearer <bearer-token>"`

You will need to adjust this so that your `<bearer-token>` and `<databricks-service-address>` is used. See the [Info you will require](../installation/hdp_sandbox_lhv_client-adlsg2_lan.md#info-you-will-require) section for reference.

_Example_

`curl  -F path="/wandisco-databricks-etl-6.0.1.1.jar" https://westeurope.azuredatabricks.net/api/2.0/dbfs/delete -H "Authorization: Bearer dapi46c3c339b25473c7ca600df9bb299a83"`

### Fusion zones not inducted together

[//]: <DAP-136 workaround>

If the Fusion zones are not inducted together after starting Fusion for the first time (`docker-compose up -d`), you can simply run the same command again to start the induction container:

`docker-compose up -d`

### Hiveserver2 down after HDP Sandbox is started

The Hiveserver2 component in the HDP sandbox may be down after starting the cluster. If so, try the following steps to start it back up.

1. On the docker host, change directory to the Fusion docker compose directory and restart the Fusion Server container for the HDP zone.

   `cd /path/to/fusion-docker-compose`

   `docker-compose restart fusion-server-hdp`

   Wait until the container has finished restarting before continuing.

2. Access the Ambari UI, and manually start the Hiveserver2 component.

   **Ambari UI -> Hive -> Summary -> Click on the "HIVESERVER2" written in blue text.**

3. Locate the HiveServer2 in the component list and click the `...` in the Action column. Select to **Start** the component in the drop-down list.

### Spark2 History Server down after HDP Sandbox is started for first time

When starting the HDP Sandbox for the first time, the Spark2 History Server may be in a stopped state. This is often due to the order in which Spark2 and the WANdisco Fusion client is installed.

To resolve and bring the History Server online, follow the steps below:

1. In the Ambari UI, select to Refresh configs for the WANdisco Fusion service.

   **Ambari UI -> WANdisco Fusion -> Actions -> Refresh configs -> OK**

2. Start the Spark2 service.

   **Ambari UI -> Spark2 -> Actions -> Start -> CONFIRM START**

## Rebuild

If looking to start over, follow our [rebuild](./useful_info.md#rebuild) section for guidance.
