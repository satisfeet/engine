DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `shipped` datetime NOT NULL,
  `cleared` datetime DEFAULT NULL,
  `charge` decimal(19,4) DEFAULT NULL,
  `receipt` decimal(19,4) DEFAULT NULL,
  `comment` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `orders` WRITE;
