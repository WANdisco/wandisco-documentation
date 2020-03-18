---
id: general_troubleshooting
title: General troubleshooting
sidebar_label: General
---

The issues listed here are not specific to any distribution or plugin, and may be seen on any Fusion deployment.

If looking for an issue that is specific to a distribution or plugin, select the appropriate option on the sidebar.

See the [Useful information](./useful_info.md) section for additional commands and help. It also includes a rebuild section for starting over.

## Common issues and resolutions

### Error 'connection refused' after starting Fusion for the first time

You may see this error when running `docker-compose up -d` for the first time inside the `fusion-docker-compose` directory:

```json
ERROR: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on [::1]:53: read udp [::1]:52155->[::1]:53: read: connection refused
```

Running the `docker-compose up -d` command a second time will fix the issue.

### Fusion zones not inducted together

If the Fusion zones are not inducted together after starting Fusion for the first time (`docker-compose up -d`), run the same command again to start the induction container:

`docker-compose up -d`
