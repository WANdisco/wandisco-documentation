---
id: test_adlsg2
title: Test ADLS Gen2
sidebar_label: Test ADLS Gen2
---

## LiveMigrator

Follow the steps below to demonstrate the migration of HCFS data from your ADLS Gen2 storage to a target storage.

The ADLS Gen2 storage will be the [source](../../glossary/s.md#source) storage in all instances.

### Get sample data

To upload sample data to your ADLS Gen2 container, see the [Microsoft docs](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#upload-a-block-blob).

You can get the sample data from the link below:

[customer_addresses_dim.tsv.gz](https://github.com/pivotalsoftware/pivotal-samples/raw/master/sample-data/customer_addresses_dim.tsv.gz)

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/`
* Default exclusions
* Preserve HCFS Block Size = *False*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following settings:

   * Source Storage = **adls2**
   * Target Storage = _Choose your target storage_
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your target storage.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

## Next steps

You have now successfully migrated data from your ADLS Gen2 storage to your target storage using LiveMigrator. Contact [WANdisco](https://wandisco.com/contact) for further information about LiveData Plane and what it can offer you.

:::note
If you plan on doing additional migration testing with ADLS Gen2 as a [target](../../glossary/t.md#target) storage, delete the sample data beforehand (as other LiveMigrator tests use the same sample data).
:::