DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `surname` char(255) NOT NULL DEFAULT '',
  `forename` char(255) NOT NULL DEFAULT '',
  `company` char(255) DEFAULT NULL,
  `email` char(255) NOT NULL DEFAULT '',
  `street` char(255) NOT NULL DEFAULT '',
  `street_nr` char(255) NOT NULL DEFAULT '',
  `place` char(255) NOT NULL DEFAULT '',
  `zip` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customers` WRITE;
