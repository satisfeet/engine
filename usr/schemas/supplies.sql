DROP TABLE IF EXISTS `supplies`;

CREATE TABLE `supplies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `shipped` datetime DEFAULT NULL,
  `cleared` datetime DEFAULT NULL,
  `net` decimal(19,4) DEFAULT NULL,
  `gross` decimal(19,4) DEFAULT NULL,
  `skonto` decimal(19,4) DEFAULT NULL,
  `comment` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `supplies` WRITE;
