---
id: concepts_replication_rules
title: Replication Rules
sidebar_label: Replication Rules
---

## Overview

WANdisco Fusion allows users to define which data sets they want to replicate to target storage(s). This is defined using replication rules.
You can replicate or migrate HCFS data, and if using the Fusion Plugin for Live Hive, Hive metadata can also be replicated.

Once WANdisco Fusion is installed, connected to at least two storages and the Fusion Servers inducted together, you can create replication rules. These define the directory paths enabled for replication between the chosen storages within the replicated ecosystem.

Once a replication rule is created, live data replication is then possible on the defined path. You can also choose to start a migration on that path. When replication is no longer required on a path or a migration is complete, replication rules can be deleted.

It is important to note that user requests to delete files in a replicated path will be carried out on the chosen target storage(s), as with all other write activity.

## Replication strategy

When creating replication rules, it is important to plan how to split up your directories. This will depend on the data size or number of files contained within the directory.

Whilst it is possible to launch a migration, or enable replication, on a path containing all your data, it is easier to manage replication/migration in known quantities as it facilitates an easier transition. This is especially relevant when bandwidth between source and target(s) storages may be a limiting factor, as well as server sizing (such as disk IO and number of CPUs).

_Example_

`/repl1` - small data size or small amount of files.  
`/repl2` - large data size or large amount of files.

For the `/repl1` path, you could create one replication rule for the whole path as the amount of data and files can be managed easily.

For `/repl2`, creating multiple replication rules if the structure of the directory allows for it would be advisable, for example:

`/repl2/dir_1`  
`/repl2/dir_2`  
`/repl2/dir_3/datadir_a`  
`/repl2/dir_3/datadir_b`
