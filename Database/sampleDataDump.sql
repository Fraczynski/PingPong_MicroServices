--
-- Dumping data for table `aspnetroleclaims`
--
LOCK TABLES `aspnetroles` WRITE;
INSERT INTO `aspnetroles` VALUES (1,'Customer','CUSTOMER','c3ccd19d-f6d9-4a70-aaa1-226623084606'),(2,'Employee','EMPLOYEE','1ce8397c-e399-4398-aeeb-5ce95d995f51');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusers`
--
LOCK TABLES `aspnetusers` WRITE;
INSERT INTO `aspnetusers` VALUES (1,'jkowalski@gmail.com','JKOWALSKI@GMAIL.COM','jkowalski@gmail.com','JKOWALSKI@GMAIL.COM',0,'AQAAAAEAACcQAAAAENCYrDq681G0gtkDGov+QN0ACbEaCwXzwlHvNdGtUvYUlPxIeGZCqcA4OPjOWjp6pQ==','PS2KO4XQ5L6IOJ6KETQJHDIFUX64Z3XG','e1bdff0c-bc4e-4343-a8f0-af06cd24a400',NULL,0,0,NULL,1,0,'Jan','Kowalski'),(2,'pracownik@gmail.com','PRACOWNIK@GMAIL.COM','pracownik@gmail.com','PRACOWNIK@GMAIL.COM',0,'AQAAAAEAACcQAAAAEBcS4aykJtlrJYAHa+hrI0RHJY2XE2J6DFYaqe1e69WrLxsOAth/nbf/0pcXp9YEwA==','BSXYCZITLXVJKNZNCVXIHOBIJO7LTIPF','bbbaa638-98d8-4c7f-b685-165e8f8768f0',NULL,0,0,NULL,1,0,'Adam','Nowak');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserroles`
--
LOCK TABLES `aspnetuserroles` WRITE;
INSERT INTO `aspnetuserroles` VALUES (1,1),(2,2);
UNLOCK TABLES;


--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
INSERT INTO `__efmigrationshistory` VALUES ('20200410143137_UserAndRoles','3.0.2');
UNLOCK TABLES;