CREATE TABLE `customers` (
  `id`        int(5) unsigned NOT NULL AUTO_INCREMENT,
  `company`   char(255) DEFAULT NULL,
  `surname`   char(255) NOT NULL,
  `forename`  char(255) NOT NULL,
  `email`     char(255) NOT NULL,
  `street`    char(255) NOT NULL,
  `street_nr` char(255) NOT NULL,
  `place`     char(255) NOT NULL,
  `zip`       int(5)    NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
