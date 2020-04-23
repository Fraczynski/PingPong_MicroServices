CREATE USER 'openingService'@'localhost' IDENTIFIED BY 'openingServicePassword';
GRANT ALL PRIVILEGES ON pingpongapp.SpecialOpeningHours TO 'openingService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.OpeningHours TO 'openingService'@'localhost';
GRANT ALL PRIVILEGES ON pingpongapp.__efmigrationshistory TO 'openingService'@'localhost';
FLUSH PRIVILEGES;