# Database
SQL scripts that can be executed to reproduce the database object definitions and table data. 
## Usage
Inside mysql command prompt:
* First create database:
```
CREATE DATABASE pingpongapp;
```
* Recreate users:
```
source recreateUsers.sql
```
* Switch to the database:
```
USE pingpongapp
```
* Recreate database structure:
```
source recreateDatabaseStrucuture.sql
```
* Seed data:
```
source sampleDataDump.sql
```
## EF Migrations
Since we are working with code first approach you can recreate database structure from entity framework migrations as well. To do that you need to navigate to project folder and execute command:
```
dotnet ef database update
```
However it will execute migrations just from this one service so whole process of recreating database may be litle tedious.
If you want to create your own migration:
```
dotnet ef migrations add NAME_OF_MIGRATION
```
