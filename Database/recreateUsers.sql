CREATE USER 'authService'@'localhost' IDENTIFIED BY 'authServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetroleclaims TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetroles TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetuserlogins TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetuserroles TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetusers TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetusertokens TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'authService'@'localhost';
FLUSH PRIVILEGES;