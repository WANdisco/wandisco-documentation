---
id: consistency-check
title: Run a Consistency Check
sidebar_label: Consistency Check
---

Once you have [created a replication rule](./create-rule.md), run a consistency check to compare the contents between all zones.

1. On the **Rules** table, click to **View rule**.

2. On the rule page, **start consistency check** and wait for the **Consistency status** to update. The more objects contained within the path, the longer it will take to complete the check.

   The **Consistency Status** will determine the next steps:
   * **Consistent** - no further action is required.
   * **Inconsistent** - consider [starting a migration](./migration.md).
