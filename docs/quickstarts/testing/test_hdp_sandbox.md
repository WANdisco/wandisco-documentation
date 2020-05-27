---
id: test_hdp_sandbox
title: HDP Sandbox
sidebar_label: HDP Sandbox
---

Most of our installation quickstarts give you the basic steps to test small-scale replication. Use the examples in this section if you would like to test HCFS replication with larger and more randomized data sets.

Following these examples to the end will result in ~20GB of data being replicated.


## Prerequisites

Ensure that you have enough disk space and your server is appropriately sized to handle larger amounts of data.

* If using our [Azure VM Creation](../preparation/azure_vm_creation.md) guide, see the `--os-disk-size-gb` and `--size` variables in the [required parameters](../preparation/azure_vm_creation.md#required-parameters) section. At a minimum, these values should be:  
  * `--os-disk-size-gb 64`  
  * `--size Standard_D8_v3`

* If using our [AWS VM Creation](../preparation/aws_vm_creation.md) guide, see the `--block-device-mappings` and `--instance-type` variables in the [required parameters](../preparation/aws_vm_creation.md#required-parameters) section. At a minimum, these values should be:  
  * `--block-device-mappings "[{\"DeviceName\":\"/dev/sda1\",\"Ebs\":{\"VolumeSize\":64,\"DeleteOnTermination\":true}}]"`  
  * `--instance-type t3.2xlarge`

## HCFS replication

The HDP Sandbox will be the [source](../../glossary/s.md#source) in all instances. Run all commands on the Docker host.

### TeraGen

Use the `teragen` option to generate random data:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen <number-of-100-byte-rows> <output-path>`

_Example_

To generate 10GB of data inside a replicated path, run:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen 100000000 /path/to/replication_rule/teragen_output`

The `teragen_output` directory should not be created prior to running this command otherwise it will fail.

Once complete, check the storage on your target zone for the generated files in the `teragen_output` directory. You will see a `_SUCCESS` file alongside the generated files once it is complete.

### TeraSort

Use the `terasort` option to sort (i.e. organize) the generated data in to a replicated path:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort <input-path> <output-path>`

_Example_

To sort the data from the staging directory in to a replicated path, run:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort /path/to/replication_rule/teragen_output /path/to/replication_rule/terasort_output`

The `terasort_output` directory should not be created prior to running this command otherwise it will fail.

Check the storage on your target zone for the generated files in the `terasort_output` directory. You will see a `_SUCCESS` file alongside the generated files once it is complete.

### TeraValidate (optional)

Use the `teravalidate` option to test that the data in the replicated path is now globally sorted:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate <input-path> <output-path>`

_Example_

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate /path/to/replication_rule/terasort_output /path/to/replication_rule/teravalidate-output`

If everything is correctly sorted, the `teravalidate-output` directory should contain a `_SUCCESS` file and another file containing a checksum value. Compare this value on both the source and target storages if you wish to fully validate the operation.

## References

* [Terasort package](https://hadoop.apache.org/docs/r2.7.3/api/org/apache/hadoop/examples/terasort/package-summary.html)
