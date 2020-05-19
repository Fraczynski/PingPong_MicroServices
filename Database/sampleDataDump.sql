--
-- Dumping data for table `aspnetroleclaims`
--
LOCK TABLES aspnetroles
WRITE;
INSERT INTO aspnetroles VALUES
    (1, 'Customer', 'CUSTOMER', 'c3ccd19d-f6d9-4a70-aaa1-226623084606'),
    (2, 'Employee', 'EMPLOYEE', '1ce8397c-e399-4398-aeeb-5ce95d995f51'),
    (3,'Administrator','ADMINISTRATOR','47ca351c-a493-49bd-978a-d6940023c397');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusers`
--
LOCK TABLES aspnetusers WRITE;
INSERT INTO aspnetusers VALUES
    (1, 'jkowalski@gmail.com', 'JKOWALSKI@GMAIL.COM', 'jkowalski@gmail.com', 'JKOWALSKI@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAENCYrDq681G0gtkDGov+QN0ACbEaCwXzwlHvNdGtUvYUlPxIeGZCqcA4OPjOWjp6pQ==', 'PS2KO4XQ5L6IOJ6KETQJHDIFUX64Z3XG', 'e1bdff0c-bc4e-4343-a8f0-af06cd24a400', NULL, 0, 0, NULL, 1, 0, 'Jan', 'Kowalski',1),
    (2, 'pracownik@gmail.com', 'PRACOWNIK@GMAIL.COM', 'pracownik@gmail.com', 'PRACOWNIK@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAEBcS4aykJtlrJYAHa+hrI0RHJY2XE2J6DFYaqe1e69WrLxsOAth/nbf/0pcXp9YEwA==', 'BSXYCZITLXVJKNZNCVXIHOBIJO7LTIPF', 'bbbaa638-98d8-4c7f-b685-165e8f8768f0', NULL, 0, 0, NULL, 1, 0, 'Adam', 'Nowak',1),
    (3, 'administrator@gmail.com','ADMINISTRATOR@GMAIL.COM','administrator@gmail.com','ADMINISTRATOR@GMAIL.COM',0,'AQAAAAEAACcQAAAAEOZWhUpWtu8Lx0gbY13gPSg+v4QAu1T3dllQ6s03XBMU0Ig7dkRuL74bPCTq3ilXeQ==','ZXNUCNI7ZHZ7P5G25XUUTUCYLRUR2DC6','f483facf-114f-4893-b2d8-6ba4cd843ff7',NULL,0,0,NULL,1,0,'Janusz','Nazarko',1);
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserroles`
--
LOCK TABLES aspnetuserroles WRITE;
INSERT INTO aspnetuserroles VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 1),
    (3, 2),
    (3, 3);
UNLOCK TABLES;

--
-- Dumping data for table `rooms`
--

LOCK TABLES rooms WRITE;
INSERT INTO rooms VALUES
    (1, 'Główny', 24, 20,1),
    (2, 'Duży', 33, 33,1),
    (3, 'VIP', 23, 22,0);
UNLOCK TABLES;

--
-- Dumping data for table `tables`
--

LOCK TABLES tables WRITE;
INSERT INTO tables VALUES
    (1, 'Stol 1', 1, 1, 2.74, 1.525, 1, 1,1),
    (2, 'Stol 2', 5, 1, 2.74, 1.525, 1, 1,1),
    (3, 'Stol 3', 9, 1, 2.74, 1.525, 1, 1,1),
    (4, 'Stol 4', 13, 1, 2.74, 1.525, 1, 1,0),
    (5, 'Stol 1', 5, 1, 2.74, 1.525, 1, 3,1),
    (6, 'Stol 1', 3, 1, 2.74, 1.525, 1, 2,1),
    (7, 'Stol 2', 10, 1, 2.74, 1.525, 0, 2,1),
    (8, 'Stol 3', 13, 1, 2.74, 1.525, 0, 2,1);
UNLOCK TABLES;

--
-- Dumping data for table `OpeningHours`
--

LOCK TABLES `OpeningHours` WRITE;
INSERT INTO OpeningHours VALUES 
(1, 0, "8:00:00", "16:00:00", 0), 
(2, 1, "8:00:00", "16:00:00", 1),
(3, 2, "8:00:00", "16:00:00", 1),
(4, 3, "8:00:00", "16:00:00", 1),
(5, 4, "8:00:00", "16:00:00", 1),
(6, 5, "8:00:00", "16:00:00", 1),
(7, 6, "8:00:00", "16:00:00", 0);
UNLOCK TABLES;

--
-- Dumping data for table `SpecialOpeningHours`
--

LOCK TABLES `SpecialOpeningHours` WRITE;
INSERT INTO SpecialOpeningHours (Day, Start, End, Description) VALUES ("2020-04-23", "8:00:00", "16:00:00","");
UNLOCK TABLES;

--
-- Dumping data for table `ClosingDays`
--

LOCK TABLES `ClosingDays` WRITE;
INSERT INTO ClosingDays (Day, Description) VALUES ("2020-05-23", "");
UNLOCK TABLES;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
INSERT INTO `reservations` VALUES 
(1,1,1,'2020-05-07 12:00:00','2020-05-07 15:00:00',0),
(2,1,1,'2020-05-07 15:00:00','2020-05-07 16:00:00',1),
(3,1,1,'2020-05-07 11:00:00','2020-05-07 12:00:00',2),
(4,1,1,'2020-05-07 10:00:00','2020-05-07 11:00:00',3),
(5,1,1,'2020-05-07 08:15:00','2020-05-07 10:00:00',0),
(6,1,1,'2020-05-10 08:15:00','2020-05-10 10:00:00',1),
(7,1,1,'2020-05-10 10:15:00','2020-05-10 10:45:00',2);
UNLOCK TABLES;

--
-- Dumping data for table `textfieldcontents`
--

LOCK TABLES `textfieldcontents` WRITE;
INSERT INTO `textfieldcontents` VALUES 
(1,'AboutUs','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet, mauris ac vehicula gravida'),
(2,'Contact','ul. Nad Trugą 12, Wejcherowo\ne-mail: kontakt@pingpong.pl\ntel. +48 12 142-44-91\ntel. kom. +48 101 417 313');
UNLOCK TABLES;

--
-- Dumping data for table `alerts`
--

LOCK TABLES `alerts` WRITE;
INSERT INTO `alerts` VALUES 
(1,'Dnia 27.05.2020 lokal będzie NIECZYNNY! Za utrudnienia przepraszamy.',0),
(2,'Dnia 04.06.2020 wszystkie rezerwacje powyżej godziny o połowę taniej! Zapraszamy!',1);
UNLOCK TABLES;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
INSERT INTO `photos` VALUES 
(1,'http://res.cloudinary.com/gasdgvbrea/image/upload/v1589910216/ojeqqdowp9flt11ksjph.jpg','ojeqqdowp9flt11ksjph'),
(2,'http://res.cloudinary.com/gasdgvbrea/image/upload/v1589910217/ikeljga1cb7rdntkf1dv.jpg','ikeljga1cb7rdntkf1dv'),
(3,'http://res.cloudinary.com/gasdgvbrea/image/upload/v1589910218/flg4k0vuxf1mhuy4dcpt.jpg','flg4k0vuxf1mhuy4dcpt');
UNLOCK TABLES;