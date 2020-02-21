---
id: hdp_sandbox_lhv_client-adlsg2_lan
title: Hortonworks (HDP) Sandbox to Azure Databricks with LiveAnalytics
sidebar_label: HDP Sandbox to Azure Databricks with LiveAnalytics
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an Azure Databricks cluster.

This uses the [WANdisco LiveAnalytics](https://wandisco.com/products/live-analytics) solution, comprising both the Fusion Plugin for Databricks Delta Lake and Live Hive.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with Azure Databricks.
- Performing a sample data migration.

## Prerequisites

To complete this demo, you will need:

* ADLS Gen2 storage account with [hierarchical namespace](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace) enabled.
  * You will also need a container created inside this account.
* Azure Databricks cluster.
* Azure Virtual Machine (VM).
  * Minimum size recommendation = **Standard D4 v3 (4 vcpus, 16 GiB memory).**
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.
    * If creating your VM through the Azure portal, you may have insufficient disk space by default. See the [Microsoft docs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/expand-os-disk) for further info.

* The following utilities must be installed on the VM:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

For guidance on how to create a suitable VM with all utilities installed, see our [Azure VM creation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_creation) guide. For guidance on how to install these utilities only, see our [Azure VM preparation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_prep) guide.

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

5. You have now completed the setup, run the following to start your containers:

   `docker-compose up -d`

   Docker will now download all required images and create the containers, please wait until this is done.

## Configuration

### Integrate LiveAnalytics with your Databricks cluster

Your Databricks cluster must be **running** before integrating LiveAnalytics.

1. On your docker host, log in to a container for the ADLS Gen2 zone.

   `docker-compose exec fusion-server-adls2 bash`

[//]: <Awaiting improvements in ONEUI-1222>

2. Upload the LiveAnalytics 'datatransformer.jar'.

   `curl -v -H "Authorization: Bearer <bearer-token>" -F contents=@/opt/wandisco/fusion/plugins/live-deltalake/live-analytics-databricks-etl-6.0.0.1.jar -F path="/datatransformer.jar" https://<databricks-service-address>/api/2.0/dbfs/put`

   You will need to adjust this so that your `<bearer-token>` and `<databricks-service-address>` is used. See the [Info you will require](#info-you-will-require) section for reference.

   _Example_

   `curl -v -H "Authorization: Bearer dapibe21cfg45efae945t6f0b57dfd1dffb4" -F contents=@/opt/wandisco/fusion/plugins/live-deltalake/live-analytics-databricks-etl-6.0.0.1.jar -F path="/datatransformer.jar" https://westeurope.azuredatabricks.net/api/2.0/dbfs/put`

   If successful, you will see that the following within the output below:

   ```json
   < HTTP/1.1 100 Continue
   < HTTP/1.1 200 OK
   ```

4. Exit back into the docker host once complete.

   `exit`

5. Install a new library on your Databricks cluster, see the [Databricks documentation](https://docs.databricks.com/libraries.html#install-a-library-on-a-cluster) for details.

6. Select the following options for the Install Library prompt:

   * Library Source = `DBFS`

   * Library Type = `Jar`

   * File Path = `dbfs:/datatransformer.jar`

7. Select **Install** and wait for the **Status** of the jar to display as **Installed** before continuing.

### Configure the ADLS Gen2

Please ensure to enter your details for the **Storage account**, **Storage container** and **Account Key** values so that they match your account in Azure.
The examples shown below are for guidance only.

1. Log in to OneUI via a web browser

   `http://<docker_IP_address>:8081`

   Insert your email address and choose a password. Be sure to make a note of the password you choose.

2. Click on the **Settings** cog in the **ADLS GEN2** zone, and fill in the details for your ADLS Gen2 storage account. See the [Info you will require](#info-you-will-require) section for reference.

3. Tick the **Use Secure Protocol** box.

4. Click **Apply Configuration**

At this point, OneUI will return to the main page, and there will be a spinning circle where the Settings cog was previously.

Wait for this to stop spinning and move on to the next step.

### Check HDP services are started

The HDP sandbox services can take up to 5-10 minutes to start. You will need to ensure that the HDFS service is started before continuing.

1. Log in to the Ambari UI via a web browser.

   `http://<docker_IP_address>:8080`

   Username: `admin`
   Password: `admin`

2. Select the **HDFS** service.

3. Wait until all the HDFS components are showing as **Started**.

### Live Hive activation

1. Go back to the OneUI interface.

   `http://<docker_IP_address>:8081`

2. Click on the **fusion-server-sandbox-hdp** link in the **HCFS HDP** zone to open the UI for this zone in a new tab.

3. Click on **Settings -> Live Hive: Plugin Activation**, then scroll back to the top of the page and click **Activate**.

4. When prompted reload the page, then go back to the OneUI tab.

### Setup Databricks in Fusion

[//]: <Awaiting improvements in ONEUI-1222>

1. Go to the Fusion UI for the ADLS Gen2 zone by clicking on the **fusion-server-adls2** link, which will open a new tab.

2. Enter your Databricks Configuration details on the Settings page (as mentioned in the [Info you will require](#info-you-will-require) section) and **Update**.

   **Fusion UI -> Settings -> Databricks: Configuration**

## Replication

Follow the steps below to demonstrate live replication of HCFS data and Hive metadata from the HDP sandbox to the Azure Databricks cluster.

### Create replication rules

1. Return to the OneUI interface.

    `http://<docker_IP_address>:8081`

2. Click on the plus sign next to **Rules**.

3. Set **Rule Name** to `warehouse`

4. Set **Path for all zones** to `/apps/hive/warehouse`

5. Click **Next** then click **FINISH**.

6. Log in to the Fusion UI for the HDP zone by clicking on the **fusion-server-sandbox-hdp** link.

7. Enter the Replication tab, and select to **+ Create** a replication rule.

[//]: <INC-846>

8. Create a new Hive rule using the UI with the following properties:

   * Type = `Hive`

   * Database name = `databricks_demo`

   * Table name = `*`

   * Description = `Demo` _- this field is optional_

   Click **Create rule** once complete.

9. Both rules should now display on the **Replication** tab in the Fusion UI.

### Test replication

Your Databricks cluster must be **running** before testing replication.

1. Return to the terminal session on the **Docker host**.

2. Log in to the **sandbox-hdp** container as the hdfs user and place data into HDFS.

   a. Log in to the container.

   `docker-compose exec -u hdfs -w /tmp sandbox-hdp bash`

   b. Obtain the sample data to be used with the Hive table.

   `curl -LOf https://github.com/pivotalsoftware/pivotal-samples/raw/master/sample-data/customer_addresses_dim.tsv.gz`

   c. Create a directory within HDFS for the sample data.

   `hdfs dfs -mkdir -p /retail_demo/customer_addresses_dim_hive/`

   d. Place the sample data into HDFS, so that it can be accessed by Hive.

   `hdfs dfs -put customer_addresses_dim.tsv.gz /retail_demo/customer_addresses_dim_hive/`

3. Use beeline to start a Hive session and connect to the Hiveserver2 service as hdfs user.

   `beeline -u jdbc:hive2://sandbox-hdp:10000/ -n hdfs`

4. Create a database to store the sample data.

   `CREATE DATABASE IF NOT EXISTS retail_demo;`

5. Create a table inside the database that points to the data previously uploaded.

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

6. Create a second database matching the Database name in the Hive replication rule created earlier.

   `CREATE DATABASE IF NOT EXISTS databricks_demo;`

7. Create a table inside this second database:

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

8. Now insert data into the table:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'CA';`

   This launches a Hive job that inserts the data values provided in this example. If successful, the STATUS will be **SUCCEEDED**.

   ```json
   --------------------------------------------------------------------------------
           VERTICES      STATUS  TOTAL  COMPLETED  RUNNING  PENDING  FAILED  KILLED
   --------------------------------------------------------------------------------
   Map 1 ..........   SUCCEEDED      1          1        0        0       0       0
   --------------------------------------------------------------------------------
   VERTICES: 01/01  [==========================>>] 100%  ELAPSED TIME: X.YZ s
   --------------------------------------------------------------------------------
   ```

   The data will take a few moments to be replicated and appear in the Databricks cluster.

### Setup Databricks Notebook to view data

1. Create a [Cluster Notebook](https://docs.databricks.com/notebooks/notebooks-manage.html#create-a-notebook) with the details:

   * Name: **WD-demo**
   * Language: **SQL**
   * Cluster: (Choose the cluster used in this demo)

2. You should now see a blank notebook.

   a. Inside the 'Cmd 1' box, add the query:

   `SELECT * FROM databricks_demo.customer_addresses_dim_hive;`

   b. Click 'Run Cell'.

3. Wait for the query to return, then select the drop-down graph type and choose **Map**.

4. Under the Plot Options > remove all Keys > click and drag 'state_code' from the 'All fields' box into the 'Keys' box.

5. Click Apply.

6. You should now see a plot of USA with color shading - dependent on the population density.

7. If desired, you can repeat this process except using the Texas state code instead of California.

   a. Back in the Hive beeline session on the **fusion_sandbox-hdp_1** container, run the following command:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'TX';`

   b. Repeat from step 3 to observe the results for Texas.

You have now completed this demo.

## Troubleshooting

* See our [Troubleshooting](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/troubleshooting/hdp_sandbox_lan_troubleshooting) guide for help with this demo.

* Contact [WANdisco](https://wandisco.com/contact) for further information about Fusion.

See the [shutdown and start up](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/operation/hdp_sandbox_fusion_stop_start) guide for when you wish to safely shutdown or start back up the environment.
