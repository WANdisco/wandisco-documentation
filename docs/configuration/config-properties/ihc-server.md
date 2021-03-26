---
id: ihc.server
title: Inter-Hadoop Communication Server
sidebar_label: IHC Server
---

The Inter-Hadoop Communication (IHC) Server is configured from a single file located at `/etc/wandisco/fusion/ihc/server/{distro}/{version string}.ihc`.

All properties in this file are checked at startup. If set options are given, the default is highlighted in bold, e.g. True/**false**.

## Default installation properties

### `http.server`

The host and port for the web server, used when the `ihc.http.policy` is equal to HTTP_ONLY or BOTH_HTTP_HTTPS.

- Default - 0.0.0.0:9001, permitted - `<string>:[1 - 65535]`

### `https.server`

The host and port for the web server, used when the `ihc.http.policy` is equal to HTTPS_ONLY or BOTH_HTTP_HTTPS.

- Default - 0.0.0.0:8001, permitted - `<string>:[1 - 65535]`

### `ihc.http.policy`

Determines the HTTP policy supported by IHC Server.

- **HTTP_ONLY**, HTTPS_ONLY, BOTH_HTTP_HTTPS

### `ihc.server`

The hostname and port the IHC server will listen on.

- Default - $FUSION_HOSTNAME:7000, permitted - `<string>:[1 - 65535]`

### `ihc.server.bind`

The address the IHC server will bind to. The port must match that used in the `ihc.server` address.

- Default - 0.0.0.0:7000, permitted - `<string>:[1 - 65535]`

### `ihc.ssl.enabled`

Signifies that the IHC Server communications has SSL encryption enabled.

- True/**false**

### `ihc.ssl.key.alias`

Alias of private key / certificate chain of the IHC server used to encrypt communications.

- Alias of a keystore entry

### `ihc.ssl.key.password`

Encrypted password of private key entry in keystore. Can be encrypted using encrypt-password.sh.

### `ihc.ssl.keystore`

Local filesystem path of key store containing key entry.

- Absolute path to key store.

### `ihc.ssl.keystore.password`

Encrypted password of key store. Can be encrypted using encrypt-password.sh.

### `ihc.ssl.keystore.type`

Format of key store

- **JKS**, PKCS12, etc.

### `ihc.ssl.truststore`

Local filesystem path of trust store used to validate certificates sent by other IHC servers or LiveData Plane Servers.

- Absolute path to trust store

### `ihc.ssl.truststore.password`

Encrypted password of trust store. Can be encrypted using encrypt-password.sh.

### `ihc.ssl.truststore.type`

Format of trust store.

- **JKS**, PKCS12, etc.

## Properties which can be added

The following properties are non-standard, and will not be present in a IHC properties file by default.

### `ihc.transfer.ssl.handshake.timeout`

SSL Handshake timeout on transfer channel.

- Default - 60. Any positive integer permitted.

### `ihc.transfer.write.limit`

Write bandwidth limit on transfer channel, in bytes/sec.

- Default - 0 (unlimited). Any integer permitted.

### `ihc.transfer.write.limit.check.interval`

Check interval for bandwidth limit enforcement, in seconds.

- Default - 1. Any positive integer permitted.

### `ihc.writer.threads`

Number of threads servicing write handlers that perform reads from underlying storage and writes to network channel.

- Default - 32. Any positive integer permitted.
