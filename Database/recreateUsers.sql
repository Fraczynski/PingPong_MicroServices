CREATE USER 'authService'@'localhost' IDENTIFIED BY 'authServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetroleclaims TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetroles TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetuserlogins TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetuserroles TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetusers TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.aspnetusertokens TO 'authService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'authService'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'roomsService'@'localhost' IDENTIFIED BY 'roomsServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.rooms TO 'roomsService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.tables TO 'roomsService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'roomsService'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'openingService'@'localhost' IDENTIFIED BY 'openingServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.SpecialOpeningHours TO 'openingService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.OpeningHours TO 'openingService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.ClosingDays TO 'openingService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'openingService'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'reservationService'@'localhost' IDENTIFIED BY 'reservationServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.reservations TO 'reservationService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'reservationService'@'localhost';
GRANT REFERENCES ON pingpongapp.tables TO 'reservationService'@'localhost';
GRANT REFERENCES ON pingpongapp.aspnetusers TO 'reservationService'@'localhost';
FLUSH PRIVILEGES;