---
id: adlsg2_troubleshooting
title: Troubleshooting ADLS Gen2
sidebar_label: ADLS Gen2
---

Please see the [Useful information](./useful_info.md) section for additional commands and help.

[//]: <## Common issues and resolutions>

[//]: <There are no reported issues at present.>

## Rebuild

If you are using ADLS Gen2, delete the related directories from your ADLS Gen2 container (e.g. via the [Azure CLI](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-directory-file-acl-cli#delete-a-directory)):

For example, if your use-case is [HDP Sandbox to Azure Databricks with LiveAnalytics](../installation/hdp_sandbox_lhv_client-adlsg2_lan.md), delete the following directories:

`/apps`  
`/wandisco`
