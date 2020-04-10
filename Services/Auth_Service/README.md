# AuthService
Service responsible for user authentication and authorization.
## Endpoints
### Public key
```
GET http://localhost:5000/api/publickey
```
Returns public key allowing other services to verify tokens on their own.
### Login
```
POST http://localhost:5000/api/login
```
Example request body:
```
{
	"email":"jkowalski@gmail.com",
	"password":"haslo1"
}
```
If credentials are valid returns Ok with token in body, Unauthorized otherwise.

Example response body:
```
{
    "token": "eyJ...F3C-vA"
}
```
### Register
```
POST http://localhost:5000/api/register
```
Example body:
```
{
	"email":"jkowalski@gmail.com",
	"password":"haslo1",
	"firstName": "Jan",
	"lastName": "Kowalski"
}
```
Returns empty Ok response if registered successfully or error message if something went wrong.
## TODO
* register method should return created user