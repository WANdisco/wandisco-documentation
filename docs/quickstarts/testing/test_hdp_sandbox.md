---
id: test_hdp_sandbox
title: HDP Sandbox
sidebar_label: HDP Sandbox
---

The majority of the installation quickstarts contain basic functionality / smoke testing. Use the examples in this section if you would like to test HCFS replication with larger and randomized data sets.

## Prerequisites

Ensure that you have enough disk space and your server is appropriately sized to handle larger amounts of data.

If using our [Azure VM Creation](../preparation/azure_vm_creation.md) guide, see the `--os-disk-size-gb` and `--size` variables in the [required parameters](../preparation/azure_vm_creation.md#required-parameters) section (the examples provided of `--os-disk-size-gb 32` and `--size Standard_D4_v3` are suitable for these tests).

## HCFS replication

The HDP Sandbox will be the [source](../../glossary/s.md#source) in all instances. Run all commands on the Docker host.

### TeraGen

Use the `teragen` option to generate random data:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen <number-of-100-byte-rows> <output-path>`

_Example_

To generate 10GB of data inside a replicated path, run:

`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teragen 100000000 /path/to/replication_rule`

Check the storage on your target zone for the generated files in the replicated directory. You will see a `_SUCCESS` file alongside the generated files once it is complete.

[//]: <Blocked by DAP-343>

[//]: <### TeraSort>

[//]: <Use the `terasort` option to sort (i.e. organise) the generated data in to a replicated path:>

[//]: <`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort input-path replicated-path`>

[//]: <_Example_>

[//]: <To sort the data from the staging directory in to a replicated path, run:>

[//]: <`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar terasort /staging_dir /path/to/replication_rule`>

[//]: <Check the storage on your target zone for the generated files in the replicated directory.>

[//]: <### TeraValidate (optional)>

[//]: <Use the `teravalidate` option to test that the data in the replicated path is now globally sorted:>

[//]: <`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate replicated-path teravalidate-output-path`>

[//]: <If everything is correctly sorted, the `teravalidate-output-path` should be empty (it will only contain files when keys are out of order).>

[//]: <_Example_>

[//]: <`docker-compose exec -u hdfs sandbox-hdp hadoop jar /usr/hdp/2.6.5.0-292/hadoop-mapreduce/hadoop-mapreduce-examples.jar teravalidate /path/to/replication_rule /teravalidate_output`>

## References

* [Terasort package](https://hadoop.apache.org/docs/r2.7.3/api/org/apache/hadoop/examples/terasort/package-summary.html)
