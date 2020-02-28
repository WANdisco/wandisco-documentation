---
id: create-rule
title: How to Create a Rule
sidebar_label: Create a Rule
---

Before you can migrate or replicate data, a [replication rule](https://wandisco.github.io/wandisco-documentation/docs/glossary/r#replication-rules) needs to be created.

1. From the rules section of the dashboard, go to the create a rule page.
2. Define the rule you wish to create:
    - Give the rule a unique name (i.e. one you haven't used before).
    - Provide the path on the [source zone](https://wandisco.github.io/wandisco-documentation/docs/glossary/s#source) you want to replicate data from.
    - If different, also give the path on [target zone](https://wandisco.github.io/wandisco-documentation/docs/glossary/t#target) to replicate the data to.
3. Files or directories can be excluded from replication using glob patterns. The following exclusions are present by default:
    ```text
    /**/.fusion
    /**/.fusion/**
    /**/.Trash
    /**/.Trash/**
    /**/.hive-staging**
    ```
    These exclude Fusion’s housekeeping files, trash directories and Hive staging directories.
    You can add any other exclusions required.

After a few moments the rule will appear on your dashboard.
You can now perform a [consistency check](./consistency-check.md) or [start migrating](./migration.md) your data.
