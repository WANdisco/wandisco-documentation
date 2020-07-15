---
id: kerberos_hdp
title: Kerberos (HDP) integration with Fusion
sidebar_label: Kerberos (HDP) integration with Fusion
---

[//]: <To-do = NameNode Proxy integration.>

_THIS GUIDE IS WORK IN PROGRESS, PLEASE DO NOT FOLLOW ANYTHING HERE UNTIL THIS WARNING IS REMOVED_

## Introduction

This guide should be followed when you want to enable your Fusion installation to work with a Kerberized Hortonworks (HDP) cluster.

## Prerequisites

* See [Quickstart guidance](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/installation/installation-quickstarts) for instructions on how to install and configure Fusion with a HDP zone.
* An `/etc/hosts` entry for the Docker hostname plus `fusion-server-hdp` on all nodes in the HDP cluster.

  _Example -_ `172.0.0.4  docker_host01 fusion-server-hdp`
* KDC administrator credentials for the HDP cluster.
* A Kerberos keytab and principal to be used with Fusion. The principal must map to a user that has superuser permissions. This is commonly done by using the HDFS keytab with Fusion.
  - - -
  This could also be done by creating a keytab and principal for Fusion with either:
  * An [auth_to_local](https://docs.cloudera.com/HDPDocuments/HDP3/HDP-3.1.4/security-reference/content/kerberos_nonambari_creating_mappings_between_principals_and_unix_usernames.html) rule that maps the Fusion principal to a superuser.

    _Example rule_ - `RULE:[1:$1@$0](fusionuser@WANDISCO.HADOOP)s/.*/hdfs/`
  * An [auth_to_local](https://docs.cloudera.com/HDPDocuments/HDP3/HDP-3.1.4/security-reference/content/kerberos_nonambari_creating_mappings_between_principals_and_unix_usernames.html) rule that maps the Fusion principal to a user that is added to the HDFS supergroup on the NameNodes.

    _Example rule_ - `RULE:[1:$1@$0](fusionuser@WANDISCO.HADOOP)s/.*/fusionuser/`

    _Example command on NameNodes_ - `usermod fusionuser -G hdfs`
  - - -
* The keytab to be used with Fusion should be stored in the `/etc/security/keytabs` directory on the Ambari Server.

## Integrating Kerberos with Fusion

This method will allow the Hadoop configuration and Kerberos keytabs to be shared with the Fusion installation, by inducting a specific container into the HDP cluster.

### Add the SSHD container to the HDP cluster

1. Log in to the Docker host, and switch to the fusion-docker-compose directory.

   `cd /path/to/fusion-docker-compose`

2. Ensure the Fusion containers are running.

   `docker-compose ps`

3. Run a command to obtain the private key of the SSHD container for the HDP zone.

   `docker logs fusion_sshd-hdp_1`

   _Example output_

   ```text
   -----BEGIN RSA PRIVATE KEY-----
   MIIEogIBAAKCAQEAuK38KexpwnOYE+hI0a+UXtgNoE1JVPp0n+/DOCTs9AKkpm8e
   bwkVg/sErvRQ63l0gPc7YXiQClc7Ha11rUe1rTez8Hx0MmDcWEwiuFT3Hoonc3Sh
   WNqcua7R8+r+HOS5+CRHAx/25ogdPeygX+U+PyIutGHvHI4I37Z/tRwmakFlfLuF
   jgcqjhuqfjY60hM90aoyL2AnGb5pfsEKo2hB8oEquNciuPJo5FHk+3NFpOWLMcwG
   1OQpHjoBLNxZuuZP2C6KTQjodvuLIx/DaA33t2MIJQVKn0sL3wp2PP/ZD59CVqbV
   XmaDoNG0jm0b+PYH97MBS2p2BCVGqskx7TvR6QIDAQABAoIBAB+HrNang0Lso1k6
   vjv2gxlSP7lPmKaGgCTSNX0/aKkcTmoP7J1+asr2r00Db1FUkhx2mSQNBmKNlA00
   ETQ9Wvow2WrEhL4ZJWV50i+waeRv595hWi6mXD2jaDsBstLSBiIkZ29UJL4lHQD2
   hkb5B5CV0G2BjuZMJZ20NceA/9oB+AALfo+X6wR610AkWXCDJOClJHbU6fa8fPAO
   pp+ucbsZ1EIuCpupV3lWZpDJw4Jw2aqDrIq7UX+hqfE38pePSBL6jLHiQACEyehU
   lqbmSInZFuMSAjuVK/Ewp8nxsEAJ4gH4RJx6DcE0XnaGEO03b6aFDqktbv0jhKWS
   igJHGAECgYEA38KQxlbcxWPW1CclHlJG4tou8hDjPWZ4haEVujxsvrKpbVethxsM
   4Q7VK4ePbIwnEAHjHZw48hsXCumk1ECo91N48L/YuxHWwuRMm9KozbxjyQUl2tjg
   u8nCSXWWDj89VW+Z+Q8ye3DHr7m8JaarSafy5Pov+XSvmXUfIxLBQwECgYEA00nu
   YGxZiTy2jhwL7V7QvUMqsFgc8AXnYcKLG1wXGJhUCVbzjFcKIofEnUiYIfDPl7uJ
   S7tQiaeRkl9z7YuV1GH2vtu2WJL/zItG8uFy0CbvNsrsVXMxYFeegAwKijsonGR/
   K4ZCdrao8sIli+EHkmgUAYrzmgoDoFr4M5RT1ukCgYBNiMjLwUuMplTJfKry/8WK
   U9oSjOGA5CH9A91YhBmWVqg4uDnr5+alkZMyGy4KieH7PPwqxXhCBDsOz/kKh0FF
   Okpc+c0qvTqym5MkJ3HQoGooPwZn9+CfkYDeHX2agDVLhnj2TFrMxT6cWHqmfUM7
   KZQT3dGD2fgC77+TUqtfAQKBgA3offKG71XjUzkDi51yclcjBrpY8n6yRMrgnXuN
   kk+iJ1X+DUYdrKMdQMoBr1H8og2g4KbFi8Wj7CcwdVcbqx8x26YwnE40TvZN7Lus
   L3yYM4Lt1KTDUmq/GcXgBQmYX1H8I4rf6Zwa5gAk24fbpj3y7+4yEVsAccCrie8L
   QoGRAoGAHk/qaX1BTLOtjp6pc7TfYAUpPkhBHjT22eQOjdlUxfV6nbun/pN1/ZXP
   v1a+mgvGqUw24CP+2ZBcLICSk4dlSECy6tUyvLle7iEYMrMRZDyxVrxtFwG3NZKH
   LYoIZTJyKjilWf2otcq/CXief6NA5yfQyK7b3MCYTA6kyV/KlyZ=
   -----END RSA PRIVATE KEY-----
   ```

   Save this private key as a file (e.g. `hdp-key.pem`) or copy to clipboard to be used later.

4. Log in to the Ambari Server via a terminal session and confirm that the container is accessible via ssh.

   `ssh -i hdp-key.pem -p 2022 root@<docker-hostname>`

   Either copy the `hdp-key.pem` file over to the Ambari Server or create the file and paste in the contents of your clipboard. You can exit the container once SSH access is confirmed.

   You may need to set permissions of the key to read only before using it.

   _Example_

   `chown 400 hdp-key.pem`

5. Log in to the Ambari UI and select to Add New Hosts.

   **Ambari UI -> Hosts -> Actions -> Add New Hosts**

6. In the Add Host Wizard, provide the following information:

   * Target Hosts - Enter the docker hostname in this field.
   * Host Registration Information - Provide the contents of the private key file from the docker SSHD container (i.e. `hdp-key.pem`).
   * SSH Port Number - change the port number to `2022`.

   Click **REGISTER AND CONFIRM** when done.

7. Wait for the host checks are completed in the **Confirm Hosts** step.

   [//]: <DAP-180>

   There is a possibility that the Java version required will not be installed on the SSHD container. If so, then you will need to transfer the JDK to the SSHD container.

   _Example_

   `[root@<AMBARI_SERVER> ~]# scp -i hdp-key.pem -P 2022 /usr/java/jdk1.8.0_XYZ.tar.gz <SSHD_CONTAINER>:~`

   `[root@<AMBARI_SERVER> ~]# ssh -i hdp-key.pem -p 2022 <SSHD_CONTAINER>`

   `[root@<SSHD_CONTAINER> ~]# mkdir -p /usr/java`

   `[root@<SSHD_CONTAINER>> ~]# tar -xf jdk1.8.0_XYZ.tar.gz -C /usr/java/`

   - - -

   Check that the JCE policy is set to unlimited strength (see the [Oracle bug report](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8170157) for further information), the output from the command below should read `true` if this is the case.

   `/usr/java/jdk1.8.0_XYZ/bin/jrunscript -e 'print (javax.crypto.Cipher.getMaxAllowedKeyLength("RC5") >= 256);'`

   If the command returns `false`, you may want to enable unlimited strength policies.

   * **Java 8 Update 161 or higher** - Edit the `java.security` file in `/usr/java/jdk1.8.0_XYZ/jre/lib/security` (for JDK) or `/usr/java/jdk1.8.0_XYZ/lib/security` (for JRE). Uncomment or include the line:

     `crypto.policy=unlimited`

   * **Java 8 Update 160 or below** - Download the unlimited strength JCE policy files from Oracle [here](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) and transfer the zip file to the SSHD container. Log in to the container afterwards.

     `[root@<AMBARI_SERVER> ~]# scp -i hdp-key.pem -P 2022 jce_policy-8.zip <SSHD_CONTAINER>:~`

     `[root@<AMBARI_SERVER> ~]# ssh -i hdp-key.pem -p 2022 <SSHD_CONTAINER>`

     _or_

     `root@<DOCKER_HOST>:~# docker cp jce_policy-8.zip <CONTAINER-ID_of_fusion_sshd-hdp_1>:/root/`

     `root@<DOCKER_HOST>:~# docker exec -it fusion_sshd-hdp_1 bash`

     Extract the policy files and replace the existing policy JAR files in `/usr/java/jdk1.8.0_XYZ/jre/lib/security` with the unlimited policy ones.

     `[root@<SSHD_CONTAINER>> ~]# unzip jce_policy-8.zip`

     `[root@<SSHD_CONTAINER>> ~]# cp UnlimitedJCEPolicyJDK8/US_export_policy.jar /usr/java/jdk1.8.0_XYZ/jre/lib/security/`

     `[root@<SSHD_CONTAINER>> ~]# cp UnlimitedJCEPolicyJDK8/local_policy.jar /usr/java/jdk1.8.0_XYZ/jre/lib/security/`

     Select to overwrite the existing files when prompted.

   - - -

   Any warnings relating to the `/etc/hadoop` path should be ignored as the SSHD container will use symlinks to retain Hadoop configuration.

   Click Next once complete.

8. On the **Assign Slaves and Clients** step, ensure that the Client option is selected for the Docker host. Click Next once confirmed.

9. On the **Configurations** step, unless a specific Configuration Group is required, leave the services on Default and click Next.

10. Click Deploy on the **Review** step.

11. If Kerberos is enabled on the cluster, enter your KDC administrator credentials on the pop-up window and click Save.

12. Wait until the **Install, Start and Test** procedure is complete, then click Next.

13. On the Summary page, click Complete.

### Configure the HDP cluster

[//]: <DAP-182 - Unable to use Old UI to set Manager configuration.>

[//]: <DAP-183>

1. Transfer the Kerberos configuration file for the cluster into the SSHD container.

   `[root@<AMBARI_SERVER> ~]# scp -i hdp-key.pem -P 2022 /etc/krb5.conf <SSHD_CONTAINER>:/etc/shared/krb5.conf`

2. If required, transfer the keytab to be used with Fusion to the SSHD container.

   `[root@<AMBARI_SERVER> ~]# scp -i hdp-key.pem -P 2022 /etc/security/keytabs/${FUSION_KEYTAB}.keytab <SSHD_CONTAINER>:/etc/security/keytabs/`

   This should not be required if using an auto-generated keytab (such as the `hdfs` keytab) within the `/etc/security/keytabs` directory, as it will have been mapped to the SSHD container automatically.

3. Create two directories within HDFS on the cluster that will be used specifically by Fusion (ensure to `kinit` beforehand).

   `[root@<AMBARI_SERVER> ~]# hdfs dfs -mkdir -p /wandisco/exchange_dir`

   `[root@<AMBARI_SERVER> ~]# hdfs dfs -mkdir -p /wandisco/handshake_tokens`

   Ensure they are owned by the Fusion user, in the example below, the Fusion user will be `hdfs`.

   `[root@<AMBARI_SERVER> ~]# hdfs dfs -chown hdfs:hdfs -R /wandisco`

4. Add Fusion properties to the HDFS config on the cluster.

   **Ambari UI -> HDFS -> Configs -> Advanced -> Custom core-site**

   Select to add the properties below in **Bulk property add mode**.

   ```text
   fusion.client.ssl.enabled=false
   fusion.handshakeToken.dir=/wandisco/handshake_tokens
   fusion.http.authentication.enabled=false
   fusion.http.authorization.enabled=false
   fusion.replicated.dir.exchange=/wandisco/exchange_dir
   fusion.server=fusion-server-hdp:8023
   ```

   Next, add the properties below but adjust the values (encased with `${}`) so that they are correct for your environment:

   ```text
   fs.fusion.underlyingFs=hdfs://${CLUSTER_NAMESERVICE} or hdfs://${NAMENODE}:${PORT}
   fusion.keytab=/etc/security/keytabs/${FUSION_KEYTAB}.keytab
   fusion.principal=${FUSION_PRINCIPAL}@${REALM}
   hadoop.proxyuser.${FUSION_USER}.hosts=fusion-server-hdp
   hadoop.proxyuser.${FUSION_USER}.groups=*
   ```

   _Example_

   ```text
   fs.fusion.underlyingFs=hdfs://nameservice01
   fusion.keytab=/etc/security/keytabs/hdfs.keytab
   fusion.principal=hdfs-hdp-01@$REALM.COM
   hadoop.proxyuser.hdfs.hosts=fusion-server-hdp
   hadoop.proxyuser.hdfs.groups=*
   ```

   If the `hadoop.proxyuser.${FUSION_USER}.hosts` property already exists with predefined hostnames, please append `fusion-server-hdp` to the value (comma-delimited).

   _Example -_ `hadoop.proxyuser.hdfs.hosts=hdp_namenode01,hdp_namenode02,fusion-server-hdp`

   If this property value is a wildcard (`*`), then it does not need to changed.

   **Save** the HDFS config once all additions have been made.

5. **Restart the cluster services.**

### Configure Fusion

1. Log in to the Docker host via terminal, edit the `ui.properties` file on the Fusion UI container in the HDP zone.

   `root@<DOCKER_HOST>:~# docker exec -it fusion_fusion-ui-server-hdp_1 bash`

   `[hdfs@<FUSION_UI_HDP> /]$ vi /opt/wandisco/fusion-ui-server/properties/ui.properties`

   Add the following properties below, but adjust the values (prefixed with `$`) so that they are correct for your environment:

   ```json
   cluster.kerberos.configured=true
   kerberos.enabled=true
   kerberos.config.path=/etc/krb5.conf
   kerberos.principal=${FUSION_PRINCIPAL}@${REALM}
   kerberos.keytab.path=/etc/security/keytabs/${FUSION_KEYTAB}.keytab
   kerberos.generated.config.path=/opt/wandisco/fusion-ui-server/lib/kerberos.conf
   ```

   Once complete, save and quit the file. Exit the container once complete.

   `exit`

[//]: <DAP-173>

2. Adjust the ownership of required files inside of one of the Fusion containers in the HDP zone.

   `root@<DOCKER_HOST>:~# docker exec -u root -it fusion_fusion-server-hdp_1 bash -c 'chown hdfs:hdfs /etc/security/keytabs/hdfs.headless.keytab /etc/hadoop/conf/core-site.xml /etc/hadoop/conf/hdfs-site.xml'`

3. Restart the Fusion containers in the HDP zone (except SSHD) so that the configuration is picked up by Fusion. You must be inside the `fusion-docker-compose` directory to run this command.

   `root@<DOCKER_HOST>:~/fusion-docker-compose# docker-compose restart fusion-ihc-server-hdp fusion-server-hdp fusion-ui-server-hdp fusion-nn-proxy-hdp`

## Troubleshooting

### Starting the Ambari Agent

When restarting the SSHD container (or all containers), the `ambari-agent` service will not be started automatically.

To start it, log in to the Docker host and run the command below:

`docker exec -it fusion_sshd-hdp_1 bash -c 'ambari-agent start'`
