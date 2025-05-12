# NM Forest Industry Map and Data Collection Website

> **Tri Blankley, Jena Peterson**  
> **Contributors:** Dominic DOnofrio  
> **Date:** May 13th, 2025

## Spinning up the Website:

### Creating Landowner and Industry Survey Databases

- Check Database-Info file for SQL code and business data.
- Use the given create statements to create the tables (If not using MySQL, the format may need to change)
- Use the csv documents to import business data and type of work. 

### Create the .env file to be able to connect to the database

- This is where the information to connect to the database is kept. If the database is not being run on a Microsoft MySQL Azure server, the connection information within server.js may need to change.
- If using Microsoft Azure, add DigiCertGlobalRootCA.crt.pem into the NM_Forestry file. It can be found [here](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/how-to-connect-tls-ssl#download-the-public-ssl-certificate)
- .env file should be as follows

  > Industry / Business Database  
  > busDB_HOST=(server name)  
  > busDB_USER=(username)  
  > busDB_PASSWORD=(password)  
  > busDB_NAME=(database name)

  > Landowner Database  
  > landDB_HOST=(server name)  
  > landDB_USER=(username)  
  > landDB_PASSWORD=(password)  
  > landDB_NAME=(database name)


### Spin an instance of the website with Docker. These commands may require super-user access to execute depending on your system's access settings.

- The docker file will run the node.js server connecting to the Microsoft database and the npm server providing the locally hosted instance of the website. When you add or remove npm packages from the website, you may have to rebuild the docker container to see those changes reflected.
- Install docker on your system, if on linux distributions that use apt use
- - $ apt-get install docker
- Build the docker environment with
- - $ docker compose build
- Run the docker environment with:
- - $ docker compose up
