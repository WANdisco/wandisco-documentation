---
id: hdp_sandbox_lhv_client-adlsg2_lan
title: Hortonworks (HDP) Sandbox to Azure Databricks with LiveAnalytics
sidebar_label: HDP Sandbox to Azure Databricks with LiveAnalytics
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an Azure Databricks cluster.

This uses the [WANdisco LiveAnalytics](https://wandisco.com/products/live-analytics) solution, comprising both the Fusion Plugin for Databricks Delta Lake and Live Hive.

What this guide will cover:

- Installing WANdisco Fusion and a HDP Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with Azure Databricks.
- Performing a sample data migration.

## Prerequisites

|For info on how to create a suitable VM with all services installed, see our [Azure VM creation](../preparation/azure_vm_creation) guide. See our [Azure VM preparation](../preparation/azure_vm_prep) guide for how to install the services only.|
|---|

To complete this demo, you will need:

* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Databricks cluster.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **Standard D4 v3 (4 vcpus, 16 GiB memory).**
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal (and not via our [guide](../preparation/azure_vm_creation)), you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following services must be installed on the VM:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* ADLS Gen2 storage account details:
  * [Account name](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) (Example: `adlsg2storage`)
  * [Container name](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) (Example: `fusionreplication`)
  * [Account key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage#view-access-keys-and-connection-string) (Example: `eTFdESnXOuG2qoUrqlDyCL+e6456789opasweghtfFMKAHjJg5JkCG8t1h2U1BzXvBwtYfoj5nZaDF87UK09po==`)

* Credentials for your Azure Databricks cluster:
  * [Databricks Service Address (Instance name)](https://docs.databricks.com/workspace/workspace-details.html#workspace-instance-and-id) (Example: `westeurope.azuredatabricks.net`)
  * [Bearer Token](https://docs.databricks.com/dev-tools/api/latest/authentication.html#generate-a-token) (Example: `dapibe21cfg45efae945t6f0b57dfd1dffb4`)
  * [Databricks Cluster ID](https://docs.databricks.com/workspace/workspace-details.html#cluster-url) (Example: `0234-125567-cowls978`)
  * [Unique JDBC HTTP path](https://docs.databricks.com/bi/jdbc-odbc-bi.html#construct-the-jdbc-url) (Example: `sql/protocolv1/o/8445611090456789/0234-125567-cowls978`)

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository to your Azure VM instance:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

2. Change to the repository directory:

   `cd fusion-docker-compose`

3. Run the setup script:

   `./setup-env.sh`

4. Enter `y` when asked whether to use the HDP sandbox.

5. You have now completed the setup, to create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers, please wait until this is done.

## Configuration

### Check HDP services are started

The HDP sandbox services can take up to 5-10 minutes to start. You will need to ensure that the HDFS service is started before continuing.

1. Log in to Ambari via a web browser.

   `http://<docker_IP_address>:8080`

   Username: `admin`
   Password: `admin`

2. Select the **HDFS** service.

3. Wait until all the HDFS components are showing as **Started**.

### Configure the ADLS Gen2 zone

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Insert your email address and choose a password. Be sure to make a note of the password you choose.

2. Click on the **Settings** cog for the **ADLS GEN2** zone, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

3. Tick the **Use Secure Protocol** box.

4. Click **Apply Configuration**.

You will be returned to the dashboard and there will be a spinning circle where the Settings cog was previously.

Wait for this to stop spinning and move on to the next step.

### Configure Fusion Plugin for Databricks Delta Lake

1. Click on the **Settings** cog in the **ADLS GEN2** zone, and fill in the details for your Databricks cluster. See the [Info you will require](#info-you-will-require) section for reference.

2. Click **Activate** and wait for the status to show as **Active** before continuing.

## Replication

Follow the steps below to demonstrate live replication of HCFS data and Hive metadata from the HDP sandbox to the Azure Databricks cluster.

### Create replication rules

1. On the dashboard, create a **HCFS** rule with the following parameters:

   * Rule Name = `warehouse`
   * Path for all zones = `/apps/hive/warehouse`
   * Default exclusions
   * Preserve HCFS Block Size = *True*

2. Now create a **Hive** rule with the following parameters:

   * Rule Name = `Demo`
   * Pattern to match database names = `databricks_demo`
   * Pattern to match table names = `*`

   Both rules should be displayed afterwards.

### Test HCFS replication

1. On the terminal for the **Docker host**, upload a test file to the `/apps/hive/warehouse` path in HDFS on the **sandbox-hdp** container.

   `docker-compose exec -u hdfs sandbox-hdp hdfs dfs -put /etc/services /apps/hive/warehouse/test_file`

2. Check that the `test_file` is now located in your `/apps/hive/warehouse` directory on your ADLS Gen2 container.

### Test Hive replication

Your Databricks cluster must be **running** before testing Hive replication.

1. Return to the terminal session on the **Docker host**.

2. Use beeline on the **sandbox-hdp** container to connect to the Hiveserver2 service as hdfs user:

   `docker-compose exec -u hdfs sandbox-hdp beeline -u jdbc:hive2://sandbox-hdp:10000/ -n hdfs`

3. Create a database to store the sample data:

   `CREATE DATABASE IF NOT EXISTS retail_demo;`

4. Create a table inside the database that points to the data previously uploaded:

   ```sql
   CREATE TABLE retail_demo.customer_addresses_dim_hive
   (
   Customer_Address_ID  bigint,
   Customer_ID          bigint,
   Valid_From_Timestamp timestamp,
   Valid_To_Timestamp   timestamp,
   House_Number         string,
   Street_Name          string,
   Appt_Suite_No        string,
   City                 string,
   State_Code           string,
   Zip_Code             string,
   Zip_Plus_Four        string,
   Country              string,
   Phone_Number         string
   )
   ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
   STORED AS TEXTFILE
   LOCATION '/retail_demo/customer_addresses_dim_hive/';
   ```

5. Create a second database matching the Database name in the Hive replication rule created earlier:

   `CREATE DATABASE IF NOT EXISTS databricks_demo;`

6. Create a table inside this second database:

   ```sql
   CREATE TABLE databricks_demo.customer_addresses_dim_hive
   (
   Customer_Address_ID  bigint,
   Customer_ID          bigint,
   Valid_From_Timestamp timestamp,
   Valid_To_Timestamp   timestamp,
   House_Number         string,
   Street_Name          string,
   Appt_Suite_No        string,
   City                 string,
   State_Code           string,
   Zip_Code             string,
   Zip_Plus_Four        string,
   Country              string,
   Phone_Number         string
   )
   stored as ORC;
   ```

7. Now insert data into the table:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'CA';`

   _The data will take a couple of minutes to be replicated and appear in the Databricks cluster. This is because during the first transfer of Hive data, the Datatransformer jar (`etl.jar`) will also be installed in the Databricks library._

   On the terminal, a Hive job will launch that inserts the data values provided in this example. If successful, the STATUS will be **SUCCEEDED**.

   ```json
   --------------------------------------------------------------------------------
           VERTICES      STATUS  TOTAL  COMPLETED  RUNNING  PENDING  FAILED  KILLED
   --------------------------------------------------------------------------------
   Map 1 ..........   SUCCEEDED      1          1        0        0       0       0
   --------------------------------------------------------------------------------
   VERTICES: 01/01  [==========================>>] 100%  ELAPSED TIME: X.YZ s
   --------------------------------------------------------------------------------
   ```

### Setup Databricks Notebook to view data

1. Create a [Cluster Notebook](https://docs.databricks.com/notebooks/notebooks-manage.html#create-a-notebook) with the details:

   * Name: **WD-demo**
   * Language: **SQL**
   * Cluster: (Choose the cluster used in this demo)

   You should now see a blank notebook.

2. Inside the **Cmd 1** box, add the query and **Run Cell**:

   `SELECT * FROM databricks_demo.customer_addresses_dim_hive;`

3. Wait for the query to return, then select the drop-down graph type and choose **Map**.

4. Under the Plot Options, remove all **Keys** that are present.

5. Click and drag **state_code** from the **All fields** box into the **Keys** box. Click **Apply** afterwards.

   You should now see a plot of USA with color shading - dependent on the population density.

6. If desired, you can repeat this process except using the Texas state code instead of California.

   Back in the Hive beeline session on the **fusion_sandbox-hdp_1** container, run the following command:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'TX';`

   Repeat from step 3 to observe the results for Texas.

_You have now successfully replicated data from your HDP Sandbox to your ADLS Gen2 container and Databricks cluster. Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion and what it can offer you._

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/hdp_sandbox_lan_troubleshooting) guide for help with this demo.

* See the [shutdown and start up](../operation/hdp_sandbox_fusion_stop_start) guide for when you wish to safely shutdown or start back up the environment.
