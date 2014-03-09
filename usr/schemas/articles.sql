DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` char(8) NOT NULL DEFAULT '',
  `name` char(255) NOT NULL DEFAULT '',
  `category` char(30) NOT NULL DEFAULT '',
  `vat` decimal(5,2) NOT NULL DEFAULT '0.19',
  `retail` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `articles` WRITE;
