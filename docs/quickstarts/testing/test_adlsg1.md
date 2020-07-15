---
id: test_adlsg1
title: Test ADLS Gen1
sidebar_label: Test ADLS Gen1
---

## LiveMigrator

Follow the steps below to demonstrate the migration of HCFS data from your ADLS Gen1 storage to a target storage.

The ADLS Gen1 storage will be the [source](../../glossary/s.md#source) storage in all instances.

### Get sample data

To upload sample data to your ADLS Gen1 storage account, see the [Microsoft docs](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#uploaddata).

You can get the sample data from the link below:

[customer_addresses_dim.tsv.gz](https://github.com/pivotalsoftware/pivotal-samples/raw/master/sample-data/customer_addresses_dim.tsv.gz)

Place it within your **Home Mount Point** (see [info you will require](../installation/adlsg1-adlsg2.md#info-you-will-require) for reference).

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/`
* Default exclusions
* Preserve HCFS Block Size = *False*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following settings:

   * Source Storage = **adls1**
   * Target Storage = _Choose your target storage_
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your target storage.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

## Next steps

You have now successfully migrated data from your ADLS Gen1 storage to your target storage using LiveMigrator. Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you.

:::note
If you plan on doing additional migration testing with ADLS Gen1 as a [target](../../glossary/t.md#target) storage, delete the sample data beforehand (as other LiveMigrator tests use the same sample data).
:::