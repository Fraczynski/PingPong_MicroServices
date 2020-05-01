--
-- Dumping data for table `aspnetroleclaims`
--
LOCK TABLES aspnetroles
WRITE;
INSERT INTO aspnetroles
VALUES
    (1, 'Customer', 'CUSTOMER', 'c3ccd19d-f6d9-4a70-aaa1-226623084606'),
    (2, 'Employee', 'EMPLOYEE', '1ce8397c-e399-4398-aeeb-5ce95d995f51');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusers`
--
LOCK TABLES aspnetusers WRITE;
INSERT INTO aspnetusers
VALUES
    (1, 'jkowalski@gmail.com', 'JKOWALSKI@GMAIL.COM', 'jkowalski@gmail.com', 'JKOWALSKI@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAENCYrDq681G0gtkDGov+QN0ACbEaCwXzwlHvNdGtUvYUlPxIeGZCqcA4OPjOWjp6pQ==', 'PS2KO4XQ5L6IOJ6KETQJHDIFUX64Z3XG', 'e1bdff0c-bc4e-4343-a8f0-af06cd24a400', NULL, 0, 0, NULL, 1, 0, 'Jan', 'Kowalski'),
    (2, 'pracownik@gmail.com', 'PRACOWNIK@GMAIL.COM', 'pracownik@gmail.com', 'PRACOWNIK@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAEBcS4aykJtlrJYAHa+hrI0RHJY2XE2J6DFYaqe1e69WrLxsOAth/nbf/0pcXp9YEwA==', 'BSXYCZITLXVJKNZNCVXIHOBIJO7LTIPF', 'bbbaa638-98d8-4c7f-b685-165e8f8768f0', NULL, 0, 0, NULL, 1, 0, 'Adam', 'Nowak');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserroles`
--
LOCK TABLES aspnetuserroles WRITE;
INSERT INTO aspnetuserroles
VALUES
    (1, 1),
    (2, 2);
UNLOCK TABLES;

--
-- Dumping data for table `rooms`
--

LOCK TABLES rooms WRITE;
INSERT INTO rooms
VALUES
    (1, 'Główny', 24, 20),
    (2, 'Duży', 33, 33),
    (3, 'VIP', 23, 22);
UNLOCK TABLES;

--
-- Dumping data for table `tables`
--

LOCK TABLES tables WRITE;
INSERT INTO tables
VALUES
    (1, 'Stol 1', 1, 1, 2.74, 1.525, 1, 1),
    (2, 'Stol 2', 5, 1, 2.74, 1.525, 1, 1),
    (3, 'Stol 3', 9, 1, 2.74, 1.525, 1, 1),
    (4, 'Stol 4', 13, 1, 2.74, 1.525, 1, 1),
    (5, 'Stol 1', 5, 1, 2.74, 1.525, 1, 3),
    (6, 'Stol 1', 3, 1, 2.74, 1.525, 1, 2),
    (7, 'Stol 2', 10, 1, 2.74, 1.525, 0, 2),
    (8, 'Stol 3', 13, 1, 2.74, 1.525, 0, 2);
UNLOCK TABLES;

--
-- Dumping data for table `OpeningHours`
--

LOCK TABLES `OpeningHours` WRITE;
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (1, 0, 8, 16, 1);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (2, 1, 8, 16, 1);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (3, 2, 8, 16, 1);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (4, 3, 8, 16, 1);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (5, 4, 8, 16, 1);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (6, 5, 10, 14, 0);
INSERT INTO OpeningHours (Id, DayOfWeek, Start, End, Open) VALUES (7, 6, 10, 14, 0);
UNLOCK TABLES;

--
-- Dumping data for table `SpecialOpeningHours`
--

LOCK TABLES `SpecialOpeningHours` WRITE;
INSERT INTO SpecialOpeningHours (Day, Start, End, Description) VALUES ("2020-04-23", 8, 16,"dupa");
UNLOCK TABLES;

--
-- Dumping data for table `ClosingDays`
--

LOCK TABLES `ClosingDays` WRITE;
INSERT INTO ClosingDays (Day, Description) VALUES ("2020-05-23", "dupa");
UNLOCK TABLES;

