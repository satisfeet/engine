DROP TABLE IF EXISTS `orders_customers`;

CREATE TABLE `orders_customers` (
  `order_id` int(11) unsigned NOT NULL,
  `customer_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`customer_id`,`order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `orders_customers_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_customers_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `orders_customers` WRITE;
