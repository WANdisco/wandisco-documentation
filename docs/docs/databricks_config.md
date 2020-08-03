---
id: databricks_config
title: Databricks Configuration
sidebar_label: Databricks Config
---

Your Databricks cluster details are required when configuring LiveData Plane.

## Databricks Service Address (Instance name)

The service address (or Workspace Instance in the Databricks docs) is the first part of the URL when logged into your Databricks Workspace.

For example, if the URL is:`https://westeurope.azuredatabricks.net/?o=2678593749589794#`, the service address would be `westeurope.azuredatabricks.net`.

* As of April 16th 2020, the URL scheme for a new Databricks Workspace will have a format of `adb-<workspace-id>.<random>.azuredatabricks.net`. The URL format for existing Workspaces will stay the same.

See the [Workspace Instance and ID](https://docs.databricks.com/workspace/workspace-details.html#workspace-instance-and-id) section in the Databricks docs for more info.

## Bearer Token

You can generate bearer/access tokens within the **User Settings** on your Databricks Workspace.

Example: `dapibe21cfg45efae945t6f0b57dfd1dffb4`

See the [Generate a token](https://docs.databricks.com/dev-tools/api/latest/authentication.html#generate-a-token) section in the Databricks docs for more info.

## Databricks Cluster ID

The cluster ID can be identified within the cluster URL. For example, if the cluster URL is:

`https://westeurope.azuredatabricks.net/?o=2678590123456789#/setting/clusters/0234-125567-cowls978/configuration`

Then the ID is `0234-125567-cowls978`.

See the [Cluster URL](https://docs.databricks.com/workspace/workspace-details.html#cluster-url) section in the Databricks docs for more info.

## JDBC/ODBC HTTP path

This is found in the **Advanced Options** -> **JDBC/ODBC** -> **HTTP Path** for your Databricks cluster.

Example: `sql/protocolv1/o/8445611090456789/0234-125567-cowls978`

See the [Construct the JDBC URL](https://docs.databricks.com/bi/jdbc-odbc-bi.html#construct-the-jdbc-url) section in the Databricks docs for more info.
