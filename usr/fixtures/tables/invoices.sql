CREATE TABLE `invoices` (
  `id`          int(5) unsigned NOT NULL AUTO_INCREMENT,
  `number`      char(8) DEFAULT NULL,
  `created_at`  datetime NOT NULL,
  `paid_on`     datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
