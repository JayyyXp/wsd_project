# wsd_project
This is an app for logging daily activities 

## TO RUN APP LOCALLY

1. Create a **POSTGRE** database and create the necessary tables by running the commands found in **createTable.sql**
2. Add your database credentials to the **env** file and change it's name to **.env** 
3. Run the below command

`deno run --allow-env --allow-read --allow-write  --allow-net --unstable app.js`

##### or 

1. Create a **POSTGRE** database and create the necessary tables by running the commands found in **createTable.sql**
2. Fill your database credentials and run the below command

`PGHOST='your_DB_hostname' PGDATABASE='your_DB_database' PGUSER='your_DB_user' PGPASSWORD='your_DB_password' PGPORT='your_DB_port' deno run --allow-env --allow-read --allow-write  --allow-net --unstable app.js`

the above commands has been tested to work with windows/wsl

## ACCESS THE APP AT

The app is found [here](https://my-wsdproject.herokuapp.com/)

## TO RUN THE TESTS

There are no tests to run

### Problems?

You can [contact](https://t.me/hopplus) me @hopplus in Telegram
