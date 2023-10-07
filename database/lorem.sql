DROP DATABASE IF EXISTS `lorem`;
CREATE DATABASE IF NOT EXISTS `lorem`;
USE `lorem`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `modified` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UN` (`username`),
  UNIQUE KEY `user_email_UN` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('member', 'broker', 'admin') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_role_FK` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_FK_1` FOREIGN KEY (`id`) REFERENCES `role` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;