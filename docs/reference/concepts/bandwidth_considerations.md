---
id: bandwidth_considerations
title: Bandwidth Considerations
sidebar_label: Bandwidth Considerations
---

The graph and table below illustrate network bandwidth capacities and the impact they have on data migration.

![Data migration - illustration of bandwidth measurement](/img/network_bandwidth.jpg)

|Data size / bandwidth|10 Mbps|100 Mbps|500 Mbps|1 Gbps|10 Gbps|
|---|---|---|---|---|---|
|**100GB**|23.5 hrs|2.5 hrs|28 mins|14 mins|7 mins|
|**1TB**|10 days|23.5 hrs|5 hrs|2.5 hrs|1.5 hrs|
|**10TB**|97.5 days|9.5 days|2 days|23.5 hrs|12 hrs|
|**100TB**|975 days|97.5 days|19.5 days|9.5 days|5 days|
|**500TB**|13.5 years|487.5 days|97.5 days|49 days|25 days|
|**1PB**|27 years|975 days|195 days|97.5 days|50 days|

_Times shown are to the nearest 0.5. All estimates given are based on a round-trip time (RTT) of 20ms and a packet loss of 1e-05%._  
_See https://wintelguy.com/wanperf.pl to try your own network throughput calculations._

## File sizes

If your data set contains mainly small files, this will impact the time it will take for the migration. This is due to the increased pressure on disk and network IO when handling many files at once. For an interesting article on how small files impact Apache Hadoop environments, read [Small Files, Big Foils](https://blog.cloudera.com/small-files-big-foils-addressing-the-associated-metadata-and-application-challenges/).

## Round-trip time (RTT)

The RTT between your [source](../../help/glossary/s.md#source) and [target](../../help/glossary/t.md#target) environments can prevent you from taking advantage of higher bandwidth levels (if available to you).

For instance, when using a 1Gbps link, the difference between 10ms and 20ms is negligible. When using a 10Gbps link, the difference between 10ms and 20ms can cut your migration time in half.
