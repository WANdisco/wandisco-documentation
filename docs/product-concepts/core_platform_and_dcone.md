---
id: core_platform_and_dcone
title: Core Platform & DConE
sidebar_label: Core Platform & DConE
---

## Core Platform

Keeping data consistent in a distributed environment is a massive challenge. WANdisco LiveData Plane, an enterprise-class software platform, solves the exponentially growing challenge of keeping unstructured data available across diverse IT environments regardless of geographic location, architecture, or cloud storage provider.

LiveData Plane is a foundation for a modern cloud data strategy — a LiveData strategy — because it prevents data disasters, de-risks data migration to the cloud, and simplifies hybrid cloud data management.

## Distributed Coordination Engine (DConE)

**What is DConE and how is it different?**

LiveData Plane is powered by DConE, which is a high-performance, coordination engine able to work across wide-area networks. The technology uses distributed consensus to guarantee data consistency.

Traditional approaches to data replication are batch-based, do not guarantee data consistency, and cannot operate over wide-area networks or the public internet. Unlike other technologies which move data from one location to another, LiveData Plane uses DConE to coordinate distributed changes to data, enabling shared access to common data sets.

The technology works by applying a mathematically-proven approach to consensus, which works regardless of the distance between data sources or types of data storage.

For more information on DConE, read our [whitepaper](https://wandisco.com/storage/app/media/pages/support/documentation/downloads/WANdisco_DConE_White_Paper.pdf) or the [WANdisco website](https://wandisco.com/platform/dcone).

**How does it work?**

DConE’s Output Proposal Sequence delivers agreed values in strict sequence, one-at-a-time, to an application. Applying these values to the application state using the output proposal sequence ensures the state is consistent with other replicas at that point in the sequence.

**How is it optimized?**

If two or more values do not interfere with one another they may be applied in parallel without adverse effects. This parallelization has several benefits, for example:

* It may increase the rate of agreed values applied to the application state if there are many non-interfering agreements.
* It avoids an agreement that takes a long time to complete (such as a large file transfer) from blocking later agreements that are not dependent on that agreement having completed.

_Example_

Consider the following global sequence, where `/repl1` is the replicated directory:

1. Copy 10TB file to `/repl1/dir1/file1`
2. Copy 10TB file to `/repl1/dir2/file1`
3. Change ownership of `/repl/dir1`

Agreements 1 and 2 may be executed in parallel since they do not interfere with one another.

However, agreement 3 must wait for agreement 1 to complete before it can be applied to the filesystem.

If agreement 2 completes before 1, then its operation will be recorded before the preceding agreement.

At a glance, this could seem like an out-of-order filesystem operation, but it is a part of DConE's optimization of events.

**How does it recover from outages?**

During replication, in the event that the Wide Area Network (WAN) link is temporarily dropped, recovery will occur automatically once the link is re-established. All LiveData Plane nodes in the replicated ecosystem will communicate the proposal number they are currently on, and continue from the highest numbered proposal. This prevents any repeat of transactions that have already occurred prior to the link outage.

If a LiveData Plane node experiences an outage, once it comes online again, it will automatically be informed of any transactions already processed by the rest of the nodes in the replicated ecosystem.
