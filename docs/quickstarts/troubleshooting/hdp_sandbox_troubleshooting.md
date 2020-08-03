---
id: hdp_sandbox_troubleshooting
title: Troubleshooting Hortonworks (HDP) Sandbox
sidebar_label: HDP Sandbox
---

See the [Useful information](./useful_info.md) section for additional commands and help.

## Common issues and resolutions

### No Route to Host after docker container restart

After restarting a single docker container, such as the HDP Sandbox, you may encounter connectivity issues between LiveData Plane and the Sandbox.

The internal IP address of the container can change when restarting the container. This can cause the `No Route to Host` error as LiveData Plane will have cached the old address.

To resolve, you must restart all containers within the `fusion-docker-compose` directory:

`docker-compose restart`

### Hiveserver2 down after HDP Sandbox is started

The Hiveserver2 component in the HDP sandbox may be down after starting the cluster. To start it up:

1. On the docker host, change to the `fusion-docker-compose` directory and restart the LiveData Plane Server container for the HDP zone.

   `docker-compose restart fusion-server-sandbox-hdp`

   Wait until the container has finished restarting before continuing.

2. Access the Ambari UI, and manually start the Hiveserver2 component.

   **Ambari UI -> Hive -> Summary -> Click on the "HIVESERVER2" written in blue text.**

3. Locate the HiveServer2 in the component list and click the `...` in the Action column. Select to **Start** the component in the drop-down list.

### Spark2 History Server down after HDP Sandbox is started for first time

When starting the HDP Sandbox for the first time, the Spark2 History Server may be in a stopped state.

To bring the History Server online:

1. In the Ambari UI, select to Refresh configs for the WANdisco Fusion service.

   **Ambari UI -> WANdisco Fusion -> Actions -> Refresh configs -> OK**

2. Start the Spark2 service.

   **Ambari UI -> Spark2 -> Actions -> Start -> CONFIRM START**

### Hue reports **database is locked**

When logging in to the Hue UI for the first time, the **database is locked** message may appear. This also results in the Hive databases not being loaded, and you will be unable to run queries.

To resolve this, click the refresh icon on the Hive database list on the left-hand panel. You should then see the `default` database appear and you will now be able to run queries.

The **database is locked** message may still appear, click to close it afterwards.

## Rebuild

Use these steps if looking to start over.

1. Stop and delete all containers, volumes and unused networks using:

   `docker-compose down -v`

1. You may need to clean up additional items depending on your deployment. Check the **rebuild** section for your chosen distributions and plugins by navigating the options on the sidebar.

   For example, if your use case is [HDP Sandbox to Azure Databricks with LiveAnalytics](../installation/hdp_sandbox_lhv_client-adlsg2_lan.md), check the [ADLS Gen2](./adlsg2_troubleshooting.md#rebuild) and [Databricks](./databricks_troubleshooting.md) rebuild sections.

1. Run the setup script again (it will not prompt for any questions), followed by the docker compose `up` command to recreate the environment:

   `./setup-env.sh`

   `docker-compose up -d`
