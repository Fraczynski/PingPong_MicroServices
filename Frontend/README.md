# Frontend

## Requirements

**node.js 12.13.1**  
https://nodejs.org/dist/v12.13.1/node-v12.13.1-x64.msi

**angular cli**  
npm install -g @angular/cli@8.3.25

## Usage
First you need to download all required dependencies. Inside project folder:
```
npm install
```
To serve angular app:
```
ng serve
```
To serve it over https: 
```
ng serve --ssl --ssl-key .\certificates\localhost.key  --ssl-cert .\certificates\localhost.crt 
```