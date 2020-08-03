---
id: kerberos_cdh
title: Kerberos (CDH) integration with LiveData Plane
sidebar_label: Kerberos (CDH) integration with LiveData Plane
---

_THIS GUIDE IS WORK IN PROGRESS, PLEASE DO NOT FOLLOW ANYTHING HERE UNTIL THIS WARNING IS REMOVED_

**This guide should only be followed if you have already completed the [Cloudera (CDH) to ADLS Gen2](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/installation/cdh-adlsg2) quickstart.**

## Considerations

There are a number considerations when enabling LiveData Plane to function with a kerberized cluster.

An existing keytab and principal that the cluster provides can be used with LiveData Plane (e.g. the `hdfs` keytab). The cluster is already likely to be configured to work with an existing keytab. As such, a restart of cluster services should not be required for LiveData Plane to use an existing keytab.

Alternatively, you can create a new principal/keytab for use with LiveData Plane but additional configuration will be needed. Please consider your own security requirements before deciding on the options available.

If creating a new principal/keytab for LiveData Plane, the following configuration is required. If selecting an existing keytab, ensure that the following configuration requirements are already met.

* The Kerberos principal to be used with LiveData Plane can be headless, or mapped to a hostname.

  _Example of a headless principal:_ `fusion@REALM.COM`

  _Example of a service/host principal:_ `fusion/hostname@REALM.COM`

  Please note that if a _service/host principal_ is to be used, the hostname must match that of the LiveData Plane docker host.

