---
id: test_s3
title: Test AWS S3
sidebar_label: Test AWS S3
---

## LiveMigrator

Follow the steps below to demonstrate the migration of HCFS data from your AWS S3 storage to a target storage.

The AWS S3 storage will be the [source](../../help/glossary/s.md#source) storage in all instances.

### Get sample data

To upload sample data to your AWS S3 container, see the [Amazon S3 console](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html#upload-objects-by-drag-and-drop) or [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html#examples) docs.

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

   * Source Storage = **s3**
   * Target Storage = _Choose your target storage_
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your target storage.

   A new ~50MB file will exist inside (`customer_addresses_dim.tsv.gz`).

## Next steps

You have now successfully migrated data from your AWS S3 storage to your target storage using LiveMigrator. Contact [WANdisco](https://wandisco.com/contact) for further information about LiveData Plane and what it can offer you.

:::note
If you plan on doing additional migration testing with AWS S3 as a [target](../../help/glossary/t.md#target) storage, delete the sample data beforehand (as other LiveMigrator tests use the same sample data).
:::