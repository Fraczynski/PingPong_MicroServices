--
-- Table structure for table `aspnetusers`
--

DROP TABLE IF EXISTS `aspnetusers`;
CREATE TABLE `aspnetusers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  `FirstName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetroles`
--

DROP TABLE IF EXISTS `aspnetroles`;
CREATE TABLE `aspnetroles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetroleclaims`
--

DROP TABLE IF EXISTS `aspnetroleclaims`;
CREATE TABLE `aspnetroleclaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RoleId` int NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetuserclaims`
--

DROP TABLE IF EXISTS `aspnetuserclaims`;
CREATE TABLE `aspnetuserclaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetuserlogins`
--

DROP TABLE IF EXISTS `aspnetuserlogins`;
CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` int NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetuserroles`
--

DROP TABLE IF EXISTS `aspnetuserroles`;
CREATE TABLE `aspnetuserroles` (
  `UserId` int NOT NULL,
  `RoleId` int NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `aspnetusertokens`
--

DROP TABLE IF EXISTS `aspnetusertokens`;
CREATE TABLE `aspnetusertokens` (
  `UserId` int NOT NULL,
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `rooms`
--
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `RoomWidth` double NOT NULL,
  `RoomLength` double NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
CREATE TABLE `tables` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Label` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `X` int NOT NULL,
  `Y` int NOT NULL,
  `TableLength` double NOT NULL,
  `TableWidth` double NOT NULL,
  `VerticalOrientation` tinyint(1) NOT NULL,
  `RoomId` int NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Tables_RoomId` (`RoomId`),
  CONSTRAINT `FK_Tables_Rooms_RoomId` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `openingHours`
--
DROP TABLE IF EXISTS `openinghours`;
CREATE TABLE `openinghours` (
	`Id` int NOT NULL AUTO_INCREMENT,
	 `DayOfWeek` int NOT NULL,
	 `Start` time(6) NOT NULL,
	 `End` time(6) NOT NULL,
	 `OPEN` tinyint(1) NOT NULL,
	 PRIMARY KEY (`Id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `spcialOpeningHours`
--

DROP TABLE IF EXISTS `specialopeninghours`;
CREATE TABLE `specialopeninghours` (
	`Id` int NOT NULL AUTO_INCREMENT,
	 `Day` datetime(6) NOT NULL,
	 `Start` time(6) NOT NULL,
	 `End` time(6) NOT NULL,
	 `Description` longtext,
	 PRIMARY KEY (`Id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `closingDays`
--

DROP TABLE IF EXISTS `closingdays`;
CREATE TABLE `closingdays` (
	`Id` int NOT NULL AUTO_INCREMENT,
	 `Day` datetime(6) NOT NULL,
	 `Description` longtext,
	 PRIMARY KEY (`Id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int,
  `PingPongTableId` int,
  `Start` datetime(6) NOT NULL,
  `End` datetime(6) NOT NULL,
  `ReservationStatus` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `FK_Reservations_Tables_PingPongTableId` (`PingPongTableId`),
  KEY `FK_Reservations_AspNetUsers_UserId` (`UserId`),
  CONSTRAINT `FK_Reservations_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `FK_Reservations_Tables_PingPongTableId` FOREIGN KEY (`PingPongTableId`) REFERENCES `tables` (`Id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
	`Id` int NOT NULL AUTO_INCREMENT,
	 `Url` longtext,
	 `PublicID` longtext,
	 PRIMARY KEY (`Id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `alerts`
--
DROP TABLE IF EXISTS `alerts`;
CREATE TABLE `alerts` (
	`Id` int NOT NULL AUTO_INCREMENT,
	 `Message` longtext,
	 `AlertType` int,
	 PRIMARY KEY (`Id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `textfieldcontents`
--

DROP TABLE IF EXISTS `textfieldcontents`;
CREATE TABLE `textfieldcontents` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;