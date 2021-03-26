---
id: component-files
title: Component files
sidebar_label: Component files
---

You can configure LiveData Plane’s component applications using the following files. Take care when making any configuration changes on your clusters.

- `/etc/wandisco/fusion/server/application.properties` - contains LiveData Plane Server properties
- `/etc/wandisco/fusion/ihc/server/{distro}/{version string}.ihc` - contains all the IHC server properties
- `config.properties` - contains all the LiveData Plane Client properties. Using this file you can make updates to LiveData Plane Client properties without editing the `core-site.xml`, which would require a restart of Hadoop services.
- `core-site.xml` - contains LiveData Plane Client and LiveData Plane Server properties

The following pages describe the configuration files and the properties editable in them.
