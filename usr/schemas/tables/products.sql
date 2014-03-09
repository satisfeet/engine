CREATE TABLE `products` (
  `id`        int(5) unsigned NOT NULL AUTO_INCREMENT,
  `abbr`      char(255) NOT NULL,
  `name`      char(255) NOT NULL,
  `retail`    char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
