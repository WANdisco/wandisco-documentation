---
id: m
title: M
sidebar_label: M
---

## MapReduce
Hadoop MapReduce is a software framework for writing applications to process large amounts of data in-parallel on large clusters. A MapReduce job usually splits the input data-set into independent chunks which are processed by the map tasks in parallel. The framework sorts the outputs of the maps, which are then input to the reduce tasks. Typically both the input and the output of the job are stored in a file-system. The framework takes care of scheduling tasks, monitoring them and re-executes the failed tasks.

## Membership

*This term is redundant as of LiveData Plane 2.11.*

A Membership is a defined group of LiveData Plane servers that replicate data between their Zones. You can have as many LiveData Plane servers in a Membership as you like, and each LiveData Plane server can participate in multiple Memberships. LiveData Plane allows you to define multiple Memberships, and LiveData Plane servers can fulfil different roles in each Membership they participate in. This allows you to control exactly how your LiveData Plane environment operates normally, and how it behaves when faced with network failures, host failures and other types of issues.

## Microsoft Azure
See [Azure](a.md#azure).  
