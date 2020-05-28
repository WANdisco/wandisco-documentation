---
id: cdh_sandbox_troubleshooting
title: Troubleshooting Cloudera (CDH) Sandbox
sidebar_label: CDH Sandbox
---

See the [Useful information](./useful_info.md) section for additional commands and help.

## Common issues and resolutions

This section will be updated once issues are reported.

## Rebuild

Use these steps if looking to start over.

1. Stop and delete all containers, volumes and unused networks using:

   `docker-compose down -v`

1. You may need to clean up additional items depending on your deployment. Check the **rebuild** section for your chosen distributions and plugins by navigating the options on the sidebar.

   For example, if your use case is [CDH Sandbox to Azure Databricks with LiveAnalytics](../installation/cdh_sandbox_lhv_client-adlsg2_lan.md), check the [ADLS Gen2](./adlsg2_troubleshooting.md#rebuild) and [Databricks](./databricks_troubleshooting.md) rebuild sections.

1. Run the setup script again (it will not prompt for any questions), followed by the docker compose `up` command to recreate the environment:

   `./setup-env.sh`

   `docker-compose up -d`
