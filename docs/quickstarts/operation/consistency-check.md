---
id: consistency-check
title: Run a Consistency Check
sidebar_label: Consistency Check
---

Once you have [created a replication rule](./create-rule), run a consistency check to compare the contents between all zones.

1. On the **Rules** table, click the refresh icon for the replication rule. This will trigger a consistency check.

2. Wait for the **Consistency Status** to update. The more objects contained within the path, the longer it will take to complete the check.

   The **Consistency Status** will determine the next steps:
   * **Consistent** - no further action is required.
   * **Inconsistent** - consider [starting a migration](./migration).
