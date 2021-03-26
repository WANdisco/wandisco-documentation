---
id: test-hdp-sandbox-livedata
title: Test HDP Sandbox with LiveData
sidebar_label: LiveData
---

Follow the steps below to demonstrate live replication of HCFS data from the HDP sandbox to a target storage.

The HDP Sandbox will be the [source](../../help/glossary/s.md#source) storage in all instances.

## Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `replicate`
* Path for all storages = `/testdir`
* Default exclusions
* Preserve HCFS Block Size = *False*

## Replicate data

1. Log in to **Hue** via a web browser.

   `http://<dockerhost_IP_address>:8000`

   Username: `hdfs`
   Password: `hdfs`

1. Go to **Menu** -> **Files**.

1. Move to `/testdir` path and **Upload** any file from your host machine.

1. Check the uploaded file is in the `/testdir` directory on your target storage.

## Test large data sets (optional)

Use the examples in this section to test HCFS replication with larger and more randomized data sets.

Following these examples to the end will result in ~20GB of data being replicated.

### Prerequisites

Ensure that you have enough disk space and your server is appropriately sized to handle larger amounts of data. At a minimum, these specifications should be:

4 CPUs  
32 GiB memory  
64 GB storage for Operating System

* If you have [created an Azure VM](../preparation/azure_vm_creation.md), see the `--os-disk-size-gb` and `--size` variables in the [required parameters](../preparation/azure_vm_creation.md#required-parameters) section. At a minimum, these values should be:  
  * `--os-disk-size-gb 64`  
  * `--size Standard_D8s_v3`

* If you have [created an AWS VM](../preparation/aws_vm_creation.md), see the `--block-device-mappings` and `--instance-type` variables in the [required parameters](../preparation/aws_vm_creation.md#required-parameters) section. At a minimum, these values should be:  
  * `--block-device-mappings "[{\"DeviceName\":\"/dev/sda1\",\"Ebs\":{\"VolumeSize\":64,\"DeleteOnTermination\":true}}]"`  
  * `--instance-type r5.xlarge`

### TeraGen

Use the `teragen` option to generate random data:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen <number-of-100-byte-rows> <output-path>`

_Example_

To generate 10GB of data inside a replicated path, run:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen 100000000 /testdir/teragen_output`

The `teragen_output` directory should **not** be created prior to running this command otherwise it will fail.

Once complete, check the storage on your target zone for the generated files in the `teragen_output` directory. You will see a `_SUCCESS` file alongside the generated files.

### TeraSort

Use the `terasort` option to sort (i.e. organize) the generated data into a replicated path:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort <input-path> <output-path>`

_Example_

To sort the data from the staging directory into a replicated path, run:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort /testdir/teragen_output /testdir/terasort_output`

The `terasort_output` directory should **not** be created prior to running this command otherwise it will fail.

Once complete, check the storage on your target zone for the generated files in the `terasort_output` directory. You will see a `_SUCCESS` file alongside the generated files.

### TeraValidate (optional)

Use the `teravalidate` option to test that the data in the replicated path is now globally sorted:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate <input-path> <output-path>`

_Example_

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate /testdir/terasort_output /testdir/teravalidate-output`

If everything is correctly sorted, the `teravalidate-output` directory should contain a `_SUCCESS` file and another file containing a checksum value. To fully validate the operation, you can compare this value on both the source and target storages.

## Next steps

You have now set up live replication from your CDH Sandbox to your target storage. Contact [WANdisco](https://wandisco.com/contact) for further information about LiveData Plane and what it can offer you.

## References

* [Terasort package](https://hadoop.apache.org/docs/r2.7.3/api/org/apache/hadoop/examples/terasort/package-summary.html)
