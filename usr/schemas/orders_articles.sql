DROP TABLE IF EXISTS `orders_articles`;

CREATE TABLE `orders_articles` (
  `order_id` int(11) unsigned NOT NULL,
  `article_id` char(8) NOT NULL DEFAULT '',
  `size` char(5) NOT NULL DEFAULT '42-44',
  `color` char(20) NOT NULL DEFAULT '',
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`article_id`,`size`,`color`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `orders_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_articles_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `orders_articles` WRITE;
