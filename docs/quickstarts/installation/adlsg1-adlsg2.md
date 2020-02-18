---
id: adlsg1-adlsg2
title: ADLS Gen1 to ADLS Gen2
sidebar_label: ADLS Gen1 to ADLS Gen2
---

Use this quickstart if you want to configure Fusion to connect to ADLS Gen1 storage and ADLS Gen2 storage.

Please see the [Useful information](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/troubleshooting/useful_info) section for additional commands and help.

## Prerequisites

To complete this quickstart, you will need:

* ADLS Gen1 storage account.
* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **Standard D4 v3 (4 vcpus, 16 GiB memory).**
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
  * The following utilities must be installed on the VM:
    * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
    * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

For guidance on how to create a suitable VM with all utilities installed, see our [Azure VM creation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_creation) guide. For guidance on how to install these utilities only, see our [Azure VM preparation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_prep) guide.

### Info you will need

* ADLS Gen1 storage account details:
  * [Hostname](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#create-a-data-lake-storage-gen1-account) (Example: `g1storage.azuredatalakestore.net`)
  * [Home Mount point](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-get-started-portal#createfolder) (Example: `/` or `/path/to/mountpoint`)
  * [Client/Application ID](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) (Example: `a73t6742-2e93-45ty-bd6d-4a8art6578ip`)
  * [Refresh URL](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) (Example: `https://login.microsoftonline.com/<tenant-id>/oauth2/token`)
  * [Handshake User](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-azure-active-directory-application) (Example: `fusionsp`)
  * [ADL Credential](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret) (Example: `8A767YUIa900IuaDEF786DTY67t-u=:]`)

* ADLS Gen2 storage account details:
  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Account key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

## Installation

Log in to your VM prior to starting these steps.

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

2. Change to the repository directory:

   `cd fusion-docker-compose`

3. Run the setup script:

   `./setup-env.sh`

4. Enter `n` when asked whether to use the Hortonworks Docker Sandbox.

5. Enter the zone details:

   * First zone type = `adls1`
   * First zone name = _press enter for the default value_

   * Second zone type = `adls2`
   * Second zone name = _press enter for the default value_

6. When prompted, press enter to use the default trial license or provide the absolute file system path to your own license on the VM.

   _Example:_  `/home/vm_user/license.key`

7. Enter your docker hostname, which will be the VM hostname.

   _Example:_  `docker_host01.realm.com`

8. Enter the [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) for the ADLS Gen1 zone (`3.6` or `4.0`). This is required even if you are not intending to use a HDI cluster.

9. When prompted to select a plugin for the ADLS Gen1 zone, press enter for `NONE`.

10. Enter the [HDI version](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning) for the ADLS Gen2 zone (`3.6` or `4.0`). This is required even if you are not intending to use a HDI cluster.

11. When prompted to select a plugin for the ADLS Gen2 zone, press enter for `NONE`.

12. You have now completed the setup, run the following to start your containers:

    `docker-compose up -d`

    Docker will now download all required images and create the containers, please wait until this is done.

## Configuration

### Configure the ADLS Gen1 zone

1. Log into the UI via a web browser with the VM's hostname/IP on port 8081.

   `http://<docker-hostname/IP>:8081/`

   Register your email address and password, and log in. Be sure to make a note of the password you choose.

2. On the OneUI dashboard, click on the **Settings** cog for the **adls1** zone, and fill in the details for your ADLS Gen1 storage account. See the [Info you will require](#info-you-will-require) section for reference.

3. Tick the **Use Secure Protocol** box.

4. Click **Apply Configuration**.

At this point, OneUI will return to the dashboard, and there will be a spinning circle where the settings cog was previously.

Wait for this to stop spinning and then continue.

### Configure the ADLS Gen2 zone

1. On the OneUI dashboard, click on the **Settings** cog for the **adls2** zone, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

2. Tick the **Use Secure Protocol** box.

3. Click **Apply Configuration**.

At this point, OneUI will return to the dashboard, and there will be a spinning circle where the settings cog was previously.

Wait for this to stop spinning and then continue.

## Replication

You now have the ability to create replication rules via the UI, see our [create a rule](../operation/create-rule) section for guidance.
