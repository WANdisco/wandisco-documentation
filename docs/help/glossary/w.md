---
id: w
title: W
sidebar_label: W
---

## WANdisco
**W**ide **A**rea **N**etwork **Dis**tributed **Co**mputing. WANdisco is a leading provider of distributed software development solutions. By using WANdisco’s unique replication technology, software development occurs anywhere without the constraints associated with far-flung distribution.

## WASB
See Azure Blob Storage. It stands for Windows Azure Storage Blob.

## Wildcard
A symbol used to replace or represent one or more characters.

## Writer
In LiveData Plane architecture, only one LiveData Plane node/server per zone is allowed to write into a replicated filespace - this node is the "Writer" for that replicated folder. Therefore, if there is one replicated folder and two zones, there will be two writers for the replicated folder, one in each zone. If there are two replicated folders and two zones there will be four writers, two in each zone.

The writer for a replicated folder does not have to be the same node as the writer for another replicated folder, e.g. Node 1 may be the writer for /dir1/dir2 and /dir1/dir3 and Node 2 may be the writer for /dir1/dir4, which allows for load-balancing across LiveData Plane servers within a zone. If a writer node fails, a new writer for that folder must be selected (set through the process for [Writer Selection](https://docs.wandisco.com/bigdata/wdfusion/#doc_writer-status).)

An exception to this is when a LiveData Plane node is started/restarted, it will check if any replicated folders do not have a writer assigned, and if not, elect itself as writer.
