CREATE TABLE `land` (
  `land_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int DEFAULT NULL,
  `land_address` varchar(100) DEFAULT NULL,
  `land_zip` int DEFAULT NULL,
  `land_county` varchar(45) DEFAULT NULL,
  `land_city` varchar(100) DEFAULT NULL,
  `parcel_id` varchar(100) NOT NULL,
  `forest_plan` enum('current','expired','none') DEFAULT NULL,
  `land_size` decimal(10,2) DEFAULT NULL,
  `land_occupancy` enum('people','cattle','both','none') DEFAULT NULL,
  `wildfire` tinyint(1) DEFAULT NULL,
  `flooding` tinyint(1) DEFAULT NULL,
  `mgmt_plan` mediumblob,
  PRIMARY KEY (`land_id`),
  UNIQUE KEY `parcel_id_UNIQUE` (`parcel_id`),
  KEY `owner_id_idx` (`owner_id`),
  CONSTRAINT `owner_id` FOREIGN KEY (`owner_id`) REFERENCES `landowner` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `landowner` (
  `owner_id` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(100) DEFAULT NULL,
  `entity_name` varchar(100) DEFAULT NULL,
  `contact_address` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`owner_id`),
  UNIQUE KEY `owner_id_UNIQUE` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
