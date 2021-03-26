---
id: application.properties
title: LiveData Plane Server
sidebar_label: LiveData Plane Server
---

The LiveData Plane Server configuration properties are found in `/etc/wandisco/fusion/server/application.properties`.

## Default installation properties

### `agreementstore.segment.size`

The DConE AgreementStore stores agreements in segments, with each segment stored in its own file. This defines how many agreements are stored in a segment.
- Default - 5000. Any positive integer permitted.
- Checked at startup

### `announcement.key.interval`

Specifies the minimum Global Sequence Number (GSN) interval that triggers the generation of a status message.
- Default - 1000L. Any positive integer permitted.
- Checked dynamically

### `announcement.time.interval`

Specifies the minimum time interval that triggers the generation of a status message.
- Default - 10000L. Any positive integer permitted.
- Checked dynamically

### `application.hostname`

This is the hostname used in reporting the LiveData Plane server’s address.

- An FQDN, for example docs01-vm01.example.com
- Checked at startup

### `application.integration.db.deep.copy`

If set to true, the application integration database will also write to disk rather than being exclusively stored in memory.

- True/**false**
- Checked at startup

### `application.integration.db.force`

If set to true, the application integration database will forcibly sync with the filesystem.

- True/**false**
- Checked at startup

### `application.integration.db.panic.if.dirty`

If set to true and the application integration database was not shut down 'cleanly', then on restart the server will not start.

- True/**false**
- Checked at startup

### `application.location`

The directory the application will use for persistence.

- default is . , any existing path is permitted.
- Checked at startup

### `application.port`

The port DConE uses for communication.

- Default 6444, range 1 – 65535
- Checked at startup

### `communication.hostname`

This is the hostname used for binding opened ports (for DConE, requests port, REST).

- Default - 0.0.0.0, must be a valid hostname.
- Checked at startup

### `connection.reset.count`

The number of message objects stored in cache before the cache is reset.

- Default - 5000. Any positive integer permitted.
- Checked at startup

### `database.location`

The directory DConE will use for persistence.

- Any existing path is permitted, default - `/opt/wandisco/fusion/server/dcone/db`
- Checked at startup

### `dcone.system.db.deep.copy`

If set to true, the DConE database will also write to disk rather than being exclusively stored in memory.

- True/**false**
- Checked at startup

### `dcone.system.db.force`

If set to true, the DConE database will forcibly sync with the filesystem.

- True/**false**
- Checked at startup

### `dcone.system.db.panic.if.dirty`

If set to true/false and the DConE system database was not shut down 'cleanly', then on restart the server will not start.

- True/**false**
- Checked at startup

### `dcone.teach.limit`

Specifies the maximum number of agreements sent in a teach message.

- Default - 5000. Any positive integer permitted.
- Checked dynamically

### `dcone.use.boxcar`

Whether the DConE database should use boxcars or not.

- True/**false**
- Checked at startup

### `decoupler.pool.size`

Specifies the size of the default decoupler’s thread pool.

- Default - 100. Any positive integer permitted.
- Checked at startup

### `decoupler.queue.size.max`

Maximum number of queued items for the decoupler.

- Default - 1000000. Any positive integer permitted.
- Checked at startup

### `decoupler.teach.pool.size`

Specifies the size of the teach decoupler’s thread pool; if 0, disables the teach decoupler.

- Default - 20. Any positive integer permitted, plus zero.
- Checked at startup

### `decoupler.teach.queue.size.max`

Maximum number of queued items for the teach decoupler.

- Default - 1000000. Any positive integer permitted.
- Checked at startup

### `executor.threads`

The number of threads executing agreements in parallel (this is total number of repair and agreement execution threads).
The names of the threads start with FastExecutor or AgreedExecutor. These can be used to determine where a request was executed and what type of request - the Completed log message of request contains the thread name, which would either start with AgreedExecutor or with FastExecutor.
The fast requests are all requests that do not involve a pull of data from another zone. An agreed request is the opposite of this, whereby data is pulled from another zone as part of the request.

- Default - 250. 1 to any reasonable max number of threads as allowed per platform is permitted, must be greater than [`repair.threads`](#repairthreads) value.
- Checked at startup

### `fusion.client.ssl.enabled`

Enables SSL between the LiveData Plane Server - LiveData Plane Client.

- True/**false**

### `fusion.http.authentication.enabled`

Enables authentication on the REST API.

- True/**false**
- Checked at startup

### `fusion.http.authentication.kerberos.keytab`

The path to a keytab that contains the principal specified in `fusion.http.authentication.kerberos.principal`.

- Absolute path to Kerberos keytab, no default.
- Checked at startup

### `fusion.http.authentication.kerberos.principal`

The principal the fusion server will use to login with. The name of the principal must be _HTTP_.

- Kerberos principal in the form _HTTP/HOST@{KERBEROS_REALM}_, no default.
- Checked at startup

### `fusion.http.authentication.type`

Type of authentication to use for http access.

- **simple** or kerberos
- Checked at startup

### `fusion.http.authentication.simple.anonymous.allowed`

If type is "simple", whether anonymous API calls are allowed. If set to false, users must append a query parameter at the end of their URL in the form user.name=$USER_NAME.

- True/**false**
- Checked at startup

### `fusion.http.authorization.authorized.proxies`

Users that are allowed to proxy on behalf of other users. HTTP calls would include a value for the header proxy.user.name. The proxied user’s permissions will then be checked against authorized readers and read-writers.

- Default is HTTP, must be a comma-delimited list of users.
- Checked at startup

### `fusion.http.authorization.authorized.readers`

Users that are allowed to make read calls ONLY (write calls are PATCH, POST, PUT, DELETE).

- Default is fusionUISystem, must be a comma-delimited list of users.
- Checked at startup

### `fusion.http.authorization.authorized.read.writers`

Users that are allowed to make read OR write calls (any type of HTTP request).

- Default is fusionUISystem, must be a comma-delimited list of users.
- Checked at startup

### `fusion.http.authorization.enabled`

Enables authorization on the REST API. Authentication must also be enabled.

- True/**false**
- Checked at startup

### `fusion.http.policy`

Determines the transfer protocol(s) to be supported by LiveData Plane Server.

- **HTTP_ONLY**, HTTPS_ONLY, BOTH_HTTP_HTTPS
- Checked at startup

### `fusion.replicated.dir.exchange`

Location of a directory in the replicated filesystem to which LiveData Plane server will write information about replicated directories for clients to read. It’s necessary to configure the same in the core-site.xml, so that it generates the necessary data.

- Default is `/wandisco/exchange_dir`, can be any underlying filesystem path not under replication
- Checked at startup

### `ihc.ssl.enabled`

Whether SSL is enabled for IHC network communications.

- True/**false**
- Checked at startup

### `jetty.http.port`

The port the LiveData Plane HTTP API will use.

- Default - 8082, range 1 – 65535
- Checked at startup

### `jetty.https.port`

The port the LiveData Plane HTTPS API will use (if SSL is enabled).

- Default - 8084, range 1 – 65535
- Checked at startup

### `learner.max.output.lag`

The maximum agreements that a node in a Zone can be behind before it is disabled (i.e. it will no longer be able to propose changes).

- Default - 10000000L. Any positive integer permitted.
- Checked at startup

### `log.location`

The directory in which the LiveData Plane Server stores log files.

- Default - `/var/log/fusion/server`, a local filesystem directory.
- Checked at startup

### `maximum.size`

The number of agreements DConE will hold in the agreement store - this store holds agreements to be processed and agreements stored to teach other nodes.

- Default - 50000. Any positive integer permitted.
- Checked at startup

### `node.id`

The unique identifier given to the LiveData Plane node automatically at installation.

- A Hexadecimal number (must not be altered)
- Checked at startup

### `node.name`

The name set for the LiveData Plane node. Adjustable in the LiveData Plane UI.

- Any String
- Checked at startup

### `remote.ihc.port`

The port remote IHC servers should connect to when the zone is set to inbound connection.

- Default - 8024, range 1 – 65535
- Checked at startup

### `repair.thread.limit`

Maximum number of outstanding files that a single repair will have scheduled for execution at any given time. This is a mechanism for allowing multiple parallel repairs to run together.

- Default - 25. Any positive integer permitted.
- Checked at startup

### `repair.threads`

Number of executor threads dedicated for repair tasks only.

- Default - 50. Any positive integer permitted, must be less then `executor.threads` value.
- Checked at startup

### `request.port`

The port LiveData Plane clients will use to connect the LiveData Plane server.

- Default - 8023, range 1 – 65535
- Checked at startup

### `ssl.enabled`

Whether SSL is enabled for LiveData Plane Server communications.

- True/**false**
- Checked at startup

### `ssl.key.alias`

Alias of private key / certificate chain of the server used to encrypt communications.

- Alias of a keystore entry.
- Checked at startup

### `ssl.key.password`

Encrypted password of private key entry in keystore. Can be encrypted using encrypt-password.sh.

- Checked at startup

### `ssl.keystore`

Local filesystem path of key store containing key entry.

- Absolute path to key store.
- Checked at startup

### `ssl.keystore.password`

Encrypted password of key store. Can be encrypted using encrypt-password.sh.

- Checked at startup

### `ssl.truststore`

Local filesystem path of trust store used to validate certificates sent by other LiveData Plane Servers or IHC servers.

- Absolute path to trust store.
- Checked at startup

### `ssl.truststore.password`

Encrypted password of trust store. Can be encrypted using encrypt-password.sh.

- Checked at startup

### `stacktrace.messaging.enabled`

Allows you to turn off the ability to receive stack traces from REST API calls.

- True/**false**
- Checked at startup

### `transfer.chunk.size`

The size of the ChunkedStream.

- Default - 32768. Any positive integer permitted.
- Checked at startup

### `zone`

The zone name for where the LiveData Plane server is located. This is set during installation.

- Any String (must not be altered)
- Checked at startup


## Properties which can be added

### `agreed.proposal.store.rollback`
Determines whether the LiveData Plane server will attempt to rollback any uncommitted transactions on start up.

- True/**false**
- Checked at startup

### `fusion.gsn.garbage.collector.block`

Coordinated requests (GSNs) in stable storage are garbage collected by a thread pool, periodically requests will be submitted to garbage collect (GC) the GSNs. By default, the thread submitting requests does not wait for the GSN to be GC’d.
If this is set to true, then the thread that requests the GC will be blocked until the GC is done - this will cause back pressure on the system and reduce the throughput.

- True/**false**
- Checked at startup

### `fusion.gsn.garbage.collector.thread.count`

Coordinated requests (GSNs) are now removed from the shared storage using a thread pool. This controls the number of threads.

- Default - 10. Any positive integer permitted.
- Checked at startup

### `fusion.gsn.garbage.collector.warn.threshold.time`

If it takes longer than this time to garbage collect the coordinated requests (GSNs) stored in stable storage, then issue a warning and diagnostic event.

- Default - 30 (in seconds). Any positive integer permitted.
- Checked at startup

### `ihc.connect.timeout`

Timeout on how long LiveData Plane should wait for IHC connection being established (networking timeout).

- Default - 60000L (in ms). Any positive integer permitted.
- Checked at startup

### `license.file`

The absolute path to the license file.

- Default `/etc/wandisco/fusion/server/license.key`
- Checked at startup

### `netty.client.reuse.addr`

Whether netty clients can reuse address and port for connections that are in the TIME_WAIT state.

- True/**false**
- Checked at startup

### `read.timeout`

Timeout of how long without response the IHC connection can be.

- Default - 60000L (in ms). Any positive integer permitted.
- Checked at startup

### `response.cache.size.limit`

Allows you to set the size limit of the response cache which holds the processed request ids and corresponding responses.

- Default - 100000. Any positive integer permitted.
- Checked at startup

### `response.cache.expiration`

This specifies how long entries are stored in the response cache before they expire.

- Default - 60 (in minutes). Any positive integer permitted.
- Checked at startup

### `retry.sleep.time`

The sleep time in between retries of an agreed request.

- Default - 1000L (in ms). Any positive integer permitted.
- Checked at startup
