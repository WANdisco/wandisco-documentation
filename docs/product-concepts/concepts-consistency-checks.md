---
id: concepts_consistency_checks
title: Consistency Checks
sidebar_label: Consistency Checks
---

## Overview

The Consistency Check tool is used to confirm that the files and metadata that are managed under a replication rule are consistent between zones.

You can perform consistency checks to check how much data is synchronized or check that data synchronization is complete between zones.

## Implementation

When you initiate a consistency check on a replicated path, a Fusion server in each zone retrieves and stores the current state of the path within the underlying zone's filesystem (e.g. `/repl1/.fusion/CC_METADATA_DIR`). This metadata is then shared between the Fusion zones and compared for differences between them.

This relates to each file and directory within the path, and the differences include:

* File size
* File name
* User owner
* Group owner
* Permissions
* ACLs (if applicable)

Generally, the greater the number of objects/files within the replicated path, the longer it will take for a consistency check to complete. This is also dependent on server operating power (disk IO, CPU speed, etc).
