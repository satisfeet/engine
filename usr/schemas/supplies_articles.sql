DROP TABLE IF EXISTS `supplies_articles`;

CREATE TABLE `supplies_articles` (
  `supply_id` int(11) unsigned NOT NULL,
  `article` char(255) NOT NULL DEFAULT '',
  `color` char(10) DEFAULT NULL,
  `size` char(5) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `retail` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `total` decimal(19,4) NOT NULL DEFAULT '0.0000',
  PRIMARY KEY (`supply_id`,`article`),
  KEY `article_id` (`article`),
  CONSTRAINT `supplies_articles_ibfk_1` FOREIGN KEY (`supply_id`) REFERENCES `supplies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `supplies_articles` WRITE;