* An appropriate [auth_to_local](https://web.mit.edu/kerberos/krb5-latest/doc/admin/conf_files/krb5_conf.html#realms) rule must exist for the principal to be used with LiveData Plane. This must align to a superuser (e.g. `hdfs`).

  _Example to map fusion principal to local superuser_

  _Headless format_: `RULE:[1:$1@$0](fusion@REALM.COM)s/.*/hdfs/`

  _Service/host format_: `RULE:[2:$1@$0](fusion@WANDISCO.HADOOP)s/.*/hdfs/`

  Alternatively, you can map the principal to its shortname, and then add this user to the HDFS superuser group (e.g. `hdfs`).

  _Example to map fusion principal to shortname_

  _Headless format_: `RULE:[1:$1@$0](fusion@REALM.COM)s/.*/fusion/`

  _Service/host format_: `RULE:[2:$1@$0](fusion@WANDISCO.HADOOP)s/.*/fusion/`

  _Example to add fusion user to HDFS superuser group_

  This task must be performed on the NameNode host(s) for the cluster (i.e. both active and standby if NameNode HA is enabled).

  `useradd fusion`

  `usermod -G hdfs fusion`

* Appropriate proxyuser rules must exist in the HDFS configuration (`core-site.xml`) for the LiveData Plane user. In the example below, the LiveData Plane user is `fusion`:

  _Example_

  `hadooop.proxyuser.fusion.groups=*`

  `hadooop.proxyuser.fusion.hosts=*`

  If they do not exist, additional proxyuser rules can be added in the _Cluster-wide Advanced Configuration Snippet (Safety Valve) for core-site.xml_ section.

## Prerequisites

* The Kerberos keytab and principal to be used with LiveData Plane has already been created.
* Root access to the Kerberos KDC or a cluster node to retrieve the keytab and `krb5.conf` files.

## Guidance

1. Transfer the keytab and `krb5.conf` to the LiveData Plane docker host from the Kerberos KDC or a cluster node that contains the required files. This can be done by copying the files to your local machine, and then copying them to the LiveData Plane docker host.

   _Example for local transfer_

   Open a terminal session and download the required files from the KDC/node via SCP to your local machine.

   `scp $HOSTNAME:/etc/krb5.conf .`

   `scp $HOSTNAME:/etc/security/keytabs/${fusion.keytab} .`

   Once obtained locally, transfer the files to the LiveData Plane docker host.

   `scp krb5.conf $DOCKER_HOST:~`

   `scp ${fusion.keytab} $DOCKER_HOST:~`

2. Obtain the HDFS client config from the cluster manager.

   Cloudera Manager UI -> HDFS -> Actions -> Download Client Configuration

3. Transfer the Client config to the LiveData Plane docker host.

   `scp hdfs1-clientconfig.zip $DOCKER_HOST:~`

4. Log into the LiveData Plane docker host, and copy the keytab and `krb5.conf` into the specified staging directories within the git repository.

   Ensure the keytab is renamed to `fusion.keytab` inside the `fusion-docker-compose/keytabs` directory.

   `cp ${fusion.keytab} /path/to/fusion-docker-compose/keytabs/fusion.keytab`

   `cp krb5.conf /path/to/fusion-docker-compose/config_files/`

5. Decompress the HDFS Client config and edit the `core-site.xml` file to include additional properties.

   `unzip hdfs1-clientconfig.zip`

   `cd hadoop-conf`

   `vi core-site.xml`

   First, add the following properties as they are displayed below:

   ```json
     <property>
       <name>fusion.client.ssl.enabled</name>
       <value>false</value>
     </property>
     <property>
       <name>fusion.handshakeToken.dir</name>
       <value>/wandisco/handshake_tokens</value>
     </property>
     <property>
       <name>fusion.http.authentication.enabled</name>
       <value>false</value>
     </property>
     <property>
       <name>fusion.http.authorization.enabled</name>
       <value>false</value>
     </property>
     <property>
       <name>fusion.keytab</name>
       <value>/etc/security/keytabs/fusion.keytab</value>
     </property>
     <property>
       <name>fusion.replicated.dir.exchange</name>
       <value>/wandisco/exchange_dir</value>
     </property>
   ```

   Next, add the following properties below but adjust the values (prefixed with `$`) so that they are correct for your environment:

   ```json
     <property>
       <name>fs.fusion.underlyingFs</name>
       <value>hdfs://${CLUSTER_NAMESERVICE} or hdfs://${NAMENODE}:${PORT}</value>
     </property>
     <property>
       <name>fusion.principal</name>
       <value>${FUSION_PRINCIPAL}@${REALM}</value>
     </property>
     <property>
       <name>fusion.server</name>
       <value>${docker-hostname}:8023</value>
     </property>
   ```

   Note that the `fs.fusion.underlyingFs` value will depend if your cluster has NameNode HA enabled or not.

   Once complete, save and quit the file.

6. Transfer the relevant files to one of the docker containers in the CDH zone.

   You will first need to obtain an Container ID from the CDH zone, this will be a 12 digit hexadecimal string. Note that the `oneui` and `ubuntu` images cannot be used as they are not zone specific.

   `docker ps` _- obtain ID._

    Transfer the files to a persistent storage directory that is shared amongst all containers for the specified zone (i.e. `/etc/hadoop`).

   `docker cp core-site.xml $CONTAINER_ID:/etc/hadoop/conf/core-site.xml`

   `docker cp hdfs-site.xml $CONTAINER_ID:/etc/hadoop/conf/hdfs-site.xml`

   As this location is shared amongst all containers in the zone, it is only necessary to transfer these files to one of them.

7. Log into the LiveData Plane UI container for the CDH zone, and edit the `ui.properties` file.

   You will first need to obtain an Container ID from the CDH zone for the LiveData Plane UI, this will be a 12 digit hexadecimal string. The name of the image will appear much like this example - `fusion-docker-compose_fusion-ui-server-cdh_1`.

   `docker ps` _- obtain ID._

   `docker exec -u root -it $CONTAINER_ID /bin/bash`

   `vi /opt/wandisco/fusion-ui-server/properties/ui.properties`

   Add the following properties below, but adjust the values (prefixed with `$`) so that they are correct for your environment:

   ```json
   cluster.kerberos.configured=true
   kerberos.enabled=true
   kerberos.config.path=/etc/krb5.conf
   kerberos.principal=${FUSION_PRINCIPAL}@${REALM}
   kerberos.keytab.path=/etc/security/keytabs/fusion.keytab
   kerberos.generated.config.path=/opt/wandisco/fusion-ui-server/lib/kerberos.conf
   ```

   Once complete, save and quit the file.

8. Restart the container services via docker compose.

   `cd /path/to/fusion-docker-compose`

   `docker-compose restart`
