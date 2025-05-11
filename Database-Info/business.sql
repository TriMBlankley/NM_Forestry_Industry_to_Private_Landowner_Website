CREATE TABLE `business` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `bus_name` varchar(100) NOT NULL,
  `website` varchar(100) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `county` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `mailing_add` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `work_radius` int DEFAULT NULL,
  `phone_num` varchar(45) DEFAULT NULL,
  `latitude` decimal(11,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  PRIMARY KEY (`bus_id`),
  UNIQUE KEY `bus_name_UNIQUE` (`bus_name`)
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `business_work` (
  `bus_id` int NOT NULL,
  `type_of_work` varchar(45) NOT NULL,
  PRIMARY KEY (`bus_id`,`type_of_work`),
  CONSTRAINT `bus_id` FOREIGN KEY (`bus_id`) REFERENCES `business` (`bus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

