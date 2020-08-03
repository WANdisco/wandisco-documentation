---
id: z
title: Z
sidebar_label: Z
---

## Zones
A Zone represents the file system used in a standalone Hadoop cluster. Multiple Zones could be from separate clusters in the same data center, or could be from distinct clusters operating in geographically-separate data centers that span the globe. LiveData Plane operates as a distributed collection of servers. While each LiveData Plane server always belongs to only one Zone, a Zone can have multiple LiveData Plane servers (for load balancing and high availability). When you install LiveData Plane, you should create a Zone for each cluster’s file system.
