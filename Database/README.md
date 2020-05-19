# Database
SQL scripts that can be executed to reproduce the database object definitions and table data. 
## Requirements 
**MySQL server**
```
https://dev.mysql.com/downloads/installer/
```
## Usage
Inside mysql command prompt:
First create database:
```
CREATE DATABASE pingpongapp;
```
Recreate users:
```
source recreateUsers.sql
```
Switch to the database:
```
use pingpongapp
```
Since we have some polish letters inside sample dump we need to:
```
SET names 'utf8';
```
Recreate database structure:
```
source recreateDatabaseStructure.sql
```
Seed data:
```
source sampleDataDump.sql
```
## EF Migrations
First you will need **Entity framework tools**:
```
dotnet tool install --global dotnet-ef
```
Since we are working with code first approach you can recreate database structure from entity framework migrations as well. To do that you need to navigate to project folder and execute command:
```
dotnet ef database update
```
However it will execute migrations just from this one service so whole process of recreating database may be litle tedious.
If you want to create your own migration:
```
dotnet ef migrations add NAME_OF_MIGRATION
```
