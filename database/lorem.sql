DROP DATABASE IF EXISTS `lorem`;
CREATE DATABASE IF NOT EXISTS `lorem`;
USE `lorem`;


DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint NOT NULL DEFAULT '0',
  `firstname` varchar(64) DEFAULT NULL,
  `lastname` varchar(64) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UN` (`username`,`active`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `active`, `firstname`, `lastname`, `username`, `password`, `email`, `phone`, `createdAt`, `updatedAt`) VALUES
(NULL, 1, 'root1', 'root1', 'root1', '', 'root1', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00'),
(NULL, 1, 'root2', 'root2', 'root2', '', 'root2', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00'),
(NULL, 1, 'root3', 'root3', 'root3', '', 'root3', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00');

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint NOT NULL DEFAULT '0',
  `type` enum('member', 'broker', 'admin') DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `role` (`id`, `active`, `type`) VALUES 
(NULL, 1, 'member'),
(NULL, 1, 'broker'),
(NULL, 1, 'admin');


DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint NOT NULL DEFAULT '0',
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_FK` (`user_id`),
  KEY `user_role_FK_1` (`role_id`),
  CONSTRAINT `user_role_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_FK_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `property`;

CREATE TABLE `property` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`active` BOOL DEFAULT 0 NOT NULL,
	`civicAddress` varchar(50) NULL,
	`aptNumber` varchar(50) NULL,
	`street` varchar(50) NULL,
	`neighbourhood` varchar(50) NULL,
	`city` varchar(50) NULL,
	`province` varchar(50) NULL,
	`postalCode` varchar(10) NULL,
	`country` varchar(50) NULL,
	`listingType` ENUM('sale','rent') NOT NULL,
	`price` FLOAT NULL,
	`livingArea` FLOAT NULL,
	`propertyArea` FLOAT NULL,
	`numOfBedrooms` TINYINT UNSIGNED NULL,
	`numOfBathrooms` TINYINT UNSIGNED NULL,
	`numOfFloors` TINYINT UNSIGNED NULL,
	`yearBuilt` DATE NULL,
	`listedDate` DATE NULL,
	`propertyType` ENUM('single-family', 'duplex', 'triplex', 'quadruplex', 'townhouse', 'studio', 'condominium', 'other') NULL,
	`createdAt` timestamp NULL DEFAULT NULL,
  	`updatedAt` timestamp NULL DEFAULT NULL,
  CONSTRAINT `property_PK` PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `amenity`;
CREATE TABLE `amenity` (
	`id` BIGINT auto_increment NOT NULL,
	`active` BOOL DEFAULT 0 NULL,
	`name` ENUM('elevator', 'gym', 'pool', 'laundry room', 'internet', 'water', 'hydro', 'public transportation', 'park', 'accessibility') NULL,
	`createdAt` timestamp NULL DEFAULT NULL,
  	`updatedAt` timestamp NULL DEFAULT NULL,
  CONSTRAINT `amenity_PK` PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `amenity` (`id`, `active`, `name`) VALUES
(NULL, 1, 'elevator'),
(NULL, 1, 'gym'),
(NULL, 1, 'pool'),
(NULL, 1, 'laundry room'),
(NULL, 1, 'internet'),
(NULL, 1, 'water'),
(NULL, 1, 'hydro'),
(NULL, 1, 'public transportation'),
(NULL, 1, 'park'),
(NULL, 1, 'accessibility');


DROP TABLE IF EXISTS `property_amenity`;

CREATE TABLE `property_amenity` (
	`id` BIGINT auto_increment NOT NULL,
	`active` BOOL DEFAULT 0 NULL,
	`property_id` BIGINT NOT NULL,
	`amenity_id` BIGINT NULL,
	`createdAt` timestamp NULL DEFAULT NULL,
  	`updatedAt` timestamp NULL DEFAULT NULL,
	CONSTRAINT `property_amenity_PK` PRIMARY KEY (`id`),
	CONSTRAINT `property_amenity_FK` FOREIGN KEY (`property_id`) REFERENCES `property`(`id`) ON DELETE CASCADE,
	CONSTRAINT `property_amenity_FK_1` FOREIGN KEY (`amenity_id`) REFERENCES `amenity`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit` (
`id` BIGINT auto_increment NOT NULL,
`property_id` BIGINT NULL,
`client_id` BIGINT NULL,
`broker_id` BIGINT NULL, 
`time` timestamp NULL DEFAULT NULL,
`status` ENUM ('requested', 'booked', 'completed', 'other') NULL DEFAULT NULL,
CONSTRAINT `visit_PK` PRIMARY KEY (`id`),
UNIQUE KEY `visit_UN` (`client_id`,`property_id`,`broker_id`),
  KEY `visit_FK` (`property_id`),
  KEY `visit_FK_2` (`broker_id`),
  CONSTRAINT `visit_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE,
  CONSTRAINT `visit_FK_1` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `visit_FK_2` FOREIGN KEY (`broker_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- lorem.listing definition
DROP TABLE IF EXISTS `listing`;
CREATE TABLE `listing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) DEFAULT NULL,
  `property_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `listing_FK` (`property_id`),
  KEY `listing_FK_1` (`user_id`),
  CONSTRAINT `listing_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE,
  CONSTRAINT `listing_FK_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP USER IF EXISTS 'lorem'@'%';
FLUSH PRIVILEGES;

CREATE USER 'lorem'@'%' IDENTIFIED BY 'lorem3#(xruN';
GRANT Create role ON *.* TO 'lorem'@'%';
GRANT Create user ON *.* TO 'lorem'@'%';
GRANT Drop role ON *.* TO 'lorem'@'%';
GRANT Event ON *.* TO 'lorem'@'%';
GRANT File ON *.* TO 'lorem'@'%';
GRANT Process ON *.* TO 'lorem'@'%';
GRANT Reload ON *.* TO 'lorem'@'%';
GRANT Replication client ON *.* TO 'lorem'@'%';
GRANT Replication slave ON *.* TO 'lorem'@'%';
GRANT Show databases ON *.* TO 'lorem'@'%';
GRANT Shutdown ON *.* TO 'lorem'@'%';
GRANT Create tablespace ON *.* TO 'lorem'@'%';
GRANT XA_RECOVER_ADMIN ON *.* TO 'lorem'@'%';
GRANT TELEMETRY_LOG_ADMIN ON *.* TO 'lorem'@'%';
GRANT TABLE_ENCRYPTION_ADMIN ON *.* TO 'lorem'@'%';
GRANT SHOW_ROUTINE ON *.* TO 'lorem'@'%';
GRANT SET_USER_ID ON *.* TO 'lorem'@'%';
GRANT SERVICE_CONNECTION_ADMIN ON *.* TO 'lorem'@'%';
GRANT SENSITIVE_VARIABLES_OBSERVER ON *.* TO 'lorem'@'%';
GRANT GROUP_REPLICATION_STREAM ON *.* TO 'lorem'@'%';
GRANT REPLICATION_SLAVE_ADMIN ON *.* TO 'lorem'@'%';
GRANT APPLICATION_PASSWORD_ADMIN ON *.* TO 'lorem'@'%';
GRANT SESSION_VARIABLES_ADMIN ON *.* TO 'lorem'@'%';
GRANT CLONE_ADMIN ON *.* TO 'lorem'@'%';
GRANT CONNECTION_ADMIN ON *.* TO 'lorem'@'%';
GRANT SYSTEM_VARIABLES_ADMIN ON *.* TO 'lorem'@'%';
GRANT BACKUP_ADMIN ON *.* TO 'lorem'@'%';
GRANT AUTHENTICATION_POLICY_ADMIN ON *.* TO 'lorem'@'%';
GRANT REPLICATION_APPLIER ON *.* TO 'lorem'@'%';
GRANT RESOURCE_GROUP_ADMIN ON *.* TO 'lorem'@'%';
GRANT SYSTEM_USER ON *.* TO 'lorem'@'%';
GRANT FIREWALL_EXEMPT ON *.* TO 'lorem'@'%';
GRANT AUDIT_ABORT_EXEMPT ON *.* TO 'lorem'@'%';
GRANT BINLOG_ENCRYPTION_ADMIN ON *.* TO 'lorem'@'%';
GRANT INNODB_REDO_LOG_ARCHIVE ON *.* TO 'lorem'@'%';
GRANT ENCRYPTION_KEY_ADMIN ON *.* TO 'lorem'@'%';
GRANT PERSIST_RO_VARIABLES_ADMIN ON *.* TO 'lorem'@'%';
GRANT BINLOG_ADMIN ON *.* TO 'lorem'@'%';
GRANT FLUSH_OPTIMIZER_COSTS ON *.* TO 'lorem'@'%';
GRANT FLUSH_STATUS ON *.* TO 'lorem'@'%';
GRANT FLUSH_TABLES ON *.* TO 'lorem'@'%';
GRANT AUDIT_ADMIN ON *.* TO 'lorem'@'%';
GRANT FLUSH_USER_RESOURCES ON *.* TO 'lorem'@'%';
GRANT GROUP_REPLICATION_ADMIN ON *.* TO 'lorem'@'%';
GRANT INNODB_REDO_LOG_ENABLE ON *.* TO 'lorem'@'%';
GRANT PASSWORDLESS_USER_ADMIN ON *.* TO 'lorem'@'%';
GRANT ROLE_ADMIN ON *.* TO 'lorem'@'%';
GRANT RESOURCE_GROUP_USER ON *.* TO 'lorem'@'%';
GRANT Alter ON lorem.* TO 'lorem'@'%';
GRANT Create ON lorem.* TO 'lorem'@'%';
GRANT Create view ON lorem.* TO 'lorem'@'%';
GRANT Delete ON lorem.* TO 'lorem'@'%';
GRANT Drop ON lorem.* TO 'lorem'@'%';
GRANT Index ON lorem.* TO 'lorem'@'%';
GRANT Insert ON lorem.* TO 'lorem'@'%';
GRANT References ON lorem.* TO 'lorem'@'%';
GRANT Select ON lorem.* TO 'lorem'@'%';
GRANT Show view ON lorem.* TO 'lorem'@'%';
GRANT Trigger ON lorem.* TO 'lorem'@'%';
GRANT Update ON lorem.* TO 'lorem'@'%';
GRANT Alter routine ON lorem.* TO 'lorem'@'%';
GRANT Create routine ON lorem.* TO 'lorem'@'%';
GRANT Create temporary tables ON lorem.* TO 'lorem'@'%';
GRANT Execute ON lorem.* TO 'lorem'@'%';
GRANT Lock tables ON lorem.* TO 'lorem'@'%';
