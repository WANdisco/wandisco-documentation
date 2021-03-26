---
id: test-cdh-sandbox-liveanalytics
title: Test CDH Sandbox with LiveAnalytics
sidebar_label: LiveAnalytics
---

Follow the steps below to demonstrate live replication of HCFS data and Hive metadata from the CDH sandbox to your Databricks cluster.

The CDH Sandbox will be the [source](../../help/glossary/s.md#source) storage in all instances.

### Create replication rules

1. On the dashboard, create a **HCFS** rule with the following parameters:

   * Rule Name = `warehouse`
   * Path for all storages = `/user/hive/warehouse`
   * Default exclusions
   * Preserve HCFS Block Size = *True*

1. Create a **Hive** rule with the following parameters:

   * Rule Name = `Demo`
   * Pattern to match database names = `databricks_demo`
   * Pattern to match table names = `*`

   Both rules are then displayed.

### Test HCFS replication

1. Log in to **Hue** via a web browser.

   `http://<dockerhost_IP_address>:8889`

   Username: `hdfs`
   Password: `hdfs`

1. Go to **Menu** -> **Files**.

1. Move to `/user/hive/warehouse` path and **Upload** any file from your host machine.

1. Check the uploaded file is in the `/user/hive/warehouse` directory on your ADLS Gen2 container.

#### Test large data sets (optional)

To replicate larger amounts of data, see our [LiveData testing](./test-cdh-sandbox-livedata.md#test-large-data-sets-optional) guide.

### Test Hive replication

Your Databricks cluster must be **running** before testing Hive replication. Sample data is provided in this CDH Sandbox.

1. Log in to **Hue** via a web browser.

   `http://<dockerhost_IP_address>:8889`

   Username: `hdfs`
   Password: `hdfs`

1. To create a database for the sample data, add the query below inside the **Hive** box and click the **play** button:

   `CREATE DATABASE IF NOT EXISTS retail_demo;`

1. Create a table inside the database that points to the sample data, add the query below inside the **Hive** box and click the **play** button:

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

1. Create a second database matching the Database name in the Hive replication rule created earlier:

   `CREATE DATABASE IF NOT EXISTS databricks_demo;`

1. Create a table inside the second database:

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

1. Insert data into the table:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'CA';`

   :::info
   The data takes a couple of minutes to be replicated and appear in the Databricks cluster. This is because the Datatransformer jar (`etl.jar`) is installed in the Databricks library during the first transfer of Hive data.
   :::

1. A Hive job inserts the data values provided in this example.
   Select the **jobs** service. If successful, the STATUS displays **SUCCEEDED**.

### Setup Databricks Notebook to view data

1. Create a [Cluster Notebook](https://docs.databricks.com/notebooks/notebooks-manage.html#create-a-notebook) with these details:

   * Name: **WD-demo**
   * Language: **SQL**
   * Cluster: (Choose your cluster)

   You should now see a blank notebook.

1. Inside the **Cmd 1** box, add the query and **Run Cell**:

   `SELECT * FROM databricks_demo.customer_addresses_dim_hive;`

1. Wait for the query to return, then select the drop-down graph type and choose **Map**.

1. Under the Plot Options, remove all **Keys** that are present.

1. Configure the map with the following:

   * Keys: **state_code**
   * Values: **customer_id**

   You should now see a plot of USA with color shading - dependent on the population density.

1. Repeat these steps to view data from a different state.
   
   _Example for Texas_

   Back in the **Hue** interface, run the following command:

   `INSERT INTO databricks_demo.customer_addresses_dim_hive SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code = 'TX';`

   Repeat from step 3 to observe the results for Texas.

## Next steps

You have now successfully replicated data from your CDH Sandbox to your target storage and Databricks cluster. Contact [WANdisco](https://wandisco.com/contact) for further information about LiveData Plane and what it can offer you.
