---
id: net_bandwidth_considerations
title: Bandwidth Considerations
sidebar_label: Bandwidth Considerations
---

The graph below illustrates varying levels of bandwidth and the impact this has on data migration.

![Data migration - illustration of bandwidth measurement](../../assets/network_bandwidth.jpg)

_All estimates given are based on a round-trip time (RTT) of 20ms and a packet loss of 1e-05%. See https://wintelguy.com/wanperf.pl  if wanting to try your own network throughput calculations._

## File sizes

If your data set contains an on-average small file size, this will impact the time it will take for the migration. This is due to the increased pressure on disk and network IO when handling many files at once. For an interesting article on how small files impact Apache Hadoop environments, see the link below:

[Small Files, Big Foils](https://blog.cloudera.com/small-files-big-foils-addressing-the-associated-metadata-and-application-challenges/)

## Round-trip time (RTT) / Latency

The RTT between your [source](../../glossary/s.md#source) and [target](../../glossary/t.md#target) environments can prevent you from taking advantage of higher bandwidth levels (if it is available to you).

For instance, when using a 1Gbps link, the difference between 10-20ms is negligible. When using a 10Gbps link, the difference between 10-20ms can cut your migration time in half.
