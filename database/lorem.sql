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

INSERT INTO `user` (`id`, `active`, `firstname`, `lastname`, `username`, `password_hash`, `email`, `phone`, `created`, `modified`) VALUES
(NULL, 1, 'root1', 'root1', 'root1', '', 'root1', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00'),
(NULL, 1, 'root2', 'root2', 'root2', '', 'root2', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00'),
(NULL, 1, 'root3', 'root3', 'root3', '', 'root3', '000-000-0000', '2000-01-01T00:00:00.379-04:00', '2000-01-01T00:00:00.379-04:00');

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('member', 'broker', 'admin') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `role` (`id`, `active`, `type`) VALUES 
(NULL, 1, 'member'),
(NULL, 1, 'broker'),
(NULL, 1, 'admin');


DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_FK` (`user_id`),
  KEY `user_role_FK_1` (`role_id`),
  CONSTRAINT `user_role_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_FK_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;